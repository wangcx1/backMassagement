import React from 'react';
import { Card, Table, Modal, message, Button ,Badge} from 'antd';
import axios from './../../axios';
import Utils from '../../utils/utils'

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        width: 80
    },
    {
        title: '用户名',
        dataIndex: 'userName',
        width: 120
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return sex == 1 ? '男' : '女'
        },
        width: 80
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
        },
        width: 80
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
        },
        width: 120
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
    },
    {
        title: '地址',
        dataIndex: 'adress',
        width: 120
    },
    {
        title: '早起时间',
        dataIndex: 'time',
        width: 80
    }
];
const columns1 = [
    {
        title: 'id',
        dataIndex: 'id',
        width: 80,
        fixed: "left",
        key: 0,
        height: 80
    },
    {
        title: '用户名',
        dataIndex: 'userName',
        width: 120,
        key: 1
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return sex == 1 ? '男' : '女'
        },
        width: 80,
        key: 2
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
        },
        width: 80,
        key: 3
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
        },
        width: 120,
        key: 4
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
        key: 5
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
        key: 6
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
        key: 7
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
        key: 8
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
        key: 9
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
        key: 10
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
        key: 11
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
        key: 12
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
        key: 13
    },
    {
        title: '地址',
        dataIndex: 'adress',
        width: 120,
        key: 14
    },
    {
        title: '早起时间',
        dataIndex: 'time',
        width: 80,
        key: 15,
        fixed: 'right'
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

export default class HighTable extends React.Component {
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
            url: '/table/high/list',
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
    handleDelete1=(item)=>{
        let id=item.id;
        Modal.confirm({
            title:'删除',
            content:'您确认要删除此条数据吗？',
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder:sorter.order
        })
    }
    render() {
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 120
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                },
                width: 80
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
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
                },
                width: 80
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
                },
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'adress',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80
            }
        ];
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 120
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                },
                width: 80
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
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
                },
                width: 80
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(state) {
                    let config = {
                        '1': <Badge status='success' text='成功'/>,
                        '2': <Badge status='error' text='报错'/>,
                        '3': <Badge status='default' text='正常'/>,
                        '4': <Badge status='processing' text='进行'/>,
                        '5': <Badge status='warning' text='警告'/>,
                        '6': <Badge status='default' text='正常'/>,
                        '7': <Badge status='processing' text='进行'/>,
                        '8': <Badge status='warning' text='警告'/>
                    }
                    return config[state];
                },
                width: 120
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'adress',
                width: 120
            },
            {
                title: '操作',
                width: 80,
                render:(text,item)=>{
                    return <Button size='small' onClick={(item)=>{this.handleDelete1(item)}}>删除</Button>
                }
            }
        ];
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
                <Card title='头部固定'>
                    <Table bordered scroll={{ y: 240 }} pagination={false} columns={columns} dataSource={this.state.data2} />
                </Card>
                <Card title='左侧固定' style={{ margin: '10px 0' }}>
                    <Table bordered scroll={{ x: 1770 }} pagination={false} columns={columns1} dataSource={this.state.data2} />
                </Card>

                <Card title='排序' style={{ margin: '10px 0' }}>
                    <div style={{ margin: '10px 0' }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table onChange={this.handleChange}
                        bordered pagination={false} columns={columns2} dataSource={this.state.data2} />
                </Card>
                <Card title='操作按钮' style={{ margin: '10px 0' }}>
                    <Table
                        pagination={this.state.pagination} bordered columns={columns3} dataSource={this.state.data2} />
                </Card>
            </div>
        )
    }
}