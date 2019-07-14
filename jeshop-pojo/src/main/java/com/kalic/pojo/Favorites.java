package com.kalic.pojo;

import java.io.Serializable;
import java.sql.Timestamp;

public class Favorites implements Serializable {
	private int fid;
	private int uid;
	//收藏的商品 id
	private int pid;
	//收藏商品的状态，当fpid为1时为收藏，为0时取消收藏
	private int fpis;
	//收藏时间
	private Timestamp fdate;

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
	
}
