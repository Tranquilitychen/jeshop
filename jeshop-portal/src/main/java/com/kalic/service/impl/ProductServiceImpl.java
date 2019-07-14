package com.kalic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kalic.mapper.ProductMapper;
import com.kalic.pojo.Product;
import com.kalic.service.ProductService;

@Service("productService")
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductMapper productMapper;

	@Override
	public List<Product> selAllProduct() {
		return productMapper.selAllProduct();
	}

	@Override
	public List<Product> selProductForType(int ptype) {
		return productMapper.selProductForType(ptype);
	}

	@Override
	public Product selProductForId(int pid) {
		return productMapper.selProductForId(pid);
	}

	@Override
	public List<Product> selProductForKey(String key) {
		return productMapper.selProductForKey(key);
	}

	@Override
	public List<Product> selProductTimeFirst(int limit) {
		return productMapper.selProductTimeFirst(limit);
	}


}
