package com.kalic.controller;

import com.kalic.pojo.Address;
import com.kalic.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

@Controller
public class AddressController {
    @Autowired
    private AddressService addressService;

    @ResponseBody
    @RequestMapping("/address/getDatas")
    public List<Address> addressDataForUid(int uid){
        //应该可以直接获取，不需要什么验证
        List<Address> addresses = addressService.selAllAddressByUid(uid);
        System.out.println(addresses.size());
        return addresses;
    }

    //添加 地址信息（为订单生成页特制）
    @RequestMapping("/address/insertAddress")
    public String insertAddress(Address address) throws UnsupportedEncodingException {
        //收件人
        String addresseeEncode = address.getAddressee();
        String addressee = URLDecoder.decode(addresseeEncode, "utf-8");
        System.out.println("收件人：" + addressee);
        //地址
        String locationEncode  = address.getAddress();
        String location = URLDecoder.decode(locationEncode, "utf-8");
        System.out.println("地址：" + location);

        address.setAddress(location);
        address.setAddressee(addressee);

        System.out.println("Address:" + address);
        int result = addressService.insAddressByUid(address);
        System.out.println(result);
        if (result == 1){
            System.out.println("添加数据成功");
        }
        //跳转到对应页面
        return "redirect:/static/two/home/pay.html" ;
    }

    /**
     *  ---------------------------------------------------------------------------
     *  -------------------------以下方法提供给个人中心管理----------------------------
     *  ---------------------------------------------------------------------------
     */

    //1.增加地址信息 address
    @RequestMapping("/address/insertAddressForPerson")
    public String insertAddressForPerson(Address address) throws UnsupportedEncodingException {
        //收件人
        String addresseeEncode = address.getAddressee();
        String addressee = URLDecoder.decode(addresseeEncode, "utf-8");
        System.out.println("收件人：" + addressee);
        //地址
        String locationEncode  = address.getAddress();
        String location = URLDecoder.decode(locationEncode, "utf-8");
        System.out.println("地址：" + location);

        address.setAddress(location);
        address.setAddressee(addressee);

        System.out.println("Address:" + address);

        int result = addressService.insAddressByUid(address);
        System.out.println(result);
        if (result == 1){
            System.out.println("添加数据成功");
        }else {
            System.out.println("添加地址失败");
        }
        //跳转到对应页面
        return "redirect:/static/two/person/address.html" ;
    }

    //2.修改地址 address
    @RequestMapping("/address/updataAddress")
    public String updataAddress(Address address) throws UnsupportedEncodingException {
        //收件人
        String addresseeEncode = address.getAddressee();
        String addressee = URLDecoder.decode(addresseeEncode, "utf-8");
        System.out.println("收件人：" + addressee);
        //地址
        String locationEncode  = address.getAddress();
        String location = URLDecoder.decode(locationEncode, "utf-8");
        System.out.println("地址：" + location);

        address.setAddress(location);
        address.setAddressee(addressee);


        System.out.println("Address:" + address);

        int result = addressService.updAddressByAddrid(address);
        System.out.println(result);
        if (result == 1){
            System.out.println("修改数据成功");
        }
        //跳转到对应页面,ajax 调用Controller 后 返回的字符串会被存储在 ajax 的 data中，不会跳转
        return "redirect:/static/two/person/address.html" ;
    }

    //3.删除 地址 addrid
    @RequestMapping("/address/deleteAddress")
    public String deleteAddress(int addrid){
        System.out.println("addrid:" + addrid);
        int result = addressService.delAddressByAddrid(addrid);
        System.out.println(result);
        if (result == 1){
            System.out.println("删除地址成功");
        }
        //跳转到对应页面
        return "redirect:/static/two/person/address.html" ;
    }

}
