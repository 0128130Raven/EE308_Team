package com.itmk.web.sys_user.entity;

import lombok.Data;

import java.util.List;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
public class AssignParm {
    //用户id
    private Long assId;
    //用户分配的菜单id的集合
    private List<Long> list;
}
