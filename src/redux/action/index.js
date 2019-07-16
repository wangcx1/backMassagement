// Action 类型
export const type = {
    SWITCH_MENU: 'SWITCH_MENU'
}
// 菜单点击切换，修改面包屑的名称
let switchMenu = (menuName) => {
    return {
        type: type.SWITCH_MENU,
        menuName
    }
}
export default switchMenu;