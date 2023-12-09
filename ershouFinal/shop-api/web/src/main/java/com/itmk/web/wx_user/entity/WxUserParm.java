package com.itmk.web.wx_user.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class WxUserParm {
    private Long currentPage;
    private Long pageSize;
    private String phone;
}
