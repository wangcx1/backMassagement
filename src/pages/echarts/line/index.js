import React from 'react';
import { Card } from 'antd';
import echartsTheme from '../echartTheme';
import echartLights from '../themeLight';
import echarts from 'echarts/lib/echarts';
// 按需加载
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactCharts from 'echarts-for-react';
export default class Line extends React.Component {
    componentWillMount() {
        echarts.registerTheme('Immoc', echartLights);
    }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis:{
                type:'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis:{
                type:'value'
            },
            series: [
                {
                    name: '订单量',
                    type:'line',
                    data: [
                        1000,2000,3000,1200,2100,4000,2500
                    ]
                }
            ]
        };
        return option;
    }
    getOption1 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                data:['OFO订单量','摩拜订单量']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis:{
                type:'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis:{
                type:'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type:'line',
                    data: [
                        1000,2000,3000,1200,2100,4000,2500
                    ]
                }, {
                    name: '摩拜订单量',
                    type:'line',
                    data: [
                        6000,4000,3000,2200,2900,3000,1500
                    ]
                }
            ]
        };
        return option;
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                data:['OFO订单量','摩拜订单量']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis:{
                type:'category',
                boundaryGroup:false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis:{
                type:'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type:'line',
                    data: [
                        1000,2000,3000,1200,2100,4000,2500
                    ],
                    areaStyle: {normal: {}},
                }, {
                    name: '摩拜订单量',
                    type:'line',
                    data: [
                        6000,4000,3000,2200,2900,3000,1500
                    ],
                    areaStyle: {normal: {}},
                }
            ]
        };
        return option;
    }
    render() {
        return <div>
            <Card title='折线图之一'>
                <ReactCharts style={{ height: '500px' }} option={this.getOption()} theme="Immoc" />
            </Card>
            <Card title='折线图之二' style={{ marginTop: '10px' }}>
                <ReactCharts style={{ height: '500px' }} option={this.getOption1()} theme="Immoc" />
            </Card>
            <Card title='折线图之三' style={{ marginTop: '10px' }}>
                <ReactCharts style={{ height: '500px' }} option={this.getOption2()} theme="Immoc" />
            </Card>
        </div>
    }
}