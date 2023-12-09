package com.itmk.web.goods_order.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class OrderParm {
    private Long currentPage;
    private Long pageSize;
    private String goodsName;
}
