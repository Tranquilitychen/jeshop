package com.kalic.pojo;

import java.io.Serializable;
import java.sql.Timestamp;

public class Product implements Serializable {
	private int pid;
	private String pname;
	//商品库存
	private int stock;
	//商品价格
	private double price;
	private String pimg;
	private String describe;
	private Timestamp ptime;
	private int ptype;

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getPimg() {
		return pimg;
	}

	public void setPimg(String pimg) {
		this.pimg = pimg;
	}

	public String getDescribe() {
		return describe;
	}

	public void setDescribe(String describe) {
		this.describe = describe;
	}

	public int getPtype() {
		return ptype;
	}

	public void setPtype(int ptype) {
		this.ptype = ptype;
	}


    public Timestamp getPtime() {
        return ptime;
    }

    public void setPtime(Timestamp ptime) {
        this.ptime = ptime;
    }

	@Override
	public String toString() {
		return "Product{" +
				"pid=" + pid +
				", pname='" + pname + '\'' +
				", stock=" + stock +
				", price=" + price +
				", pimg='" + pimg + '\'' +
				", describe='" + describe + '\'' +
				", ptime=" + ptime +
				", ptype=" + ptype +
				'}';
	}
}
