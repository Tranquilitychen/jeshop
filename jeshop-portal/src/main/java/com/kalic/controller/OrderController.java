package com.kalic.controller;

import com.alibaba.fastjson.JSONObject;
import com.kalic.pojo.Address;
import com.kalic.pojo.Order;
import com.kalic.pojo.OrderItem;
import com.kalic.pojo.Product;
import com.kalic.service.AddressService;
import com.kalic.service.OrderItemService;
import com.kalic.service.OrderService;
import com.kalic.service.ProductService;
import com.kalic.utils.SnowflakeIdWorker;
import com.kalic.vo.VoOrder;
import com.kalic.vo.VoOrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Controller
public class OrderController {
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private AddressService addressService;


    //1.结账 时 返回的 Order 数据（没有写入数据库中）(可能只使用一次)
    @ResponseBody
    @RequestMapping("/order/paymentProduct")
    public List<VoOrderItem> paymentProductJSON(HttpServletRequest request, HttpServletResponse response){
        //1.获取Session 中的需要支付的订单信息
        List<OrderItem> paymentOrderItem = (List<OrderItem>) request.getSession().getAttribute("paymentOrderItem");

        System.out.println(paymentOrderItem);

        //OrderItem的包装类
        List<VoOrderItem> voOrderItems = new ArrayList<>();
        if (paymentOrderItem != null){
            //2.完善OrderItem
            for (OrderItem orderItem: paymentOrderItem){
                int pid = orderItem.getPid();
                int pnumber = orderItem.getPnumber();
                Product product = productService.selProductForId(pid);

                //将信息包装到vo 中
                VoOrderItem voOrderItem = new VoOrderItem();
                voOrderItem.setPid(pid);
                voOrderItem.setPnumber(pnumber);
                voOrderItem.setProduct(product);

                voOrderItems.add(voOrderItem);
            }
            System.out.println(voOrderItems);
        }
        return voOrderItems;
    }

    //2.删除订单中的 订单项
    @RequestMapping("/order/deleteOvOrderItem")
    public String deleteOneOvOrderItem(String pid, HttpServletRequest request, HttpServletResponse response){
        int orderItemPid = Integer.parseInt(pid);
        //1.获取Session 中的需要支付的订单信息
        List<OrderItem> paymentOrderItem = (List<OrderItem>) request.getSession().getAttribute("paymentOrderItem");
        System.out.println(paymentOrderItem);

        for (int i = 0; i < paymentOrderItem.size(); i ++){
            int productId = paymentOrderItem.get(i).getPid();
            //如果 Session 中的 商品名 与 传来的删除的商品名相同，则跳出本次循环
            if (productId == orderItemPid){
                //删除这个 productId 元素
                paymentOrderItem.remove(i);
            }
        }
        //最后需要修改session
        System.out.println("删除后的Session内元素" + paymentOrderItem);

        request.getSession().setAttribute("paymentOrderItem", paymentOrderItem);

        return "redirect:/static/two/home/pay.html";
    }

