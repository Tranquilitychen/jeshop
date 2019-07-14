package com.kalic.interceptor;

import com.kalic.pojo.Customer;
import com.kalic.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Interceptor 是对请求的拦截，不对资源拦截（mybe）
 * 登陆拦截器，没有登陆就全部拦截在外面
 */
public class CustomerInterceptor implements HandlerInterceptor {
    @Autowired
    private CustomerService customerService;

    //定义指定的url栏来 表明需要 拦截的请求
   /* private*/


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        System.out.println("再请求处理前执行，也就是在Controller 方法调用之前被调用");

        //1.获取请求的url:去除localhost:81
        String url = request.getRequestURI();
        System.out.println("url：" + url);

        //2.对指定的 url 请求不进行拦截
        /*if(url.indexOf("/page/login/login") >= 0){
            return true;
        }*/

        //获取Cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null){
            for (Cookie cookie : cookies){
                if (cookie.getName().equals("customer")){
                    String customerCookie = cookie.getValue();
                    System.out.println("customerCookie:" + customerCookie);
                    //数据库检验是否存在
                    int uid = Integer.parseInt(customerCookie);
                    Customer customer = customerService.selCustomerById(uid);
                    if (customer != null)
                        return true;
                }
            }
        }

        //
        System.out.println("您还未登陆请先登陆，谢谢！");

        return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        System.out.println("在请求处理之后，也就是在Controller 方法调用之后被调用");
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        System.out.println("在请求处理完成后执行，该方法中可以进行资源的释放操作");
    }
}
