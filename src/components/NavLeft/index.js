import React from 'react'
import { Menu, Icon } from 'antd';
import './index.less';
import { connect } from 'react-redux';
import switchMenu  from '../../redux/action/index';
import MenuConfig from '../../config/menuConfig';
import { NavLink } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
class NavLeft extends React.Component {
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
        this.setState({ menuTreeNode, currentKey })
    }
    handleClick = ({item,key}) => {
        const { dispatch } = this.props;
        console.log(item.props.title);
        dispatch(switchMenu(item.props.title));
        this.setState({
            currentKey: key
        })
    }
    //菜单渲染
    renderMenu = (data) => {
        return data.map((item, index) => {
            if (item.children) {
                return (<SubMenu title={item.title} key={item.key}>
                    {this.renderMenu(item.children)}
                </SubMenu>)
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>

        })
    }
    render() {

        return (
            <div >
                <div className='logo'>
                    <img src="/assets/logo.png" />
                    <h1>gundam</h1>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey} theme="dark">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
export default connect()(NavLeft);