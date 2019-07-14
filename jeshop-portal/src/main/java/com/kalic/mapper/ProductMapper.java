package com.kalic.mapper;

import java.sql.Timestamp;
import java.util.List;

import com.kalic.pojo.Product;

public interface ProductMapper {

	//1.获取所有的商品
	List<Product> selAllProduct();
	
	//2.根据商品的Type来获取商品
	List<Product> selProductForType(int ptype);
	
	//3.根据商品的 id 查询商品
	Product selProductForId(int pid);
	
	//4.模糊查询，根据关键字(商品名称)查询商品
	List<Product> selProductForKey(String key);

	//5.根据时间查询商品 limit 为查询条数
    List<Product> selProductTimeFirst(int limit);

	int updProduct(Product product);

	int insProduct(Product product);
}
