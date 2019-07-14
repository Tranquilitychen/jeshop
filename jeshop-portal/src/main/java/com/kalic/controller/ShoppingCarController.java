package com.kalic.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kalic.pojo.OrderItem;
import com.kalic.pojo.Product;
import com.kalic.service.ProductService;
import com.kalic.vo.BuyCart;
import com.kalic.vo.BuyerItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Controller
public class ShoppingCarController {

    private static final String BUYER_CART = "Buyer_Cart";

    @Autowired
    private ProductService productService;

    //点击商品 加入购物车后回进入到此方法中，添加商品到 cookie
    @RequestMapping("/shopping/buyerCart")
    public <T> String buyCart(int pid, Integer amount, HttpServletRequest request, HttpServletResponse response) throws IOException {
        //将对象转换为json字符串/json字符串转成对象
        ObjectMapper om = new ObjectMapper();
        om.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        //声明购物车
        BuyCart buyCart = null;
        //1.获取Cookie中的购物车
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0){
            //检索 Cookie 中有没有 购物车的 json字段
            for (Cookie cookie: cookies){
                //如果获取到 Buyer_Cart 名称的 Cookie 将
                if (cookie.getName().equals(BUYER_CART)){
                    //将 购物车的 json数据转换成对象
                    buyCart = om.readValue(cookie.getValue(), BuyCart.class);
                    break;
                }
            }
        }

        //2.Cookie 中没有购物车对象，创建购物车对象
        if (null == buyCart){
            buyCart = new BuyCart();
        }

        //3.将 当前 id 商品追加到购物车
        if (pid != 0 && amount != null){
            Product product = new Product();
            product.setPid(pid);

            //将商品添加到购物车项中
            BuyerItem buyerItem = new BuyerItem();
            //设置商品
            buyerItem.setProduct(product);
            //设置商品数量
            buyerItem.setAmount(amount);

            System.out.println("buyerItem:" + buyerItem.toString());

            //添加到购物车
            buyCart.addItem(buyerItem);

            System.out.println("buyCart:" + buyCart.toString());
        }

        //排序 倒序
        List<BuyerItem> items = buyCart.getItems();
        Collections.sort(items, new Comparator<BuyerItem>() {
            @Override
            public int compare(BuyerItem o1, BuyerItem o2) {
                return -1;
            }
        });

        //前三点 登陆与非登录都是一样的操作，第四点需要判断
        //不管未登录与登陆都 可 用购物车，先不做Redires
        Writer w = new StringWriter();
        //将 购物车 对象 转换成json
        om.writeValue(w, buyCart);
        //保存 购物车中数据 到Cookie中
        Cookie cookie = new Cookie(BUYER_CART, w.toString());
        //设置path是可以共享cookie
        cookie.setPath("/");
        //设置过期时间 ：  -1 表示关闭浏览器失效  0: 立即失效  >0: 单位是秒, 多少秒后失效
        /*cookie.setMaxAge(24*60*60);     //一天*/
        //5.将cookie写入浏览器
        response.addCookie(cookie);

