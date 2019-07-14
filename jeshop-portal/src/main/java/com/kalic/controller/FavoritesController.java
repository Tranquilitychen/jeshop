package com.kalic.controller;

import com.kalic.pojo.Favorites;
import com.kalic.pojo.Product;
import com.kalic.service.FavoritesService;
import com.kalic.service.ProductService;
import com.kalic.vo.VoFavirites;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Controller
public class FavoritesController {
    @Autowired
    private FavoritesService favoritesService;
    @Autowired
    private ProductService productService;

    @ResponseBody
    @RequestMapping("/favorites/selAllFavorites")
    public List<VoFavirites> selAllFavorites(int uid){
        List<Favorites> favoritess = favoritesService.selAllFavoritesProduct(uid);
        List<VoFavirites> voFaviritess = new ArrayList<>();

        for (Favorites favorites : favoritess){
            VoFavirites voFavirite = new VoFavirites();
            voFavirite.setFid(favorites.getFid());
            voFavirite.setUid(favorites.getUid());
            voFavirite.setPid(favorites.getPid());
            voFavirite.setFpis(favorites.getFpis());
            voFavirite.setFdate(favorites.getFdate());

            int pid = voFavirite.getPid();
            Product product = productService.selProductForId(pid);
            System.out.println("product:" + product);

            voFavirite.setProduct(product);
            System.out.println("voFavirite:" + voFavirite);
            voFaviritess.add(voFavirite);
        }

        System.out.println(voFaviritess);
        return voFaviritess;
    }

    //删除收藏商品
    @ResponseBody
    @RequestMapping("/favorites/deleteFaviritesProduct")
    public int deleteFaviritesProduct(int fid, int uid){
        int index = 0;
        if (fid != 0){
            index = favoritesService.deleteFavorites(fid, uid);
        }
        return index;
    }

    @ResponseBody
    @RequestMapping("/favorites/insertFaviritesProduct")
    public int insertFaviritesProduct(Favorites favorites){
        int index = 0;
        int uid = favorites.getUid();
        int pid = favorites.getPid();

        if (uid != 0 && pid != 0){
            //查询下该商品是否已经存在
            Favorites favorites1 = favoritesService.selFavoritesByUidAndPid(uid, pid);

            if (favorites1 == null){
                System.out.println("可以插入");
                Timestamp now = new Timestamp(System.currentTimeMillis());
                favorites.setFdate(now);
                System.out.println("favorites:" + favorites);;
                index = favoritesService.insFavorites(favorites);
            }else{
                System.out.println("返回2表明该商品已经存在在收藏夹了");
                return 2;
            }
        }
        return index;
    }


}
