package com.kalic.controller;

import com.kalic.pojo.Customer;
import com.kalic.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Timestamp;


@Controller
public class PageController {
	@Autowired
	private CustomerService customerService;

	@RequestMapping("/customer/processActive")
	public String processActive(String email,String activeCode){
		//根据 email 获取Customer
		Customer customer = customerService.selCustomerByEmail(email);
		//验证用户是否村存在
		if (customer != null){
			//验证用户的激活状态
			if (customer.getState() == 0){
				//邮箱未激活
				Timestamp now = new Timestamp(System.currentTimeMillis());
				//验证链接是否过期
				Timestamp registerTime = customer.getRegisterTime();
				//48小时的毫秒数
				Long time = Long.valueOf(172800000);
				Long c = (now.getTime() - registerTime.getTime()) - time;
				if (c <= 0 ){
					//验证激活码是否正确
					String validateCode = customer.getValidateCode();
					System.out.println("数据库的激活码：" + validateCode);
					System.out.println("页面邮箱验证的：" + activeCode);

					if (customer.getValidateCode().equals(activeCode)){
						System.out.println("激活前:" + customer.getState());
						customer.setState(1);
						System.out.println("激活后：" + customer.getState());

						//更新账户
						System.out.println("激活验证后的Customer:" + customer);
						int i = customerService.updCustomerEmailByUid(customer);
						if (i > 0) {
							System.out.println("邮箱激活成功");
							return "redirect:/static/login/login.html";
						}else{
							System.out.println("邮箱激活失败");
						}
					}else {
						System.out.println("激活码不正确");
					}
				}else{
					System.out.println("激活码过期");
				}
			}else{
				System.out.println("邮箱已激活，请登录");
			}
		}else {
			System.out.println("该邮箱未注册（邮箱地址不存在）！");
		}

		return "redirect:/static/login/error.html";
	}


	@RequestMapping("/person/updateEmailPage")
	public String personUpdateEmailPage(){
		return "redirect:/static/two/person/email.html";
	}


	@RequestMapping("/page/main")
	public String refreshtoMain(){
		return "redirect:/static/main/index.html";
	}
}
