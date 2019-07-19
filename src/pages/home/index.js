import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { addTodos } from '../../redux/action'
import './index.less'
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            values: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // let arr = [];
                // arr.push(values.value);
                this.props.addTodos(values.value);
                // this.setState({
                //     values: arr
                // })

            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
        };
        const { values } = this.props;
        return (<div>
            <h1 style={{ textAlign: "center" }}>Redux学习</h1>
            <Form onSubmit={this.handleSubmit} layout='inline' style={{ textAlign: "center" }}>
                <Form.Item {...formItemLayout} style={{ width: '400px' }}>
                    {
                        getFieldDecorator('value', {
                        })(
                            <Input placeholder='addTodo' />
                        )
                    }
                </Form.Item>
                <Form.Item {...formItemLayout}>
                    <Button type='primary' htmlType="submit">addTodo</Button>
                </Form.Item>
            </Form>
            <ul>
                {
                    values.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
        </div>)
    }
}
const Homet = Form.create()(Home);
export default connect(
    state => {
        return {
            values: state.todos
        }
    },{
        addTodos
    }
)(Homet);