package com.kalic.pojo;

import java.io.Serializable;

public class FashionShow implements Serializable {
    private int fashion_id;
    private int pid;

    public int getFashion_id() {
        return fashion_id;
    }

    public void setFashion_id(int fashion_id) {
        this.fashion_id = fashion_id;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }
}
