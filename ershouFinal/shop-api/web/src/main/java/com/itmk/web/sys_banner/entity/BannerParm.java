package com.itmk.web.sys_banner.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class BannerParm {
    private Long currentPage;
    private Long pageSize;
    private String title;
}
