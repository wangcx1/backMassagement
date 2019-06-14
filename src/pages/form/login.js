import React from 'react';
import { Card, Form, Input, Icon, Button, Checkbox } from 'antd';
import '../ui/ui.less'
const FormItem = Form.Item;
 class FormLogin extends React.Component {
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.log('received values of form:',values);
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title='行內表單'>
                    <Form layout='inline'>
                        <Form.Item >
                            <Input placeholder='username' />
                        </Form.Item>
                        <Form.Item >
                            <Input placeholder='password' />
                        </Form.Item>
                        <Form.Item>
                            <Button>login in</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title='水平表單' className='card-wrap'>
                    <Form onSubmit={this.handleSubmit}  className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }
                            ,{min:5,max:10,message:'长度范围5-10！'},{
                                pattern:new RegExp('^\\d+$','g'),
                                message:'密码必须是数字！'
                            }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                Forgot password
          </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
          </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create({name: 'normal_login' })(FormLogin);
