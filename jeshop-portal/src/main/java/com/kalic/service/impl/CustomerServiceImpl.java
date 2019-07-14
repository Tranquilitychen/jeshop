package com.kalic.service.impl;

import com.kalic.utils.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kalic.mapper.CustomerMapper;
import com.kalic.pojo.Customer;
import com.kalic.service.CustomerService;

import javax.mail.MessagingException;
import java.security.GeneralSecurityException;
import java.sql.Timestamp;
import java.util.UUID;

@Service("customerService")
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	private CustomerMapper customerMapper;

	/**
	 * 用户注册认证，需要进行邮箱认证
	 * @param customer 用户名，密码，邮箱 还需添加状态码与注册时间
	 * @return
	 */
	@Override
	public int insRegister(Customer customer) {
		Timestamp now = new Timestamp(System.currentTimeMillis());
		System.out.println("当前时间：" + now);

		//注册时状态码为 0 ;
		customer.setState(0);
		//注册事件为当前系统时间
		customer.setRegisterTime(now);

        String activecode = UUID.randomUUID().toString().replace("-", "");
		customer.setValidateCode(activecode);

		//发送邮件
        String email = customer.getEmail();
        int customerRegister = 0;
        try {
            System.out.println(customer);
            customerRegister = customerMapper.insCustomer(customer);
            new MailUtil().sendEmail(email, activecode);
        } catch (GeneralSecurityException e) {
            System.out.println("发送失败");
            e.printStackTrace();
        } catch (MessagingException e) {
            System.out.println("发送失败");
            e.printStackTrace();
        }
        return customerRegister;
	}

	@Override
	public Customer login(String username, String password) {
		return customerMapper.selCustomer(username, password);
	}

	@Override
	public Customer checkNameIsExist(String username) {
		return customerMapper.selCustomerByName(username);
	}

	@Override
	public Customer selCustomerById(int uid) {
		return customerMapper.selCustomerById(uid);
	}

	//可以用作前台邮箱验证是否存在 以及 邮箱激活
    @Override
    public Customer selCustomerByEmail(String email) {
        return customerMapper.selCustomerByEmail(email);
    }

    @Override
    public int updCustomerEmailByUid(Customer customer) {
        return customerMapper.updCustomerEmailByUid(customer);
    }

    @Override
    public int delCustomer(int uid) {
        return customerMapper.delCustomer(uid);
    }

	@Override
	public int updCustomerPasswordByUid(int uid, String password) {
		return customerMapper.updCustomerPasswordByUid(uid, password);
	}


}
