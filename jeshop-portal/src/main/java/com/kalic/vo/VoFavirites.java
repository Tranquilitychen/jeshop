package com.kalic.vo;

import com.kalic.pojo.Product;

import java.sql.Timestamp;

public class VoFavirites {
    private int fid;
    private int uid;
    private int pid;
    private int fpis;
    private Timestamp fdate;

    private Product product;

    public int getFid() {
        return fid;
    }

    public void setFid(int fid) {
        this.fid = fid;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public int getFpis() {
        return fpis;
    }

    public void setFpis(int fpis) {
        this.fpis = fpis;
    }

    public Timestamp getFdate() {
        return fdate;
    }

    public void setFdate(Timestamp fdate) {
        this.fdate = fdate;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "VoFavirites{" +
                "fid=" + fid +
                ", uid=" + uid +
                ", pid=" + pid +
                ", fpis=" + fpis +
                ", fdate=" + fdate +
                ", product=" + product +
                '}';
    }
}
