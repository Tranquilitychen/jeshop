package com.kalic.vo;

import com.kalic.pojo.Product;

import java.io.Serializable;

public class BuyerItem implements Serializable {

    /**
     * 购物车项
     */

    //购物车项的商品
    private Product product;

    //是否有货
    private Boolean isHave = true;

    //购买数量 (默认为1)
    private Integer amount = 1;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Boolean getHave() {
        return isHave;
    }

    public void setHave(Boolean have) {
        isHave = have;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    /**
     * 重写equals 方法就必须重写hashcode方法
     *
     * 关于hashcode，我们一定要知道一个口诀：
     *
     * 1、hashcode相等，两个对象不一定相等，需要通过equals方法进一步判断；
     *
     * 2、hashcode不相等，两个对象一定不相等；
     *
     * 3、equals方法为true，则hashcode肯定一样；
     *
     * 4、equals方法为false，则hashcode不一定不一样；
     */

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((product == null) ? 0 : product.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) //比较地址
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        BuyerItem other = (BuyerItem) obj;
        if (product == null) {
            if (other.product != null)
                return false;
        } else if (product.getPid() !=(other.product.getPid()))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "BuyerItem{" +
                "product=" + product +
                ", isHave=" + isHave +
                ", amount=" + amount +
                '}';
    }
}
