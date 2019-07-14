package com.kalic.pojo;

import java.io.Serializable;

public class Ptype implements Serializable {
	private int ptype;
	private String tname;
	
	
	public int getPtype() {
		return ptype;
	}
	public void setPtype(int ptype) {
		this.ptype = ptype;
	}
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}

}
