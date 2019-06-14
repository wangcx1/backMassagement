import React from 'react';
import {Card,Button,Icon,Modal} from 'antd';
import './modal.less'
export default class Modals extends React.Component{
    constructor(){
        super();
        this.state={
            showModal1:false,
            showModal2:false,
            showModal3:false,
            showModa4:false
        }
    }
    handleOpen=(type)=>{
        this.setState({
            [type]:true
        })
    }
    handleConfirm=(type)=>{
        Modal[type]({
            title:'确定？',
            content:'确认关闭吗？',
            onOk(){
                console.log('ok');
            },
            onCancel(){
                console.log('cancel');
            }
        })
    }
    render(){
        return(
            <div>
                <Card title='基础模态框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleOpen('showModal1')}>open</Button>
                    <Button type='primary' onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type='primary' onClick={()=>this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type='primary' onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title='信息确认框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleConfirm('confirm')}>confirm</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm('info')}>info</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm('success')}>success</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm('warning')}>warning</Button>
                </Card>
                <Modal title='Basic Modal' visible={this.state.showModal1}
                    onOk={()=>{this.setState({showModal1:false})}} onCancel={()=>{this.setState({showModal1:false})}}
                >
                    <p>欢迎打开模态框！</p>
                </Modal>
                <Modal title='自定义页脚' visible={this.state.showModal2}
                    onOk={()=>{this.setState({showModal2:false})}} okText='好的' cancelText='算了' onCancel={()=>{this.setState({showModal2:false})}}
                >
                    <p>欢迎打开模态框！</p>
                </Modal>
                <Modal title='顶部20px弹框' style={{top:'20px'}}
                 visible={this.state.showModal3}
                    onOk={()=>{this.setState({showModal3:false})}}  onCancel={()=>{this.setState({showModal3:false})}}
                >
                    <p>欢迎打开模态框！</p>
                </Modal>
                <Modal title='水平垂直居中' wrapClassName='vertical-center-modal'
                 visible={this.state.showModal4}
                    onOk={()=>{this.setState({showModal4:false})}}  onCancel={()=>{this.setState({showModal4:false})}}
                >
                    <p>欢迎打开模态框！</p>
                </Modal>
            </div>
        )
    }
}