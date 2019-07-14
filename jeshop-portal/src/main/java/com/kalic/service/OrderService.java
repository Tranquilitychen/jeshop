package com.kalic.service;

import com.kalic.pojo.Order;

import java.util.List;

public interface OrderService {

    // 1.查询Order 信息 int uid
    List<Order> selOrderByUid(int uid);

    //1.1通过 orderid 查询 Order
    Order selOrderByOrderid(String orderid);

    // 2.插入Order 信息 Order
    int insOrder(Order order);

    //3.修改订单支付时间以及支付状态
    int updOrderPayTimeAndState(String orderid);

    //4.修改发货时间及状态
    int updOrderDeliveryTimeAndState(String orderid);

    //5.修改订单完成时间及状态
    int updOrderclosingTimeAndState(String orderid);

    //6.删除订单
    int delOrderByOrderid(String orderid);

}
