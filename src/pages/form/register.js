import React from 'react';
import { Card, Form, Input, Icon, Radio, message, Button, Checkbox, Upload, TimePicker, InputNumber, Select, Switch, DatePicker } from 'antd';
import moment from 'moment';
import '../ui/ui.less'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
const { TextArea } = Input;
// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//     const isJPG = file.type === 'image/jpeg';
//     if (!isJPG) {
//         message.error('You can only upload JPG file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//         message.error('Image must smaller than 2MB!');
//     }
//     return isJPG && isLt2M;
// }
class FormRegister extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 1,
            loading: false
        }
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                    imageUrl,
                    loading: false,
                })
            }
            );
        }
    };
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
    }
    handleReset = () => {
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const rowsObject = { minRows: 6, maxRows: 8 }
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <Card title='注册表单' className='card-wrap'>
                    <Form>
                        <Form.Item label='用户名' {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '用户名不能为空'
                                    }]
                                })(
                                    <Input prefix={<Icon type='user' />} placeholder='请输入用户名' />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='密码' {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '密码不能为空'
                                    }]
                                })(
                                    <Input prefix={<Icon type='lock' />} placeholder='请输入密码' />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='性别' {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: 1
                                })(
                                    <Radio.Group onChange={this.onChange} >
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item label='年龄' {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber min={1} max={100} />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='当前状态' {...formItemLayout}>
                            {
                                getFieldDecorator('sate', {
                                    initialValue: 1
                                })(
                                    <Select>
                                        <Option value={1}>咸鱼一条</Option>
                                        <Option value={2}>风华浪子</Option>
                                        <Option value={3}>北大才子</Option>
                                        <Option value={4}>百度FE</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label='爱好' {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: [1, 2, 3]
                                })(
                                    <Select mode="multiple">
                                        <Option value={1}>游泳</Option>
                                        <Option value={2}>打篮球</Option>
                                        <Option value={3}>踢足球</Option>
                                        <Option value={4}>跑步</Option>
                                        <Option value={5}>桌球</Option>
                                        <Option value={6}>健身</Option>
                                        <Option value={7}>唱歌</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label='是否已婚' {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='生日' {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('1992/12/29 12:00:30', dateFormat)
                                })(
                                    <DatePicker format={dateFormat} />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='联系地址' {...formItemLayout}>
                            {
                                getFieldDecorator('adress', {
                                    initialValue: '',
                                })(
                                    <TextArea autosize={rowsObject} placeholder='请填写联系地址....' />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='早起时间' {...formItemLayout}>
                            {
                                getFieldDecorator('time', {
                                    initialValue: moment('12:03:34', 'HH:mm:ss'),
                                })(
                                    <TimePicker />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='头像' {...formItemLayout}>
                            {
                                getFieldDecorator('userImg', {
                                    // initialValue:moment('12:03:34','HH:mm:ss'),
                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {imageUrl ? <img style={{ width: 200, height: 'auto' }} src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>

                                )
                            }
                        </Form.Item>
                        <Form.Item  {...offsetLayout} >  
                            {
                                getFieldDecorator('protocol', {
                                    // initialValue:moment('12:03:34','HH:mm:ss'),
                                })(
                                    <Checkbox>
                                        我以阅读过<a>协议</a>
                                    </Checkbox>

                                )
                            }
                        </Form.Item>
                        <Form.Item  {...offsetLayout} >
                                    <div>
                                        <Button type='primary' onClick={this.handleSubmit}>注册</Button>
                                        <Button type='warning' onClick={this.handleReset}>重置</Button>
                                    </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create({ name: 'normal_login' })(FormRegister);