        //6.重定向到 商品显示页面 为购物车添加商品详情
        return "redirect:/static/two/home/shopcart.html";
    }

    //点击删除 删除购物车 pid 商品后到此方法中，从Cookie中 删除 pid 商品， 覆盖COOkie 之后再tocart 中 完善商品信息
    @RequestMapping("/shopping/delete")
    public <T> String deleteProductForCookie(int pid, HttpServletRequest request, HttpServletResponse response) throws IOException {
        //将对象转换为json字符串/json字符串转成对象
        ObjectMapper om = new ObjectMapper();
        om.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        //声明购物车
        BuyCart buyCart = null;
        //1.获取Cookie中的购物车
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0){
            //检索 Cookie 中有没有 购物车的 json字段
            for (Cookie cookie: cookies){
                //如果获取到 Buyer_Cart 名称的 Cookie 将
                if (cookie.getName().equals(BUYER_CART)){
                    //将 购物车的 json数据转换成对象
                    buyCart = om.readValue(cookie.getValue(), BuyCart.class);
                    break;
                }
            }
        }

        //2. 点击delete说明必定有 buyCart 的存在 Cookie 中没有购物车对象，创建购物车对象
        if (null == buyCart){
            buyCart = new BuyCart();
        }

        //3.将 当前 id 商品 从购物车中删除
        if (pid != 0){
            System.out.println("pid");
            //3.1获取BuyCart的buyerItem
            List<BuyerItem> buyerItems = buyCart.getItems();

            for (int i = 0; i < buyerItems.size(); i++){
                int buyItemPid = buyerItems.get(i).getProduct().getPid();
                if (buyItemPid == pid){
                    buyerItems.remove(i);
                    System.out.println("执行删除操作");
                }
            }
            System.out.println("buyCart:" + buyCart);
        }

        //排序 倒序
        List<BuyerItem> items = buyCart.getItems();
        Collections.sort(items, new Comparator<BuyerItem>() {
            @Override
            public int compare(BuyerItem o1, BuyerItem o2) {
                return -1;
            }
        });

        //前三点 登陆与非登录都是一样的操作，第四点需要判断
        //不管未登录与登陆都 可 用购物车，先不做Redires
        Writer w = new StringWriter();
        //将 购物车 对象 转换成json
        om.writeValue(w, buyCart);
        //保存 购物车中数据 到Cookie中
        Cookie cookie = new Cookie(BUYER_CART, w.toString());
        //设置path是可以共享cookie
        cookie.setPath("/");
        //设置过期时间 ：  -1 表示关闭浏览器失效  0: 立即失效  >0: 单位是秒, 多少秒后失效
        /*cookie.setMaxAge(24*60*60);     //一天*/
        //5.将cookie写入浏览器
        response.addCookie(cookie);

        //6.重定向到 商品显示页面 为购物车添加商品详情
        return "redirect:/static/two/home/shopcart.html";
    }

    //结算购物车结算页面
    //两种方式进入
    //1) 在商品详情页 点击加入购物车.
    //2) 直接点击购物车按钮 进入购物车结算页.
    @ResponseBody
    @RequestMapping("/shopping/toCart")
    public BuyCart toCart(HttpServletRequest request) throws IOException {
        //将购物车的 JSON 转化成Object 对象
        ObjectMapper om = new ObjectMapper();
        om.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        BuyCart buyCart = null;
        //1.获取Cookie中的购物车
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0){
            for (Cookie cookie : cookies){
                if (cookie.getName().equals(BUYER_CART)){
                    //购物车 json 转换成 购物车对象
                    buyCart = om.readValue(cookie.getValue(), BuyCart.class);
                    break;
                }
            }
        }

        //4.没有购物车
        if (buyCart == null){
            buyCart = new BuyCart();
        }

        //5.将购物车装满， 前面只是将商品的id 加入到了装购车， 这里还需要查询出商品的详情
        List<BuyerItem> items = buyCart.getItems();
        if (items.size() > 0){
            //只有购物车中有购物项，才可以将product 的相关信息加入到购物项中
            System.out.println("购物车项完善 product 相关信息");
            for(BuyerItem buyerItem : items){
                //查询出 每个购物项中的 商品 id
                int pid = buyerItem.getProduct().getPid();
                System.out.println("pid:" + pid);
                //根据id查询product
                Product product = productService.selProductForId(pid);
                //赋值到 购物车项
                System.out.println(product);

                buyerItem.setProduct(product);
            }
        }

        System.out.println("BuyerItem:" + items.toString());

        buyCart.setItems(items);


        /*//转换为JSON
        String json = JSON.toJSONString(buyCart);*/

        //6.直接回显页面
        /*ModelAndView modelAndView = new ModelAndView("redirect:/static/two/home/shopcart.html");
        modelAndView.addObject("json",json);*/

       /* System.out.println("json:" + json);*/

        //跳转到购物详情页面
        return buyCart;
    }


    //点击结算时 的 结算页面 的Controller
    @RequestMapping("/shopping/payment")
    public String trueBuy(int[] pids, int[] amounts, HttpServletRequest request, HttpServletResponse response) throws IOException {
        //需要生成订单了
        List<OrderItem> orderItems = new ArrayList<>();

        for (int i = 0; i < pids.length; i ++){
            System.out.println("amount:" + amounts[i]);
            System.out.println("pid:" + pids[i]);
        }

        //1.获取Cookie
        //将购物车的 JSON 转化成Object 对象
        ObjectMapper om = new ObjectMapper();
        om.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        BuyCart buyCart = null;
        //1.获取Cookie中的购物车
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0){
            for (Cookie cookie : cookies){
                if (cookie.getName().equals(BUYER_CART)){
                    //购物车 json 转换成 购物车对象
                    buyCart = om.readValue(cookie.getValue(), BuyCart.class);
                    break;
                }
            }
        }

        //2.获取指定id 的Cookie信息，生成订单
        for (int j = 0; j < pids.length; j++){
            //下单的商品 id
            int pid = pids[j];
            //下单的商品数量 amount
            int amount = amounts[j];

            if (pid != 0){
                System.out.println("获取指定id的信息");
                List<BuyerItem> buyerItems = buyCart.getItems();
                for (int i = 0; i < buyerItems.size(); i++){
                    //搜索相同的id 先赋值 再删除
                    int buyItemPid = buyerItems.get(i).getProduct().getPid();

                    //搜索到进行 数量修改
                    if(buyItemPid == pid){
                        OrderItem orderItem = new OrderItem();
                        //修改完成后需要将这个item 取出 添加到 订单项中
                        orderItem.setPid(pid);
                        orderItem.setPnumber(amount);

                        orderItems.add(orderItem);
                        //从Coolie 中删除
                        buyerItems.remove(i);
                        System.out.println("执行删除操作");
                    }
                }
            }
        }

        //排序 倒序
        List<BuyerItem> items = buyCart.getItems();
        Collections.sort(items, new Comparator<BuyerItem>() {
            @Override
            public int compare(BuyerItem o1, BuyerItem o2) {
                return -1;
            }
        });

        System.out.println("orderItems:" + orderItems);
        System.out.println("buyCart:" + buyCart);

       //不管未登录与登陆都 可 用购物车，先不做Redires
        Writer w = new StringWriter();
        //将 购物车 对象 转换成json
        om.writeValue(w, buyCart);
        //保存 购物车中数据 到Cookie中
        Cookie cookie = new Cookie(BUYER_CART, w.toString());
        //设置path是可以共享cookie
        cookie.setPath("/");
        //设置过期时间 ：  -1 表示关闭浏览器失效  0: 立即失效  >0: 单位是秒, 多少秒后失效
        //cookie.setMaxAge(24*60*60);     //一天
        //5.将cookie写入浏览器
        response.addCookie(cookie);

        //将 需要支付的 Order 中的 商品信息存到Session中
        request.getSession().setAttribute("paymentOrderItem", orderItems);
        return "/shopping/toPay";
    }

    @RequestMapping("/shopping/toPay")
    public String toPaymentPage(){
        return "redirect:/static/two/home/pay.html";
    }

}
