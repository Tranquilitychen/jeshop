package com.kalic.test;

import com.kalic.mapper.ProductMapper;
import com.kalic.pojo.Product;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

public class test {

    public static void main(String args[]) throws SQLException {
        ApplicationContext applicationContext =
                new ClassPathXmlApplicationContext("applicationContext.xml");
        DataSource dataSource = (DataSource) applicationContext.getBean("dataSource");
        System.out.println(dataSource.getConnection());

        //修改
        ProductMapper productMapper = (ProductMapper) applicationContext.getBean("productMapper");

        List<Product> products = productMapper.selProductForKey("日用品");

        for (Product product: products) {
            System.out.println(product);
        }

//        List<Product> products = productMapper.selProductTimeFirst(4);
//        for (Product product: products) {
//            System.out.println(product.getPid());
//        }

      /*  for (int i = 5; i < 48; i ++){
            Timestamp d = new Timestamp(System.currentTimeMillis());

            Product product = new Product();
            product.setPid(i);
            product.setPtime(d);
            productMapper.updProduct(product);
        }*/

      /*  productMapper.selProductForKey();*/

       /* List<Product> products = productMapper.selProductForType(4);
        for (Product product: products) {
            //进行修改
            String pname = product.getPname();
            *//*//*jeshop/image/shenghuo/riyongpin_12.jpg*//*
            product.setPimg("/jeshop/image/bilibili/" + pname + ".png");
            productMapper.updProduct(product);
        }*/


    }


}
