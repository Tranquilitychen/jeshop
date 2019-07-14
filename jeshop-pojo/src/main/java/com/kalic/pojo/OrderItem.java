package com.kalic.pojo;

import java.io.Serializable;

public class OrderItem implements Serializable {
	private int itemid;
	private String orderid;
	private int pid;
	private int pnumber;
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

	@Override
	public String toString() {
		return "OrderItem{" +
				"itemid=" + itemid +
				", orderid=" + orderid +
				", pid=" + pid +
				", pnumber=" + pnumber +
				'}';
	}
}
