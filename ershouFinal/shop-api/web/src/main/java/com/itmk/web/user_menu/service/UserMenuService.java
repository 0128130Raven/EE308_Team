package com.itmk.web.user_menu.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.sys_user.entity.AssignParm;
import com.itmk.web.user_menu.entity.UserMenu;

/**
 * @Author KaoRou
 * @Version 1.0.0
 */
public interface UserMenuService extends IService<UserMenu> {
    void saveMenu(AssignParm parm);
}
