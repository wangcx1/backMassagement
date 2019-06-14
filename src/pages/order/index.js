import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm'
const Option = Select.Option;
export default class Order extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            selectedItem: {}
        }
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            placeholder: '全部',
            initialValue: '1',
            field: 'city',
            width: 100,
            list: [
                { id: '0', name: '全部' },
                { id: '1', name: '北京' },
                { id: '2', name: '天津' }
            ]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_satus',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            list: [
                { id: '0', name: '全部' },
                { id: '1', name: '进行中' },
                { id: '2', name: '结束行程' }
            ]
        }
    ]
    componentDidMount() {
        this.requestList();
    }
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            console.log(res);
            if (res.code == 0) {
                let items = res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    list: items,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }
    // 订单详情
    orderDetail = () => {
        let item = this.state.selectedItem;
        console.log(item)
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            });
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`);

    }
    // 点击某一行
    handleClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        });

    }
    handleFilterSubmit = (params) => {
        this.params = params;
        this.requestList();
    }
    render() {
        const selectedRowKeys = this.state.selectedRowKeys;
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(state) {
                    return parseFloat(state / 1000) + 'km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(state) {
                    return state == 1 ? '进行中' : '已结束'
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ];
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card >
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{ marginTop: '10px' }}>
                    <Button type='primary' onClick={this.orderDetail}>订单详情</Button>
                    <Button type='primary'>结束订单</Button>
                </Card>
                <div className='content-wrap'>
                    <Table rowSelection={rowSelection} onRow={(record, index) => {
                        return {
                            onClick: () => {
                                this.handleClick(record, index);
                            }
                        }
                    }}
                        bordered columns={columns} dataSource={this.state.list} pagination={this.state.pagination} />
                </div>
            </div>
        )
    }
}

class FilterForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout='inline'>
                <Form.Item label='订单时间'>
                    {getFieldDecorator('start_time', {})(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}

                </Form.Item>
                <Form.Item label="-">
                    {getFieldDecorator('end_time', {})(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </Form.Item>
                <Form.Item label='订单状态'>
                    {getFieldDecorator('order_satus', {
                        initalVlaue: '1'
                    })(
                        <Select style={{ width: '120px' }} placeholder='全部'>
                            <Option value="">全部</Option>
                            <Option value="1">进行中</Option>
                            <Option value="2">结束行程</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type='primary' style={{ margin: '0 20px' }} >查询</Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
FilterForm = Form.create()(FilterForm);