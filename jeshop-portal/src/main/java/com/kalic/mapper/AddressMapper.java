package com.kalic.mapper;

import com.kalic.pojo.Address;

import java.util.List;

public interface AddressMapper {

    //1.新增地址 Address (uid) addrid addressee phone address
    int insAddressByUid(Address address);

    //2.修改地址 addrid addressee phone address
    int updAddressByAddrid(Address address);

    //3.删除地址 addrid
    int delAddressByAddrid(int addrid);

    //4.查询所有 uid 地址
    List<Address> selAllAddressByUid(int uid);

    //5.查询 addrid 地址
    Address selAddressByAddrid(int addrid);
}
