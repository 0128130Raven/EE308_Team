package com.itmk.web.goods_cart.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.goods_cart.entity.GoodsCart;
import com.itmk.web.goods_cart.mapper.GoodsCartMapper;
import com.itmk.web.goods_cart.service.GoodsCartService;
import org.springframework.stereotype.Service;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Service
public class GoodsCartServiceImpl extends ServiceImpl<GoodsCartMapper, GoodsCart> implements GoodsCartService {
}