    //3.生成订单信息(点击了提交订单按钮)
    @RequestMapping("/order/submitOrder")
    public String submitOrder(Order order, HttpServletRequest request){
        //Order{orderid=0, uid=1, money=244.0, addrid=5, createTime=null, payTime=null, deliveryTime=null, closingTime=null state=0}
        //1.完善订单信息
        Timestamp now = new Timestamp(System.currentTimeMillis());
        //生成订单时间
        order.setCreateTime(now);
        //支付订单时间（未支付--等待状态）
        //订单状态有 0 未支付 1 已支付 2 已发货 3已完成
        order.setPayTime(now);
        order.setState(0);

        //snowFlackeldWorker 生成 Order id
        SnowflakeIdWorker doWork = new SnowflakeIdWorker(0,0);
        System.out.println("Order:" + order);
        long id = doWork.nextId();
        String idstr = String.valueOf(id);
        System.out.println("id:" + id);
        System.out.println("idStr:" + idstr);
        order.setOrderid(idstr);

        System.out.println("Order:" + order);

        //2.完善订单项信息
        //需要添加到数据库的 pid 从 Session 中获取
        //2.1  Session 获取 订单项信息
        //Session 中的订单项信息
        List<OrderItem> paymentOrderItem = (List<OrderItem>) request.getSession().getAttribute("paymentOrderItem");
        System.out.println("paymentOrderItem：" + paymentOrderItem);

        List<OrderItem> saveOrderItem = new ArrayList<>();

        //获取 pid以及 pnumber 即可
        for (OrderItem orderItem: paymentOrderItem){
            int pid = orderItem.getPid();
            int pnumber = orderItem.getPnumber();

            OrderItem item = new OrderItem();
            item.setOrderid(idstr);
            item.setPid(pid);
            item.setPnumber(pnumber);

            saveOrderItem.add(item);
        }

        //保存Order 以及 OrderItem 到数据库中
        System.out.println("order:" + order);
        System.out.println("saveOrderItem:" + saveOrderItem);

        //3.保存Order 到数据库中
        int index = 0;


        try {
            index = orderService.insOrder(order);
            //判断是否添加成功，失败就不添加OrderItem
            if (index == 1 ){
                //一项一项添加OrderItem
                for (OrderItem orderItem: saveOrderItem) {
                    //添加时意外会报异常的感觉
                    index = orderItemService.insOrderItem(orderItem);
                }

                if (index == 1){
                    //删除 Session
                    request.getSession().removeAttribute("paymentOrderItem");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(index + "：1 表示订单添加成功以及删除了 Session 缓存。");
        System.out.println("待支付的订单的id:" + order.getOrderid());
        System.out.println("订单id:"+ idstr);
        //添加等待支付的一个session ,支付 页面需要
        request.getSession().setAttribute("wattingForPaymentOrderid", order.getOrderid());

        //跳转到支付页面，来张二维码
        return "redirect:/static/two/home/paymoney.html";
    }

    //4.检测是否支付成功,需要添加事务
    @ResponseBody
    @RequestMapping("/order/checkPay")
    public JSONObject checkPaySuccess(HttpServletRequest request){
        //4.1第三方支付软件的接口
        int index = 1;
        String json =  "";

        //4.2 获取Session 中的 订单 id, 修改 Order 的 支付时间
        if (index == 1){
            //获取orderid
            String orderid = (String) request.getSession().getAttribute("wattingForPaymentOrderid");
            //修改
            int i = orderService.updOrderPayTimeAndState(orderid);
            if (i != 1){
                System.out.println("需要进行事务回滚，把钱退回去");
            }else{
                //顺利完成， 修改完成，收钱完成
                json = "{\"pay\": \"success\"}";
            }
        }else{
            json = "{\"pay\": \"failure\"}";
        }

        JSONObject jsonObject = JSONObject.parseObject(json);
        return jsonObject;
    }

    //5.支付成功，删除session
    @ResponseBody
    @RequestMapping("/order/success")
    public VoOrder paysuccess(HttpServletRequest request){
        String orderid = (String) request.getSession().getAttribute("wattingForPaymentOrderid");
        Order order = orderService.selOrderByOrderid(orderid);
        //获取地址
        int addrid = order.getAddrid();
        Address address = addressService.selAddressByAddrid(addrid);
        //设置到 Order 的包装类中
        VoOrder voOrder = new VoOrder();
        if (address != null){
            voOrder.setAddress(address);
            voOrder.setOrderid(order.getOrderid());
            voOrder.setMoney(order.getMoney());
        }

        System.out.println(voOrder);
        //删除session
        request.getSession().removeAttribute("wattingForPaymentOrderid");
        return voOrder;
    }

    //6.个人中心，查询所有订单并完善
    @ResponseBody
    @RequestMapping("/order/personSelAllOrder")
    public List<VoOrder> personSelAllOrder(int uid){
        //1.查询所有的 uid 的订单
        List<VoOrder> voOrders = new ArrayList<>();
        List<Order> orders = orderService.selOrderByUid(uid);

        System.out.println("Order:" + orders);

        //2.将 订单 赋值到 VoOrder 包装类中
        for (Order order: orders){
            System.out.println("order:" + order);

            VoOrder voOrder = new VoOrder();

            voOrder.setUid(order.getUid());
            voOrder.setOrderid(order.getOrderid());
            voOrder.setAddrid(order.getAddrid());
            voOrder.setMoney(order.getMoney());
            voOrder.setCreateTime(order.getCreateTime());
            voOrder.setPayTime(order.getPayTime());
            voOrder.setDeliveryTime(order.getDeliveryTime());
            voOrder.setClosingTime(order.getClosingTime());
            voOrder.setState(order.getState());

            System.out.println("存放OrderItem以前 的 voOrder:" + voOrder);


            //查询OrderItem
            String orderid = voOrder.getOrderid();
            List<OrderItem> orderItems = orderItemService.selOrderItemByOrderId(orderid);
            List<VoOrderItem> voOrderItems = new ArrayList<>();

            for (OrderItem orderItem: orderItems){
                VoOrderItem voOrderItem = new VoOrderItem();
                voOrderItem.setOrderid(orderItem.getOrderid());
                voOrderItem.setItemid(orderItem.getItemid());
                voOrderItem.setPid(orderItem.getPid());
                voOrderItem.setPnumber(orderItem.getPnumber());

                // 赋值 Product product
                int pid = voOrderItem.getPid();
                Product product = productService.selProductForId(pid);
                voOrderItem.setProduct(product);

                System.out.println("VoOrderItem:" + voOrderItem);
                voOrderItems.add(voOrderItem);
                System.out.println("-----------------------------------------");
            }

            voOrder.setOrderItems(voOrderItems);
            System.out.println("完善数据之后的 voOrder:" + voOrder);
            voOrders.add(voOrder);
            System.out.println("-----------------------------------------");
        }

        System.out.println("VoOrders:" + voOrders);
        return  voOrders;
    }


    //7.个人中心，删除订单
    @ResponseBody
    @RequestMapping("/order/deleteOrderByOrderid")
    public int deleteOrder(String orderid){
        System.out.println(orderid);
        int index = 0;
        index = orderService.delOrderByOrderid(orderid);
        return index;
    }

    //8.个人中心，确认收货
    @ResponseBody
    @RequestMapping("/order/submitGetProduct")
    public int submitGetProduct(String orderid){
        System.out.println(orderid);
        int index = 0;
        index = orderService.updOrderclosingTimeAndState(orderid);
        return index;
    }

    //9.个人中心，支付订单
    @ResponseBody
    @RequestMapping("/order/payOrder")
    public JSONObject payOrder(String orderid){
        //4.1第三方支付软件的接口
        int index = 1;
        String json =  "";

        //4.2 获取Session 中的 订单 id, 修改 Order 的 支付时间
        if (index == 1){
            //修改
            int i = orderService.updOrderPayTimeAndState(orderid);
            if (i != 1){
                System.out.println("需要进行事务回滚，把钱退回去");
            }else{
                //顺利完成， 修改完成，收钱完成
                json = "{\"pay\": \"success\"}";
            }
        }else{
            json = "{\"pay\": \"failure\"}";
        }

        JSONObject jsonObject = JSONObject.parseObject(json);
        return jsonObject;
    }

}
