package com.kalic.mapper;


import com.kalic.pojo.Order;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
import java.util.List;

public interface OrderMapper {
    // 1.查询Order 信息 int uid
    List<Order> selOrderByUid(int uid);

    //1.1通过 orderid 来查询Orderid;
    Order selOrderByOrderid(String orderid);

    // 2.插入Order 信息 Order
    int insOrder(Order order);

    //3.删除 Order 信息 （只有完成订单3  或者 未支付的订单0 才可以删除）
    //订单状态有 0 未支付 1 已支付 2 已发货 3已完成

    //3.修改订单的支付时间以及状态
    int updOrderPayTimeAndState(@Param("orderid") String orderid, @Param("payTime") Timestamp payTime, @Param("state") int state);

    //4.修改订单的发送时间以及状态
    int updOrderDeliveryTimeAndState(@Param("orderid") String orderid, @Param("deliveryTime") Timestamp deliveryTime, @Param("state") int state);

    //5.修改订单的完成时间以及状态
    int updOrderClosingTimeAndState(@Param("orderid") String orderid, @Param("closingTime") Timestamp closingTime, @Param("state") int state);

    //6.删除订单
    int delOrderByOrderid(String orderid);

}
