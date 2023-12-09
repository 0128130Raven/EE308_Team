package com.itmk.web.goods_report.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.goods_report.entity.GoodsReport;
import com.itmk.web.goods_report.entity.ReportParm;
import com.itmk.web.goods_report.entity.ReportVo;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
public interface GoodsReportService extends IService<GoodsReport> {
    IPage<ReportVo> getList(ReportParm parm);
}
