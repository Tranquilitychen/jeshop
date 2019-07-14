package com.kalic.service;

import com.kalic.pojo.Customer;

public interface CustomerService {

	int insRegister(Customer customer);
	
	Customer login(String username, String password);

	Customer checkNameIsExist(String username);

	Customer selCustomerById(int uid);

	//5.根据邮箱查询是否存在用户
	Customer selCustomerByEmail(String email);

	//6.更新用户邮箱状态
	int updCustomerEmailByUid(Customer customer);

	//7.删除用户
	int delCustomer(int uid);

	//8.修改用户密码
	int updCustomerPasswordByUid(int uid, String password);


}
