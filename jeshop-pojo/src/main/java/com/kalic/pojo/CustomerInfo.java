/**
 * 
 */
package com.kalic.pojo;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @author kalic
 *
 */
public class CustomerInfo implements Serializable {
	private int uid;
	private int sex;
	//购物名（淘宝名）
	private String shopName;
	//头像路径
	private String headSculpture;
	private Timestamp birth;
	
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getHeadSculpture() {
		return headSculpture;
	}
	public void setHeadSculpture(String headSculpture) {
		this.headSculpture = headSculpture;
	}

	public Timestamp getBirth() {
		return birth;
	}

	public void setBirth(Timestamp birth) {
		this.birth = birth;
	}

	@Override
	public String toString() {
		return "CustomerInfo{" +
				"uid=" + uid +
				", sex=" + sex +
				", shopName='" + shopName + '\'' +
				", headSculpture='" + headSculpture + '\'' +
				", birth=" + birth +
				'}';
	}
}
