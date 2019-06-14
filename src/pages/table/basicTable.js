import React from 'react';
import { Card, Table, Modal, message, Button } from 'antd';
import axios from './../../axios';
import Utils from '../../utils/utils'

const columns = [
    {
        title: 'id',
        dataIndex: 'id',

    },
    {
        title: '用户名',
        dataIndex: 'userName',

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
            let config = {
                '1': '咸鱼一条',
                '2': '风华浪子',
                '3': '北大才子',
                '4': '百度FE',
                '5': '创业者',
            }
            return config[state];
        }
    },
    {
        title: '爱好',
        dataIndex: 'interest',
        render(state) {
            let config = {
                '1': '游泳',
                '2': '打篮球',
                '3': '踢足球',
                '4': '跑步',
                '5': '爬山',
                '6': '骑行',
                '7': '桌球',
                '8': '麦霸',
            }
            return config[state];
        }
    },
    {
        title: '生日',
        dataIndex: 'birthday',
    },
    {
        title: '地址',
        dataIndex: 'adress',
    },
    {
        title: '早起时间',
        dataIndex: 'time',
    }
];
const data = [
    {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-02',
        adress: '沙沟湖夏邑县',
        time: '09:00'
    },
    {
        id: '1',
        userName: 'lili',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-02',
        adress: '沙沟湖夏邑县',
        time: '10:00'
    },
    {
        id: '2',
        userName: 'luna',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-02',
        adress: '沙沟湖夏邑县',
        time: '11:00'
    }
];
data.map((item, index) => {
    item.key = index;
});
console.log(data)
export default class BasicTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data2: []
        }
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request();
    }
    handleClick = (record, index) => {
        let selecKey = [index + 1];
        Modal.info({
            title: '提示',
            content: index
        });
        this.setState({
            selectedRowKeys: selecKey,
            selectedItem: record
        })
    }
    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                },
                // isShowLoading:false
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    data2: res.result.list,
                    selectedRowKeys: [],
                    selectedIds: null,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    handleDelete = () => {
        let ids = this.state.selectedIds;
        Modal.confirm({
            title: '删除',
            content: `你确定你要删除${ids.join(',')}吗？`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            fixed: true,
            selectedRowKeys
        }
        const rowSelection1 = {
            type: 'checkbox',
            fixed: true,
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                let ids = [];
                selectedRows.map((item) => {
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    selectedIds: ids
                })
            }
        }
        return (
            <div>
                <Card title='基础表格'>
                    <Table bordered pagination={false} columns={columns} dataSource={data} />
                </Card>
                <Card title='动态数据渲染表格' style={{ margin: '10px 0' }}>
                    <Table bordered pagination={false} columns={columns} dataSource={this.state.data2} />
                </Card>
                <Card title='Mock-单选' style={{ margin: '10px 0' }}>
                    <Table
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.handleClick(record, index);
                                }
                            }
                        }}
                        rowSelection={rowSelection} bordered pagination={false} columns={columns} dataSource={this.state.data2} />
                </Card>
                <Card title='Mock-复选框' style={{ margin: '10px 0' }}>
                    <div style={{ margin: '10px 0' }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        rowSelection={rowSelection1} bordered pagination={false} columns={columns} dataSource={this.state.data2} />
                </Card>
                <Card title='Mock-表格分页' style={{ margin: '10px 0' }}>
                    <Table
                        rowSelection={rowSelection1} pagination={this.state.pagination} bordered columns={columns} dataSource={this.state.data2} />
                </Card>
            </div>
        )
    }
}