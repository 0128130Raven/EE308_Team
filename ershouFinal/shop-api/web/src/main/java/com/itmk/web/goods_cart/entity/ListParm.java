package com.itmk.web.goods_cart.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class ListParm {
    private Integer currentPage; //当前页
    private Integer pageSize;//每页查询的条数
    private String categoryName;
}
