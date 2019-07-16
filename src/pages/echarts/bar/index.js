import React from 'react';
import { Card } from 'antd';
import echartsTheme from '../echartTheme';
import echarts from 'echarts/lib/echarts';
// 按需加载
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactCharts from 'echarts-for-react';
export default class Bar extends React.Component {
    componentWillMount() {
        echarts.registerTheme('Immoc', echartsTheme);
    }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                name: '订单量'
            }]
        };
        return option;
    }
    getOption1 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend:{
                data:['摩拜','OFO','小蓝']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                name: '摩拜'
            },
            {
                data: [130, 180, 170, 100, 120, 130, 110],
                type: 'bar',
                name: 'OFO'
            },
            {
                data: [110, 300, 100, 60, 80, 130, 150],
                type: 'bar',
                name: '小蓝'
            }
        ]
        };
        return option;
    }
    render() {
        return <div>
            <Card title='柱形图表之一'>
                <ReactCharts style={{ height: '500px' }} option={this.getOption()} theme="Immoc" />
            </Card>
            <Card title='柱形图表之二' style={{ marginTop: '10px' }}>
                <ReactCharts style={{ height: '500px' }} option={this.getOption1()} theme="Immoc" />
            </Card>
        </div>
    }
}