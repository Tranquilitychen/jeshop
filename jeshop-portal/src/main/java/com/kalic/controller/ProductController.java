package com.kalic.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.kalic.pojo.FashionShow;
import com.kalic.service.FashionShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kalic.pojo.Customer;
import com.kalic.pojo.Product;
import com.kalic.service.ProductService;

@RestController
public class ProductController {
	@Autowired
	private ProductService productService;
	@Autowired
	private FashionShowService fashionShowService;
	
	//1.获取全部商品
	
	@RequestMapping("/product/selAllProduct")
	public List<Product> selAllProduct() {
		List<Product> products = productService.selAllProduct();
		
		return products;
	}
	
	//2.根据商品的Type来获取商品
	@RequestMapping("/product/selProductForType")
	public List<Product> selProductForType(int ptype) {
		List<Product> products = productService.selProductForType(ptype);
		return products;
	}
	
	//3.根据商品的 id 查询商品
	@RequestMapping("/product/selProductForId")
	public Product selProductForId(int pid) {
		Product product = productService.selProductForId(pid);
		return product;
	}
	//4.模糊查询，根据关键字(商品名称)查询商品
	@RequestMapping("/product/selAllProductForKey")
	public List<Product> selProductForKey(String key) {
        try {
            String keyStr = URLDecoder.decode(key, "utf-8");
            System.out.println(keyStr);
            List<Product> products = productService.selProductForKey(keyStr);
            return products;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            System.out.println("传入的数据有误！");
        }
        return null;
	}

	//5.获取 首页的推荐商品 fashionShop
	@RequestMapping("/product/fashionShow")
	public List<Product> getProductForFashionKey(){
	    List<Product> products = new ArrayList<>();
        //1.获取fashionShop的id 以此获取 pid;
	    List<FashionShow> fashionShows = fashionShowService.selAllFashionShow();
        //2. 根据pid 获取 product
        for (FashionShow fashionshow: fashionShows) {
            int pid = fashionshow.getPid();
            //查询Product
            Product product = productService.selProductForId(pid);
            products.add(product);
        }
        return products;
	}

	//6.设置首页的 最新商品
    @RequestMapping("/product/showNewProduct")
    public List<Product> showNewProduct(int limit){
	    //首先设置limit 显示的条数
        List<Product> products = productService.selProductTimeFirst(limit);
        return products;
    }

    @RequestMapping("/product/pageInfo")
    public PageInfo<Product> showAllProductWithPageInfo(Integer currentPage, Integer pageSize){

		PageHelper.startPage(currentPage, pageSize);
		List<Product> products = productService.selAllProduct();
		PageInfo pageInfo = new PageInfo(products);
		return pageInfo;
	}
	
}
