package com.kalic.service.impl;

import com.kalic.mapper.OrderItemMapper;
import com.kalic.pojo.OrderItem;
import com.kalic.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("orderItemService")
public class OrderItemServiceImpl implements OrderItemService {
    @Autowired
    private OrderItemMapper orderItemMapper;

    @Transactional(rollbackFor = {Exception.class})
    @Override
    public int insOrderItem(OrderItem orderItem) {
        return orderItemMapper.insOrderItem(orderItem);
    }

    @Override
    public List<OrderItem> selOrderItemByOrderId(String orderId) {
        return orderItemMapper.selOrderItemByOrderId(orderId);
    }
}
