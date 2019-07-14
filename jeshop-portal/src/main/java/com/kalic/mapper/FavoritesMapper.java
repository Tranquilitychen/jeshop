package com.kalic.mapper;

import com.kalic.pojo.Favorites;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FavoritesMapper {
    //1.插入收藏商品
    int insFavorites(Favorites favorites);

    //2.删除收藏商品
    int deleteFavorites(@Param("fid") int fid, @Param("uid") int uid);

    //3.查询所有收藏商品
    List<Favorites> selAllFavoritesProduct(int uid);

    //4.通过 uid, 与 pid 查询是否收藏过该商品
    Favorites selFavoritesByUidAndPid(@Param("uid") int uid,@Param("pid") int pid);

}
