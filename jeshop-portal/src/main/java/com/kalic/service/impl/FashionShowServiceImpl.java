package com.kalic.service.impl;

import com.kalic.mapper.FashionShowMapper;
import com.kalic.pojo.FashionShow;
import com.kalic.service.FashionShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("fashionShowService")
public class FashionShowServiceImpl implements FashionShowService {
    @Autowired
    private FashionShowMapper fashionShowMapper;

    @Override
    public List<FashionShow> selAllFashionShow() {
        return fashionShowMapper.selAllFashionShow();
    }

}
