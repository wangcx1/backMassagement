import React from 'react';
import {Card,Button,Icon,Spin,Alert} from 'antd';
import '../ui.less'
export default class Loadings extends React.Component{
    constructor(){
        super();
       
    }
   
    render(){
        const icon=<Icon type='loading' style={{fontSize:'24px'}}/>
        return(
            <div>
                <Card title='Spin的用法' className='card-wrap'>
                    <Spin size='small'/>
                    <Spin size='default' style={{margin:'0 10px'}}/>
                    <Spin size='large'/>
                    <Spin indicator={icon} style={{marginLeft:10}}/>
                </Card>
                <Card title='内容遮罩' className='card-wrap'>
                    <Alert message='React' description='欢迎来到React高级课程' 
                    type='info'/>
                    <Spin>
                        <Alert message='React' description='欢迎来到React高级课程' 
                        type='warning'/>
                    </Spin>
                    <Spin tip='加载中'>
                        <Alert message='React' description='欢迎来到React高级课程' 
                        type='warning' />
                    </Spin>
                    <Spin tip='加载中' indicator={icon}>
                        <Alert message='React' description='欢迎来到React高级课程' 
                        type='warning' />
                    </Spin>
                </Card>
            </div>
        )
    }
}  