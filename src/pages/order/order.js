import React from 'react';
import { Card } from 'antd';
import axios from '../../axios';
import './detail.less'


export default class OrderDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            orderInfo: {}
        }
    }
    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId);
        }

    }
    getDetailInfo = (orderId) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo: res.result
                });
                this.renderMap(res.result);
            }
        })
    }
    renderMap = (result) => {
        this.map = new window.BMap.Map('orderDetailMap');
        this.map.centerAndZoom('北京', 11);
        this.addMapControl();
        this.drawBikeRoute(result.position_list);
        // 调用服务区绘制方法
        this.drawServiceArea(result.area);
    }
    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }
    // 绘制用户的行驶路线
    drawBikeRoute = (positionList) => {
        let startPoint = '';
        let endPoint = '';
        let map = this.map;
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length - 1]
            startPoint = new window.BMap.Point(first.lon, first.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42)
            });
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
            this.map.addOverlay(startMarker);
            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42)
            });
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);
            // 连接路线图
            let trackPoint = [];
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat));
            }
            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor: '#1869AD',
                strokeWeight: 3,
                strokeOpacity: 1
            });
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(trackPoint, 11);

        }


    }
    // 绘制服务区
    drawServiceArea = (positionList) => {
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 3,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        });
        this.map.addOverlay(polygon);
        this.map.centerAndZoom(trackPoint, 11);
    }
    render() {
        const orderInfo = this.state.orderInfo;
        return (
            <div>
                <Card >
                    <div id='orderDetailMap' className='order-map'>

                    </div>
                    <div className='detail-items'>
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{orderInfo.mode == 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{orderInfo.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{orderInfo.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{orderInfo.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{orderInfo.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className='detail-items'>
                        <div className="item-title">形势轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{orderInfo.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{orderInfo.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{orderInfo.distance}</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}