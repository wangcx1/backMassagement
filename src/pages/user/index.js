import React from 'react';
import { Card, Button, Table, Modal, Form, Radio, DatePicker, Select, Input } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import ETable from '../../components/ETable';
import BaseForm from '../../components/BaseForm'
import moment from 'moment';
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
export default class User extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            isVisible: false
        }
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            placeholder: '请输入用户名',
            field: 'user_name',
            width: 100
        },
        {
            type: 'INPUT',
            label: '用户手机号',
            placeholder: '请输入用户手机号',
            field: 'user_password',
            width: 100
        },
        {
            type: 'datepicker',
            label: '请选择入职日期',
            placeholder: '请输入日期',
            field: 'user_date',
            width: 100
        }
    ];
    componentDidMount() {
        this.requestList();
    }
    requestList = () => {
        let _this = this;
        axios.requestLists('table/list1', this.params, _this, true);
    }
    handleFilterSubmit = (params) => {
        this.params = params;
        this.requestList();
    }
    handleOperator = (type) => {
        let item = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            });
        } else if (type == 'edit') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                });
                return;

            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item
            });

        } else if (type == 'detail') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                });
                return;

            }
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item
            });
        } else {
            let _this = this;
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                });
                return;

            }
            Modal.confirm({
                title: '确认删除',
                content: '是否要删除当前选中的员工？',
                onOk() {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res) => {
                        if (res.code == 0) {
                            _this.setState({
                                isVisible: false,
                                selectedRowKeys: null,
                                selectedItem:null
                            })
                            _this.requestList();

                        }
                    })
                }
            })
        }
    }
    //创建员工
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.UserForm.props.form.getFieldsValue();
        axios.ajax({
            url: type == 'create' ? '/user/add' : '/user/edit',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isVisible: false,
                    selectedRowKeys:null
                });
                this.requestList();
                this.UserForm.props.form.resetFields();
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    return {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(status) {
                    return {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '骑行',
                        '6': '桌球',
                        '7': '麦霸',
                        '8': '爬山'
                    }[status]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        let footer = {};
        if (this.state.type == 'detail') {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />

                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" icon="plus" onClick={() => this.handleOperator('create')}>创建员工</Button>
                    <Button icon="edit" onClick={() => this.handleOperator('edit')}>编辑员工</Button>
                    <Button onClick={() => this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={() => this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal title={this.state.title} visible={this.state.isVisible}
                    onOk={this.handleSubmit} onCancel={() => {
                        this.setState({
                            isVisible: false,
                            selectedRowKeys: null,
                            selectedItem:null
                        })
                    }} width={600} {...footer}>
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(form) => { this.UserForm = form }} />
                </Modal>
            </div>
        )
    }
}
class UserForm extends React.Component {
    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
        }[state]
    }
    getSex = (sex) => {
        return sex == 1 ? '男' : '女'
    }
    render() {
        let type = this.props.type;
        let userInfo = this.props.userInfo || [];

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout='horizontal'>
                <Form.Item label='用户名' {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.username :
                            getFieldDecorator('user_name', {
                                initialValue: userInfo.username
                            })(
                                <Input type='text' placeholder='请输入用户名' />
                            )
                    }
                </Form.Item>
                <Form.Item label='性别' {...formItemLayout}>
                    {
                        type == 'detail' ? this.getSex(userInfo.sex) :
                            getFieldDecorator('sex', {
                                initialValue: userInfo.sex
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )
                    }
                </Form.Item>
                <Form.Item label='状态' {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.state) :
                            getFieldDecorator('state', {
                                initialValue: userInfo.state
                            })(
                                <Select>
                                    <Option value={1}>咸鱼一条</Option>
                                    <Option value={2}>风华浪子</Option>
                                    <Option value={3}>北大才子一枚</Option>
                                    <Option value={4}>百度FE</Option>
                                    <Option value={5}>创业者</Option>
                                </Select>
                            )
                    }
                </Form.Item>
                <Form.Item label='生日' {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.birthday :
                            getFieldDecorator('birthday', {
                                initialValue: moment(userInfo.birthday)
                            })(
                                <DatePicker />
                            )
                    }
                </Form.Item>
                <Form.Item label='联系地址' {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.address :
                            getFieldDecorator('address', {
                                initialValue: userInfo.address
                            })(
                                <TextArea rows={3} placeholder='请填写联系地址' />
                            )
                    }
                </Form.Item>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)