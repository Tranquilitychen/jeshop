package com.kalic.service.impl;

import com.kalic.mapper.OrderMapper;
import com.kalic.pojo.Order;
import com.kalic.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

/**
 * 订单状态有 0 未支付 1 已支付 2 已发货 3已完成
 */
@Service("orderService")
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public List<Order> selOrderByUid(int uid) {
        return orderMapper.selOrderByUid(uid);
    }

    @Override
    public Order selOrderByOrderid(String orderid) {
        return orderMapper.selOrderByOrderid(orderid);
    }

    @Transactional(rollbackFor = {Exception.class})
    @Override
    public int insOrder(Order order) {
        return orderMapper.insOrder(order);
    }

    @Transactional(rollbackFor = {Exception.class})
    @Override
    public int updOrderPayTimeAndState(String orderid) {
        int state = 1;
        System.out.println("orderid:" + orderid);
        //获取当前时间
        Timestamp now = new Timestamp(System.currentTimeMillis());
        System.out.println("payTime:" + now);

        int index = orderMapper.updOrderPayTimeAndState(orderid, now, state);
        return index;
    }

    @Transactional(rollbackFor = {Exception.class})
    @Override
    public int updOrderDeliveryTimeAndState(String orderid) {
        //订单发货状态码是2
        int state = 2;
        System.out.println("orderid:" + orderid);
        //获取当前时间
        Timestamp now = new Timestamp(System.currentTimeMillis());
        System.out.println("deliveryTime:" + now);

        int index = orderMapper.updOrderDeliveryTimeAndState(orderid, now, state);
        return index;
    }

    @Transactional(rollbackFor = {Exception.class})
    @Override
    public int updOrderclosingTimeAndState(String orderid) {
        //订单完成状态码是3
        int state = 3;
        System.out.println("orderid:" + orderid);
        //获取当前时间
        Timestamp now = new Timestamp(System.currentTimeMillis());
        System.out.println("closingTime:" + now);

        int index = orderMapper.updOrderClosingTimeAndState(orderid, now, state);
        return index;
    }

    @Override
    public int delOrderByOrderid(String orderid) {
        return orderMapper.delOrderByOrderid(orderid);
    }

}
