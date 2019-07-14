package com.kalic.service.impl;

import com.kalic.mapper.CustomerInfoMapper;
import com.kalic.pojo.CustomerInfo;
import com.kalic.service.CustomerInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("customerInfoService")
public class CustomerInfoServiceImpl implements CustomerInfoService {
    @Autowired
    private CustomerInfoMapper customerInfoMapper;

    @Override
    public CustomerInfo selCustomerInfo(int uid) {
        return customerInfoMapper.selCustomerInfo(uid);
    }

    @Override
    public int updCustomerInfo(CustomerInfo customerInfo) {
        return customerInfoMapper.updCustomerInfo(customerInfo);
    }

    @Override
    public int insCustomerInfo(CustomerInfo customerInfo) {
        return customerInfoMapper.insCustomerInfo(customerInfo);
    }
}
