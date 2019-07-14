package com.kalic.vo;

import java.io.Serializable;

public class VoCustomerInfo implements Serializable {
    private int uid;
    private int newCustomer;
    private String shopName;
    private String radio;
    private String birth;
    //路径
    private String headSculpture;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getNewCustomer() {
        return newCustomer;
    }

    public void setNewCustomer(int newCustomer) {
        this.newCustomer = newCustomer;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getRadio() {
        return radio;
    }

    public void setRadio(String radio) {
        this.radio = radio;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getHeadSculpture() {
        return headSculpture;
    }

    public void setHeadSculpture(String headSculpture) {
        this.headSculpture = headSculpture;
    }

    @Override
    public String toString() {
        return "VoCustomerInfo{" +
                "uid=" + uid +
                ", newCustomer=" + newCustomer +
                ", shopName='" + shopName + '\'' +
                ", radio='" + radio + '\'' +
                ", birth='" + birth + '\'' +
                ", headSculpture='" + headSculpture + '\'' +
                '}';
    }
}
