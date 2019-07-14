package com.kalic.service;

import java.util.List;

import com.kalic.pojo.Product;

public interface ProductService {
	List<Product>  selAllProduct();
	
	List<Product> selProductForType(int ptype);
	
	Product selProductForId(int pid);
	
	List<Product> selProductForKey(String key);

	List<Product> selProductTimeFirst(int limit);
}
