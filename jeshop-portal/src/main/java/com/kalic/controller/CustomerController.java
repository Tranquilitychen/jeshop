package com.kalic.controller;

import java.awt.image.RenderedImage;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.GeneralSecurityException;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.mail.MessagingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kalic.utils.MailUtil;
import com.kalic.vo.BuyCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.kalic.pojo.Customer;
import com.kalic.service.CustomerService;
import com.kalic.utils.CodeUtil;

@RestController
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	
	//登陆
	@RequestMapping("/customer/login.action")
	public int login(String username, String password, HttpServletRequest request, HttpServletResponse response) {
		//用户名中文
		String usernamDecodee= null;
		String passwordDecode= null;
		try {
			usernamDecodee = URLDecoder.decode(username, "utf-8");
			passwordDecode = URLDecoder.decode(password, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		System.out.println("usernamDecodee:" + usernamDecodee + ", passwordDecode:" + passwordDecode);
		//前端会进行自定义检验的，此处就不需要再进行检验了
		Customer customer = customerService.login(usernamDecodee, passwordDecode);
		if (customer != null) {
			//第二步获取状态码，如果状态码为0 则提示邮箱未激活给用户
			if (customer.getState() != 0){
				//状态码为1 邮箱激活成功，存放cookie
				System.out.println("查询到Customer:" + customer.getUsername());
				//如果查询到Customer 就将其放入到Cookie中，但现在暂时放到Session中
				Cookie cookie = new Cookie("customer", customer.getUid()+"");
				cookie.setPath("/");

/*			//设置Cookie生命期限为10分钟， 不设置Cookie事件默认是 关闭浏览器时删除
			cookie.setMaxAge(600);*/
				/*System.out.println("customer : " + request.getSession().getAttribute("customer").toString());*/
				response.addCookie(cookie);
				return 1;
			}else{
				//提示用户邮箱未激活
				System.out.println("邮箱为激活，请到注册邮箱中进行激活");
			/*	return null;*/
				return 0;
			}
		}else{
			System.out.println("输入信息不正确！");
			return 0;
		}
	/*	//感觉方法可以为null
		return null;*/
	}

	//注册
	@RequestMapping("/customer/register.action")
	public int register(Customer customer) {
		//传来的Customer 注册信息可能存在着中文需要解码
		String username = null;
		try {
			username = URLDecoder.decode(customer.getUsername(), "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		customer.setUsername(username);
		System.out.println(customer);
		int index = customerService.insRegister(customer);

		if (index > 0){
			System.out.println("注册成功");
		}else{
			System.out.println("注册失败");
		}
		return index;
	}

	//退出登陆
	@ResponseBody
	@RequestMapping("/customer/exitCustomer")
	public int exitCustomer(HttpServletRequest request, HttpServletResponse response){
		//1. 获取Cookie

		Cookie[] cookies = request.getCookies();
		if (cookies != null && cookies.length > 0){
			for (Cookie cookie: cookies){
				if (cookie.getName().equals("customer")){
					//删除Cookie
					Cookie delcookie = new Cookie("customer", cookie.getValue());
					delcookie.setPath("/");
					delcookie.setMaxAge(0);
					response.addCookie(delcookie);
					return 1;
				}
			}
		}
/*
		Cookie delcookie = new Cookie("customer", uid);
		delcookie.setPath("/");
		delcookie.setMaxAge(0);*/

		return 0;
	}

	//修改密码
	@RequestMapping("/customer/updatePassword.action")
	public int updPassword(String password, String newPassword,int uid){
		System.out.println("password:" + password);
		System.out.println("newPassword：" + newPassword);

		//查询数据库判断旧密码是否相同
		Customer customer = customerService.selCustomerById(uid);
		System.out.println(customer);
		String oldPassword = customer.getPassword();
		System.out.println("oldPassword:" + oldPassword);
		System.out.println(oldPassword.equals(password));
		System.out.println(oldPassword == password);
		if(password.equals(oldPassword)){
			//进行密码修改
			System.out.println("进来了");
			int index = customerService.updCustomerPasswordByUid(uid, newPassword);
			System.out.println("index:" + index);
			if(index == 1){
				System.out.println("修改密码成功！");
				return index;
			}
		}
		return 0;
	}

	//修改邮箱
	@RequestMapping("/customer/updateEmail.action")
	public int updEmail(String email, int uid){
		System.out.println("uid:" + uid);
		System.out.println("email:" + email);

		//修改邮箱以前需要先判断邮箱状态，如果邮箱状态为0，则是未激活邮箱，
		//前台进行判定，所以此处的邮箱状态一定为1，然后修改邮箱换绑需要重新验证，状态修改为0
		//重新填写激活码，并且修改邮箱
		Customer customer = customerService.selCustomerById(uid);
		System.out.println("发送邮件前未修改的customer:" + customer);

		//生成验证码
		String activecode = UUID.randomUUID().toString().replace("-", "");
		customer.setValidateCode(activecode);
		//发送邮件
		int customerUpdate = 0;
		try {
			System.out.println(customer);
			//邮件发送
			new MailUtil().sendEmail(email, activecode);
			//邮件发送成功

			//1.修改状态为 0
			customer.setState(0);
			//2.修改邮箱地址
			customer.setEmail(email);
			//3.修改激活码
			customer.setValidateCode(activecode);

			System.out.println("发送邮件后修改的customer:" + customer);
			//修改邮箱
			customerUpdate = customerService.updCustomerEmailByUid(customer);
		} catch (GeneralSecurityException e) {
			System.out.println("发送失败");
			e.printStackTrace();
		} catch (MessagingException e) {
			System.out.println("发送失败");
			e.printStackTrace();
		}

		return customerUpdate;
	}


	//检查注册邮箱是否存在
	@RequestMapping("/customer/checkEmail")
	public JSONObject checkEmail(String checkemail){
		//1.获取页面输入的用户名
		//2.访问数据库看是否存在该用户
		Customer customer = customerService.selCustomerByEmail(checkemail);
		boolean flag = false;
		//当用户名不存在的时候返回 true
		if (customer == null || customer.getUid() == 0){
			System.out.println("该用户邮箱为空，可以注册！！！");
			flag = true;
		}
		//3.将结果转换成json，传到页面
		String json = "{\"isTrue\":" + flag + "}";
		JSONObject jsonObject = JSONObject.parseObject(json);
		System.out.println(jsonObject);
		return jsonObject;
	}

	//检查用户名是否存在
	@RequestMapping("/customer/checkName")
	public JSONObject checkName(HttpServletRequest request){
		//1.获取页面输入的用户名
		String checkName_client = request.getParameter("checkname");
		System.out.println("checkName_client" + checkName_client);
		//2.访问数据库看是否存在该用户
		Customer customer = customerService.checkNameIsExist(checkName_client);
		boolean flag = false;
		//当用户名不存在的时候返回 true
		if (customer == null || customer.getUid() == 0){
			System.out.println("该用户名为空，可以注册！！！");
			flag = true;
		}
		//3.将结果转换成json，传到页面
		String json = "{\"isTrue\":" + flag + "}";
		JSONObject jsonObject = JSONObject.parseObject(json);
		System.out.println(jsonObject);
		return jsonObject;
	}

	//检查验证码是否正确
	@RequestMapping("/customer/checkTrue")
	public JSONObject checkCode(HttpServletRequest request) {
		//获取页面输入的验证码
		String checkCode_client = request.getParameter("checkcode");
		System.out.println("checkCode_client:" + checkCode_client);
		String checkCode_session = request.getSession().getAttribute("piccode").toString();
		System.out.println("checkCode_session:" + checkCode_session);
		
		boolean isTrue = true;
		//当验证码与输入的验证码不相同时返回false,
		if(!checkCode_client.equals(checkCode_session)) {
			isTrue = false;
		}
		//将结果转换成json，传到页面
		 String json = "{\"isTrue\":" + isTrue + "}";
		 JSONObject jsonObject = JSONObject.parseObject(json);
		 System.out.println(jsonObject);
		 //以上没问题
		 return jsonObject;
	}
	
	//生成验证码
	@RequestMapping("/customer/createCheckImage")
	public void createCheckImage(HttpServletRequest request, HttpServletResponse response) {
		
		Map<String, Object> map = CodeUtil.generateCodeAndPic();
		Object object = map.get("codePic");
		//验证码放到session中
		request.getSession().setAttribute("piccode", map.get("code"));
		System.out.println("验证码：" + map.get("code"));
		//将验证码的图片返回个页面
		try {
			ImageIO.write((RenderedImage) map.get("codePic"), "jpeg", response.getOutputStream());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		String code = request.getSession().getAttribute("piccode").toString();
		System.out.println("code:"  + code);
	}


}
