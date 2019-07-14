package com.kalic.vo;

import com.kalic.pojo.Product;

public class VoOrderItem {
    private int itemid;
    private String orderid;
    private int pid;
    private int pnumber;

    private Product product;

    public int getItemid() {
        return itemid;
    }

    public void setItemid(int itemid) {
        this.itemid = itemid;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public int getPnumber() {
        return pnumber;
    }

    public void setPnumber(int pnumber) {
        this.pnumber = pnumber;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "VoOrderItem{" +
                "itemid=" + itemid +
                ", orderid=" + orderid +
                ", pid=" + pid +
                ", pnumber=" + pnumber +
                ", product=" + product +
                '}';
    }
}
