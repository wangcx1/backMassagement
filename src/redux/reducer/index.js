// reducer数据处理
import { type } from '../action/index'
const initialValue = {
    menuName: '首页',
    todos:[]
}
export default (state = initialValue, action) => {
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            };
        case type.ADD_TODOS:
            // let todos=action.todos;
            //     todos.push(action.todos);
            return {
                todos:[action.todos,...state.todos]
            }
        default:
            return { ...state };
    }
}