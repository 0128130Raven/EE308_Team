package com.itmk.web.wx_user.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class UpadateParm {
    private Long userId;
    private String password;
    private String oldPassword;
}