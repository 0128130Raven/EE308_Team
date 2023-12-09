package com.itmk.web.goods.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class WxIndexParm {
    private Long currentPage;
    private Long pageSize;
    private String categoryId;
    private String keywords;
}
