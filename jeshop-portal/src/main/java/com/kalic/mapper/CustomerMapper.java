package com.kalic.mapper;

import org.apache.ibatis.annotations.Param;

import com.kalic.pojo.Customer;

public interface CustomerMapper {
	
	//1.注册用的插入 Customer
	int insCustomer(Customer customer);
	
	//2.登陆查询顾客(账户名、密码)
	Customer selCustomer(@Param("username") String username, @Param("password") String password);

	//3.根据Name查询是否存在用户
	Customer selCustomerByName(@Param("username") String username);

	//4.根据Id查询是否存在用户
	Customer selCustomerById(@Param("uid") int uid);

	//5.根据邮箱查询是否存在用户
	Customer selCustomerByEmail(String email);

	//6.修改用户邮箱
	int updCustomerEmailByUid(Customer customer);

	//7.删除用户
	int delCustomer(int uid);

	//8.修改用户密码
	int updCustomerPasswordByUid(@Param("uid") int uid, @Param("password") String password);

}
