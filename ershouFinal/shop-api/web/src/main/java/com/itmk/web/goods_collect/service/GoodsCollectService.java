package com.itmk.web.goods_collect.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.goods.entity.Goods;
import com.itmk.web.goods_collect.entity.CollectParm;
import com.itmk.web.goods_collect.entity.GoodsCollect;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
public interface GoodsCollectService extends IService<GoodsCollect> {
    IPage<Goods> getMyCollect(CollectParm parm);
}
