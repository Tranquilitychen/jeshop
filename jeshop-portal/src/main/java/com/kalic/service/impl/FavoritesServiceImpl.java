package com.kalic.service.impl;

import com.kalic.mapper.FavoritesMapper;
import com.kalic.pojo.Favorites;
import com.kalic.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("favoritesService")
public class FavoritesServiceImpl implements FavoritesService {
    @Autowired
    private FavoritesMapper favoritesMapper;

    @Override
    public int insFavorites(Favorites favorites) {
        return favoritesMapper.insFavorites(favorites);
    }

    @Override
    public int deleteFavorites(int fid, int uid) {
        return favoritesMapper.deleteFavorites(fid, uid);
    }

    @Override
    public List<Favorites> selAllFavoritesProduct(int uid) {
        return favoritesMapper.selAllFavoritesProduct(uid);
    }

    @Override
    public Favorites selFavoritesByUidAndPid(int uid, int pid) {
        return favoritesMapper.selFavoritesByUidAndPid(uid, pid);
    }
}
