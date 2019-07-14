package com.kalic.vo;

import com.kalic.pojo.Address;
import com.kalic.pojo.CustomerInfo;
import com.kalic.pojo.Favorites;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class VoCustomer {
    private int uid;
    private String username;
    private String password;
    private String email;
    private Timestamp registerTime;
    private int state;
    private String validateCode;

    //感觉可以放到vo中（pojo包装类）
    //用户信息
    private CustomerInfo custommerInfo;
    //收货地址
    private List<Address> addresses = new ArrayList<Address>();
    //收藏夹信息
    private List<Favorites> fids = new ArrayList<Favorites>();

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Timestamp getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Timestamp registerTime) {
        this.registerTime = registerTime;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getValidateCode() {
        return validateCode;
    }

    public void setValidateCode(String validateCode) {
        this.validateCode = validateCode;
    }

    public CustomerInfo getCustommerInfo() {
        return custommerInfo;
    }

    public void setCustommerInfo(CustomerInfo custommerInfo) {
        this.custommerInfo = custommerInfo;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public List<Favorites> getFids() {
        return fids;
    }

    public void setFids(List<Favorites> fids) {
        this.fids = fids;
    }

    @Override
    public String toString() {
        return "VoCustomer{" +
                "uid=" + uid +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", registerTime=" + registerTime +
                ", state=" + state +
                ", validateCode='" + validateCode + '\'' +
                ", custommerInfo=" + custommerInfo +
                ", addresses=" + addresses +
                ", fids=" + fids +
                '}';
    }
}
