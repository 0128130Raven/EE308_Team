package com.itmk.web.sys_banner.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.itmk.web.goods.entity.Goods;
import lombok.Data;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
@Data
@TableName("sys_banner")
public class SysBanner {
    @TableId(type = IdType.AUTO)
    private Long banId;
    private Long goodsId;
    private String title;
    private String images;
    private String status;
    private Integer orderNum;
    @TableField(exist = false)
    private Goods goods;
}
