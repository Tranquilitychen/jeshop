package com.kalic.service;

import com.kalic.pojo.OrderItem;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderItemService {

    //1.添加订单项 OrderItem
    int insOrderItem(OrderItem orderItem);

    //2.查询订单的订单项 orderId（String）
    List<OrderItem> selOrderItemByOrderId(@Param("orderId") String orderId);

}
