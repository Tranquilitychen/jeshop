package com.kalic.pojo;

import java.io.Serializable;
import java.sql.Timestamp;

public class Order implements Serializable {
	private String orderid;
	private int uid;
	private double money;
	private int addrid;
	//订单状态
	private int state;
	//订单创建时间
	private Timestamp createTime;
	//订单支付时间
	private Timestamp payTime;
	//订单发送快递时间
	private Timestamp deliveryTime;
	//订单完成时间(顾客收货)
	private Timestamp closingTime;

	public String getOrderid() {
		return orderid;
	}
	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public double getMoney() {
		return money;
	}
	public void setMoney(double money) {
		this.money = money;
	}
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	public Timestamp getPayTime() {
		return payTime;
	}
	public void setPayTime(Timestamp payTime) {
		this.payTime = payTime;
	}
	public Timestamp getDeliveryTime() {
		return deliveryTime;
	}
	public void setDeliveryTime(Timestamp deliveryTime) {
		this.deliveryTime = deliveryTime;
	}
	public Timestamp getClosingTime() {
		return closingTime;
	}
	public void setClosingTime(Timestamp closingTime) {
		this.closingTime = closingTime;
	}
    public int getAddrid() {
        return addrid;
    }
    public void setAddrid(int addrid) {
        this.addrid = addrid;
    }
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "Order{" +
				"orderid=" + orderid +
				", uid=" + uid +
				", money=" + money +
				", addrid=" + addrid +
				", state=" + state +
				", createTime=" + createTime +
				", payTime=" + payTime +
				", deliveryTime=" + deliveryTime +
				", closingTime=" + closingTime +
				'}';
	}
}
