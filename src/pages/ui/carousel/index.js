import React from 'react';
import { Card,Carousel } from 'antd';
import '../ui.less'
export default class Carousels extends React.Component {
    constructor() {
        super();
       
    }
   
    render() {
       
        return (
            <div >
                <Card title='文字背景轮播' className='card-wrap'>
                    <Carousel autoplay effect='fade'>
                        <div><h3>Ant Motion Banner1</h3></div>
                        <div><h3>Ant Motion Banner2</h3></div>
                        <div><h3>Ant Motion Banner3</h3></div>
                        <div><h3>Ant Motion Banner4</h3></div>
                        <div><h3>Ant Motion Banner5</h3></div>
                    </Carousel>
                </Card>
                <Card title='图片背景轮播' className='card-wrap slider-wrap'>
                    <Carousel autoplay>
                        <div><img src='/carousel-img/carousel-1.jpg'/></div>
                        <div><img src='/carousel-img/carousel-2.jpg'/></div>
                        <div><img src='/carousel-img/carousel-3.jpg'/></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}  