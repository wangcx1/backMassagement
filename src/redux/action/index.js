// Action 类型
export const type = {
    SWITCH_MENU: 'SWITCH_MENU',
    ADD_TODOS: 'ADD_TODOS'
}
// 菜单点击切换，修改面包屑的名称
export const switchMenu = (menuName) => {
    return {
        type: type.SWITCH_MENU,
        menuName
    }
}
// 添加TODO
export const addTodos = (todos) => {
    return {
        type: type.ADD_TODOS,
        todos:todos
    }
}