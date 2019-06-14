import React from 'react';
import { Card,Row,Col,Modal } from 'antd';
import '../ui.less'
export default class Gallerys extends React.Component {
    constructor() {
        super();
        this.state={
            visible:false
        }
    }
    gallerOpen=(src)=>{
        this.setState({
            currentImg:src,
            visible:true
        })
    }
    render() {
        const imgs=[
            ['1.png','2.png','3.png'],
            ['4.png','5.png','6.png'],
            ['7.png','8.png','9.png'],
            ['10.png','11.png','12.png'],
            ['13.png','14.png','15.png'],
            ['16.png','17.png','18.png'],
            ['19.png','20.png','21.png'],
            ['22.png','23.png','24.png'],
            ['25.png','26.png','27.png'],
        ]
        const imgList=imgs.map((list)=>list.map((item)=>{
             return    <Card onClick={()=>this.gallerOpen(item)} style={{marginBottom:10}}
             cover={<img src={'/gallery/'+item}/>}>
                    <Card.Meta title='React Admin' description='react is a bad'/>
                </Card>
        }))
        return (
            <div className='card-wrap'>
               <Row gutter={10}>
                    <Col md={6}>
                        {imgList[0]}
                    </Col>
                    <Col md={6}>
                        {imgList[1]}
                    </Col>
                    <Col md={6}>
                        {imgList[2]}
                    </Col>
                    <Col md={6}>
                        {imgList[3]}
                    </Col>
               </Row>
               <Row gutter={10}>
                    <Col md={6}>
                        {imgList[4]}
                    </Col>
                    <Col md={6}>
                        {imgList[5]}
                    </Col>
                    <Col md={6}>
                        {imgList[6]}
                    </Col>
                    <Col md={6}>
                        {imgList[7]}
                    </Col>
               </Row>
                <Modal title='图片画廊'
                visible={this.state.visible} onCancel={()=>{this.setState({visible:false})}} footer={null}>
                    <img style={{width:'100%'}} src={'/gallery/'+this.state.currentImg}/>
                </Modal>
            </div>
        )
    }
}  