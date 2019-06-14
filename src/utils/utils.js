import React from 'react';
import { Select } from 'antd';
import { isRegExp } from 'util';
const Option = Select.Option;
export default {
    formateDate(time) {
        if (!time) return '';
        let date = new Date(time);
        let hours = date.getHours();
        let minutes = +date.getMinutes();
        let seconds = date.getSeconds();
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hours + ':' + minutes + ':' + seconds;

    },
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current);
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total,
            showTotal: () => {
                return `共${data.result.total}条`
            },
            showQuickJumper: true
        }
    },
    getOptionList(data) {
        if (!data) { return [] }
        let options = [];
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
    }
}