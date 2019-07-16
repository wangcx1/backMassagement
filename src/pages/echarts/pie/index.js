import React from 'react';
import { Card } from 'antd';
import echartsTheme from '../echartTheme';
import echartLights from '../themeLight';
import echarts from 'echarts/lib/echarts';
// 按需加载
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactCharts from 'echarts-for-react';
export default class Pie extends React.Component {
    componentWillMount() {
        echarts.registerTheme('Immoc', echartLights);
    }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}:{c}({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            value: 1000,
                            name: 'Mon'
                        },
                        {
                            value: 1200,
                            name: 'Tue'
                        },
                        {
                            value: 1100,
                            name: 'Wed'
                        },
                        {
                            value: 2000,
                            name: 'Thu'
                        }
                        ,
                        {
                            value: 1300,
                            name: 'Fri'
                        }
                        ,
                        {
                            value: 2000,
                            name: 'Sat'
                        }
                        ,
                        {
                            value: 5000,
                            name: 'Sun'
                        }
                    ]
                }
            ]
        };
        return option;
    }
    getOption1 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}:{c}({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    center: ['50%', '50%'],//控制图在哪显示
                    data: [
                        {
                            value: 1000,
                            name: 'Mon'
                        },
                        {
                            value: 1200,
                            name: 'Tue'
                        },
                        {
                            value: 1100,
                            name: 'Wed'
                        },
                        {
                            value: 2000,
                            name: 'Thu'
                        }
                        ,
                        {
                            value: 1300,
                            name: 'Fri'
                        }
                        ,
                        {
                            value: 2000,
                            name: 'Sat'
                        }
                        ,
                        {
                            value: 5000,
                            name: 'Sun'
                        }
                    ]
                }
            ]
        };
        return option;
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}:{c}({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    // radius: ['50%', '80%'],
                    // center: ['50%', '50%'],//控制图在哪显示
                    data: [
                        {
                            value: 1000,
                            name: 'Mon'
                        },
                        {
                            value: 1200,
                            name: 'Tue'
                        },
                        {
                            value: 1100,
                            name: 'Wed'
                        },
                        {
                            value: 2000,
                            name: 'Thu'
                        }
                        ,
                        {
                            value: 1300,
                            name: 'Fri'
                        }
                        ,
                        {
                            value: 2000,
                            name: 'Sat'
                        }
                        ,
                        {
                            value: 5000,
                            name: 'Sun'
                        }
                    ].sort((a, b) => { return a.value - b.value }),
                    roseType: 'radius',
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        return option;
    }
    render() {
        return <div>
            <Card title='饼图表之一'>
                <ReactCharts style={{ height: '500px' }} option={this.getOption()} theme="Immoc" />
            </Card>
            <Card title='饼图表之二' style={{ marginTop: '10px' }}>
                <ReactCharts style={{ height: '500px' }} option={this.getOption1()} theme="Immoc" />
            </Card>
            <Card title='饼图表之三' style={{ marginTop: '10px' }}>
                <ReactCharts style={{ height: '500px' }} option={this.getOption2()} theme="Immoc" />
            </Card>
        </div>
    }
}