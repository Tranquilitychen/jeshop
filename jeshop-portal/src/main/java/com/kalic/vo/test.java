package com.kalic.vo;

import com.kalic.pojo.Order;

import java.io.IOException;
import java.sql.Timestamp;

public class test {

    public static void main(String args[]) throws IOException {
        //Order{orderid=0, uid=1, money=244.0, addrid=5, createTime=null, payTime=null, deliveryTime=null, closingTime=null}
        Order order  = new Order();
        Timestamp d = new Timestamp(System.currentTimeMillis());
        System.out.println(d);
        /*Product product = new Product();
        product.setPid(1);
        product.setPname("李嘉晨");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        //将对象转换成JSON字符串
        Writer writer = new StringWriter();         //创建一个输出流
        objectMapper.writeValue(writer, product);   //输出流与对象
        System.out.println("json:" + writer.toString());      //打印输出流信息


        //json转回对象
        Product product1 = objectMapper.readValue(writer.toString(), Product.class);
        System.out.println("Product:" + product1);

        String s = JSON.toJSONString(product1);
        System.out.println(s);*/
    }

}
