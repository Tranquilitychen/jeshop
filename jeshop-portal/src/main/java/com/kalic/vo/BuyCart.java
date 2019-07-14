package com.kalic.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class BuyCart implements Serializable {
    /**
     * 购物车
     */
    private static final long serialVersionUID = 1L;


    //商品结果集
    private List<BuyerItem> items = new ArrayList<>();

    //添加购物项到购物车
    public void addItem(BuyerItem item){
        //判断 添加的商品 是否包含相同的购物项，相同就追加数量进行合并
        if (items.contains(item)){
            //存在 添加的商品  追加数量
            for (BuyerItem buyerItem: items){
                if (buyerItem.equals(item)){
                    //添加的商品的数量 + 之前购物车中商品的数量
                    buyerItem.setAmount(item.getAmount() + buyerItem.getAmount());
                }
            }
        }else{
            items.add(item);
        }
    }

    public List<BuyerItem> getItems(){
        return items;
    }

    public void setItems(List<BuyerItem> items){
        this.items = items;
    }

    //小计-商品总量
    @JsonIgnore
    public Integer getProductAmount(){
        Integer result = 0;
        //计算
        for (BuyerItem buyerItem : items){
            result += buyerItem.getAmount();
        }
        return  result;
    }

    //计算购物车 商品 总价 (double 类型)
    @JsonIgnore
    public double getProductPrice(){
        double result = 0;
        //计算
        for (BuyerItem buyerItem: items){
            //购物车内商品 * 商品单价
            result += buyerItem.getAmount() * buyerItem.getProduct().getPrice();
        }
        return result;
    }

    @Override
    public String toString() {
        return "BuyCart{" +
                "items=" + items +
                '}';
    }

}
