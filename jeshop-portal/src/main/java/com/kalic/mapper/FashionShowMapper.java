package com.kalic.mapper;

import com.kalic.pojo.FashionShow;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface FashionShowMapper {
    //1.获取fashion_show的商品
    @Select("select * from fashion_product")
    List<FashionShow> selAllFashionShow();

}
