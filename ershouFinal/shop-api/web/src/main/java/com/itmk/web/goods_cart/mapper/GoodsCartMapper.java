package com.itmk.web.goods_cart.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.itmk.web.goods_cart.entity.GoodsCart;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
public interface GoodsCartMapper extends BaseMapper<GoodsCart> {

    void remove(Long userId, Long goodsId);

}
