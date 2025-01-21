// 角色接口
export interface IRole {
    roleId?: number; // 角色id
    role?: number;
    roleName: string; // 角色名称
    authority?: number[]; // 权限id数组
}

// 有权限的角色接口
export interface IRoleWithAuth {
    roleId: number;
    roleName: string;
    authority: [];
}
// 用户接口
export interface IUser {
    id: number;
    userName: string;
    nickName: string;
    role: IRole[];
}
// 用户查询接口
export interface IQueryUser {
    nickName: string; // 用户别名
    role: number; // 角色编号
}
// 用户编辑接口
export interface IUserEdit {
    id: number; // 用户id
    nickName: string; // 用户昵称
    role: number[]; // 用户角色
    userName: string; // 用户名
}

export interface IAuth {
    name: string; // 权限名称
    roleId: number; // 角色ID
    roleList?: IAuth[]; // 角色列表 子权限
}

export interface IProject {
    userId: number; // 项目
    id: number; // 项目id
    title: string; // 项目标题
    introduce: string; // 项目介绍
}
