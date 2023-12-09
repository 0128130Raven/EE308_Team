package com.itmk.web.wx_user.entity;

import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class LoginVo {
    private Long userId;
    private String phone;
    private String nickName;
    private String token;
}
