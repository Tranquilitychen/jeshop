package com.kalic.mapper;

import com.kalic.pojo.CustomerInfo;

public interface CustomerInfoMapper {
    //1.根据 uid 获取 用户的所有信息
    CustomerInfo selCustomerInfo(int uid);

    //2.对用户信息进行修改
    int updCustomerInfo(CustomerInfo customerInfo);

    //3.新增用户信息
    int insCustomerInfo(CustomerInfo customerInfo);
}
