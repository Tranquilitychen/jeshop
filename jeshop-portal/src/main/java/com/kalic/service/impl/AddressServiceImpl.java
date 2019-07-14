package com.kalic.service.impl;

import com.kalic.mapper.AddressMapper;
import com.kalic.pojo.Address;
import com.kalic.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("addressService")
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressMapper addressMapper;
    @Override
    public int insAddressByUid(Address address) {
        return addressMapper.insAddressByUid(address);
    }

    @Override
    public int updAddressByAddrid(Address address) {
        return addressMapper.updAddressByAddrid(address);
    }

    @Override
    public int delAddressByAddrid(int addrid) {
        return addressMapper.delAddressByAddrid(addrid);
    }

    @Override
    public List<Address> selAllAddressByUid(int uid) {
        return addressMapper.selAllAddressByUid(uid);
    }

    @Override
    public Address selAddressByAddrid(int addrid) {
        return addressMapper.selAddressByAddrid(addrid);
    }
}
