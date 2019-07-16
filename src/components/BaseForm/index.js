import React from 'react';
import { Input, Select, Form, Button, Checkbox, Readio, DatePicker } from 'antd'
import Utils from '../../utils/utils'
const Option = Select.Option;
class FilterForm extends React.Component {
    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const { formList } = this.props;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, index) => {
                let label = item.label;
                let field = item.field;
                let initValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == '时间查询') {
                    const begin_time = <Form.Item label={label} key={field} >
                        {getFieldDecorator('begin_time', {
                            
                        })(
                            <DatePicker placeholder={placeholder} showTime={true} format='YYYY-MM-DD' />
                        )}
                    </Form.Item>
                    formItemList.push(begin_time);
                    const end_time = <Form.Item label='~' colon={false} key={field} >
                    {getFieldDecorator('end_time', {
                        
                    })(
                        <DatePicker placeholder={placeholder} showTime={true} format='YYYY-MM-DD' />
                    )}
                </Form.Item>
                    formItemList.push(end_time);
                } else if (item.type == 'INPUT') {
                    const INPUT = <Form.Item label={label} key={field} >
                        {getFieldDecorator([field], {
                            initialValue: initValue
                        })(
                            <Input placeholder={placeholder} type='text' />
                        )}
                    </Form.Item>
                    formItemList.push(INPUT);
                } else if (item.type == 'SELECT') {
                    const SELECT = <Form.Item label={label} key={field} >
                        {getFieldDecorator([field], {
                            initialValue: initValue
                        })(
                            <Select style={{ width: width }} placeholder={placeholder}>
                                {Utils.getOptionList(item.list)}
                            </Select>
                        )}
                    </Form.Item>
                    formItemList.push(SELECT);
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <Form.Item label={label} key={field} >
                        {getFieldDecorator([field], {
                            initialValue: initValue,
                            valuePropName: 'checked'
                        })(
                            <Checkbox>
                                {label}
                            </Checkbox>
                        )}
                    </Form.Item>
                    formItemList.push(CHECKBOX);
                }else if (item.type == 'datepicker') {
                    const datepicker = <Form.Item label={label} key={field} >
                        {getFieldDecorator([field], {
                            initialValue: initValue,
                        })(
                            <DatePicker placeholder={placeholder} showTime={true} format='YYYY-MM-DD' />
                   
                        )}
                    </Form.Item>
                    formItemList.push(datepicker);
                }
            });

        }
        return formItemList;
    }
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    reset = () => {
        this.props.form.resetFields();
    }
    render() {

        return (
            <Form layout='inline'>
                {this.initFormList()}
                <Form.Item>
                    <Button type='primary' style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(FilterForm);