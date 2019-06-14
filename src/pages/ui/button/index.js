import React from 'react'
import {Card,Button, Icon,Radio} from 'antd'
import './index.less'
export default class Buttons extends React.Component{
    constructor(){
        super();
        this.state={
            loading:true,
            size:'default'
        }
    }
    handleClickLoading=()=>{
        this.setState({
            loading:false
        })
    }
    handleChange=(e)=>{
        this.setState({
            size:e.target.value
        })
    }
    render(){
        return (
            <div>
                <Card title='基础按钮' className='card-wrap'>
                    <Button type="primary">Immoc</Button>
                    <Button>Immoc</Button>
                    <Button type="dashed">Immoc</Button>
                    <Button type="danger">Immoc</Button>
                    <Button disabled>Immoc</Button>
                </Card>
                <Card title='图形按钮' className='card-wrap'>
                    <Button icon="plus">创建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape='circle' icon='search'></Button>
                    <Button icon='search' type='primary'>搜索</Button>
                    <Button icon='dowload' type='primary'>下载</Button>
                </Card>
                <Card title='Loading按钮' className='card-wrap'>
                    <Button loading={this.state.loading} type='primary'>确定</Button>
                    <Button loading={this.state.loading} shape='circle' type='primary'></Button>
                    <Button loading={this.state.loading} >点击加载</Button>
                    <Button loading={this.state.loading}>确定</Button>
                    <Button  type='primary' onClick={this.handleClickLoading}>关闭</Button>
                </Card>
                <Card title='按钮组' className='card-group card-wrap'>
                    <Button.Group>
                        <Button type='primary'>
                            <Icon type='left'/>
                            返回 
                        </Button>
                        <Button type='primary'>
                            前进
                            <Icon type='right'/>
                        </Button>
                    </Button.Group>
                </Card>
                <Card title='按钮尺寸' className='card-wrap'>
                    <Radio.Group size={this.state.size} onChange={this.handleChange}>
                        <Radio value='small'>small</Radio>
                        <Radio value='default'>default</Radio>
                        <Radio value='large'>large</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Immoc</Button>
                    <Button size={this.state.size}>Immoc</Button>
                    <Button type="dashed" size={this.state.size}>Immoc</Button>
                    <Button type="danger" size={this.state.size}>Immoc</Button>
                    <Button disabled size={this.state.size}>Immoc</Button>
                </Card>
            </div>
        )
    }
}