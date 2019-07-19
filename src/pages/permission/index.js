import React from 'react';
import { Card, Button, Table, Modal, Form, Radio, DatePicker, Select, Input, Tree, Transfer } from 'antd';
import ETable from '../../components/ETable';
import Utils from '../../utils/utils';
import axios from '../../axios'
import menuConfig from '../../config/menuConfig';
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
const { TreeNode } = Tree;
export default class PermissionUser extends React.Component {
    constructor() {
        super();
        this.state = {
            isVisable: false,
            isPermissiionVisable: false,
            isUserVisiable: false
        }
    }
    componentWillMount() {
        axios.requestLists('role/list', {}, this);
    }
    handleCreate = () => {
        this.setState({
            isVisable: true
        })
    }
    // 角色提交
    handleRoleSubmit = () => {
        let data = this.RoleForm.props.form.getFieldsValue();
        axios.ajax({
            url: 'role/create',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isVisable: false
                });
                axios.requestLists('role/list', {}, this);
            }
        })
    }
    // 设置权限
    handleAuthorize = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                content: '请选择一个角色'
            });
            return;
        }
        this.setState({
            isPermissiionVisable: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }
    //    权限提交
    handlePermissionSubmit = () => {
        let item = this.PermEditForm.props.form.getFieldsValue();
        item.role_id = this.state.selectedItem.id;
        item.menus = this.state.menuInfo;
        axios.ajax({
            url: 'permission/edit',
            data: {
                params: { ...item }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isPermissiionVisable: false,
                    selectedRowKeys: ''
                });
                axios.requestLists('role/list', {}, this);
            }
        })
    }
    // 用户授权
    handleUserAuthorize = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                content: '请选择一个角色'
            });
            return;
        }
        this.setState({
            isUserVisiable: true,
            detailInfo: item
        })
        this.getRoleUserList(item.id);
    }
    getRoleUserList = (id) => {
        axios.ajax({
            url: 'user/user_list',
            data: {
                params: {
                    id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.getAuthUserList(res.result)
            }
        })
    }
    // 筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if (data.status == 1) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);

            }

            this.setState({
                mockData,
                targetKeys
            })
        }
    }
    handleAuthSubmit=()=>{
        let data={};
        data.user_ids=this.state.targetKeys;
        data.role_id=this.state.selectedItem.id;
        axios.ajax({
            url:'/user_role_edit',
            data:{
                params:{...data}
            }
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                    isUserVisiable:false
                });
                axios.requestLists('role/list', {}, this);
            }
        })
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            },
            {
                title: '角色名称',
                dataIndex: 'role_name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: function (time) {
                    return Utils.formateDate(time);
                }
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                render: function (status) {
                    return status == 1 ? '启用' : '停用'
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: function (time) {
                    return Utils.formateDate(time);
                }
            },
            {
                title: '授权人',
                dataIndex: 'authorize_user_name'
            },
        ]
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.handleCreate}>创建角色</Button>
                    <Button type='primary' onClick={this.handleAuthorize}>设置权限</Button>
                    <Button type='primary' onClick={this.handleUserAuthorize}>用户授权</Button>
                </Card>
                <Card>
                    <div className='content-wrap'>
                        <ETable dataSource={this.state.list} updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                            selectedRowKeys={this.state.selectedRowKeys}
                            columns={columns} />
                    </div>
                </Card>
                <Modal
                    title='创建角色'
                    visible={this.state.isVisable}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.RoleForm.props.form.resetFields()
                        this.setState({
                            isVisable: false,
                            selectedItem:null,
                            selectedRowKeys:null
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => { this.RoleForm = inst }}

                    ></RoleForm>
                </Modal>
                <Modal title="设置权限"
                    visible={this.state.isPermissiionVisable}
                    onOk={this.handlePermissionSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermissiionVisable: false,
                            selectedItem:null,
                            selectedRowKeys:null
                        })
                    }}
                >
                    <PermEditForm patchMenuInfo={(checkedKeys) => {
                        this.setState({
                            menuInfo: checkedKeys
                        })
                    }}
                        menuInfo={this.state.menuInfo}
                        detailInfo={this.state.detailInfo}
                        wrappedComponentRef={(inst) => { this.PermEditForm = inst }}

                    />
                </Modal>
                <Modal title="用户授权"
                    visible={this.state.isUserVisiable}
                    onOk={this.handleAuthSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisiable: false,
                            selectedItem:null,
                            selectedRowKeys:null
                        })
                    }}
                    width={800}
                >
                    <RoleAuthForm
                        mockData={this.state.mockData}
                        targetKeys={this.state.targetKeys}
                        detailInfo={this.state.detailInfo}
                        wrappedComponentRef={(inst) => { this.RoleAuthForm = inst }}
                        onChange={this.handleChange}
                        pathUserInfo={(targetKeys)=>{
                            this.setState({targetKeys})
                        }}
                    />
                </Modal>
            </div>
        )
    }
}
class RoleForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout='horizontal'>
                <Form.Item label='角色名称' {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type='text' placeholder='请输入角色名称' />
                        )
                    }
                </Form.Item>

                <Form.Item label='状态' {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                        })(
                            <Select>
                                <Option value={0}>停用</Option>
                                <Option value={1}>启用</Option>

                            </Select>
                        )
                    }
                </Form.Item>

            </Form>
        )
    }
}
RoleForm = Form.create({})(RoleForm)
class PermEditForm extends React.Component {
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            } else {
                return <TreeNode title={item.title} key={item.key}>

                </TreeNode>
            }
        })
    }
    onCheckKeys = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const { detailInfo } = this.props;
        const { menuInfo } = this.props;
        return (
            <Form layout='horizontal'>
                <Form.Item label='角色名称' {...formItemLayout}>
                    <Input type='text' disabled placeholder={detailInfo.role_name} />
                </Form.Item>

                <Form.Item label='状态' {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                            initialValue: detailInfo.status
                        })(
                            <Select>
                                <Option value={0}>停用</Option>
                                <Option value={1}>启用</Option>

                            </Select>
                        )
                    }
                </Form.Item>
                <Tree checkable defaultExpandAll onCheck={(checkedKeys) => {
                    this.onCheckKeys(checkedKeys)
                }} checkedKeys={menuInfo}>
                    <TreeNode title="平台权限" key='platform_all'>
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm)
class RoleAuthForm extends React.Component {
    handleChange = (targetKeys, direction, moveKeys) => {
        this.props.pathUserInfo(targetKeys);
    };
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const { detailInfo } = this.props;
        const { menuInfo } = this.props;
        const { mockData } = this.props;
        const { targetKeys } = this.props;
        return (
            <Form layout='horizontal'>
                <Form.Item label='角色名称' {...formItemLayout}>
                    <Input type='text' disabled placeholder={detailInfo.role_name} />
                </Form.Item>
                <Form.Item label='选择用户' {...formItemLayout}>
                    <Transfer dataSource={mockData}
                        titles={['待选用户', '已选用户']}
                        locale={{searchPlaceholder:'请输入用户名'}}
                        showSearch
                        filterOption={this.filterOption}
                        onSearch={this.handleSearch}
                        targetKeys={targetKeys}
                        render={item => item.title}
                        onChange={this.handleChange}
                        listStyle={{width:200,height:400}}
                    >

                    </Transfer>
                </Form.Item>

            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm)