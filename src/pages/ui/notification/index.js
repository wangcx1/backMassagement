import React from 'react';
import { Card, Button, Icon, Spin, Alert, notification } from 'antd';
import '../ui.less'
export default class Notice extends React.Component {
    constructor() {
        super();

    }
    openNoticefication = (type,direction) => {
        if(direction){
            notification.config({
                placement:direction
            })
        }
       notification[type]({
           message:'发工资了',
           description:'上个月满勤，有全勤奖',
           
       })
    }
    render() {
        const icon = <Icon type='loading' style={{ fontSize: '24px' }} />
        return (
            <div>
                <Card title='通知提醒框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.openNoticefication('success')}>Success</Button>
                    <Button type='primary' onClick={()=>this.openNoticefication('info')}>Info</Button>
                    <Button type='primary' onClick={()=>this.openNoticefication('error')}>Error</Button>
                    <Button type='primary' onClick={()=>this.openNoticefication('warning')}>Warning</Button>
                </Card>
                <Card title='通知提醒框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.openNoticefication('success','topLeft')}>Success</Button>
                    <Button type='primary' onClick={()=>this.openNoticefication('info','topRight')}>Info</Button>
                    <Button type='primary' onClick={()=>this.openNoticefication('error','bottomLeft')}>Error</Button>
                    <Button type='primary' onClick={()=>this.openNoticefication('warning','bottomRight')}>Warning</Button>
                </Card>

            </div>
        )
    }
}  