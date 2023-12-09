package com.itmk.web.goods_collect.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class CollectParm {
    private Long userId;
    private Long currentPage;
    private Long pageSize;
}
