import React from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'
export default class Header extends React.Component {
    constructor() {
        super();
        this.state = ({
            userName: 'wangcx'
        });

    }
    componentWillMount() {
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000)
        this.getWeatherAPIdata();
    }
    getWeatherAPIdata() {
        let city = '上海'
        axios.jsonp({ url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2' }).then((res) => {
            console.log(res);
            if (res.status == 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }
    render() {
        const menuType = this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top'>
                    {menuType ?
                        <Col span={6} className='logoWrapper'>
                            <img src="/assets/logo.png" alt='' />
                            <span>gungam</span>
                        </Col> :
                        ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href='#'>退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' :
                        <Row className='breadcrub'>
                            <Col span={4} className='breadTitle'>
                                首页
                   </Col>
                            <Col span={20} className='weather'>
                                <span className='date'>{this.state.sysTime}</span>
                                <span className='weather-detail'>{this.state.weather}</span>
                                <span className='weather-img'>
                                    <img src={this.state.dayPictureUrl} />
                                </span>
                            </Col>
                        </Row>
                }
            </div>
        )
    }
}