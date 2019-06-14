import React from 'react';
import { Card, Button, Icon, Spin, Tabs, message } from 'antd';
import '../ui.less'
const { TabPane } = Tabs;
export default class Tabts extends React.Component {
    constructor() {
        super();
        this.newTabIndex = 0;
    }
    componentWillMount() {
        const panes = [
            {
                title: 'Tab1',
                content: 'Tab1 Content',
                key: '1'
            },
            {
                title: 'Tab2',
                content: 'Tab2 Content',
                key: '2'
            },
            {
                title: 'Tab3',
                content: 'Tab3 Content',
                key: '3'
            }
        ]
        this.setState({ panes,activeKey:panes[0].key })
    }
    callback = (key) => {
        message.info(key)
    }
    onChange = (activeKey) => {
        this.setState({ activeKey })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
      };
    
      add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        console.log(activeKey)
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      };
    
      remove = targetKey => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };
    render() {

        return (
            <div>
                <Card title='Tab页签' className='card-wrap'>
                    <Tabs defaultActiveKey='1' onChange={this.callback}>
                        <TabPane tab='Tab' disabled key='1'>Content of Tab Pane1</TabPane>
                        <TabPane tab='Tab' key='2'>Content of Tab Pane2</TabPane>
                        <TabPane tab='Tab' key='3'>Content of Tab Pane3</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab带图标的页签' className='card-wrap'>
                    <Tabs defaultActiveKey='1' onChange={this.callback}>
                        <TabPane tab={<span><Icon type='plus' />Tab1</span>} key='1'>Content of Tab Pane1</TabPane>
                        <TabPane tab={<span><Icon type='edit' />Tab1</span>} key='2'>Content of Tab Pane2</TabPane>
                        <TabPane tab={<span><Icon type='delete' />Tab1</span>} key='3'>Content of Tab Pane3</TabPane>
                    </Tabs>
                </Card>
                <Card title='Tab新增的页签' className='card-wrap'>
                    <Tabs type='editable-card' activeKey={this.state.activeKey} onChange={this.onChange}
                        onEdit={this.onEdit}>
                        {this.state.panes.map((pane) => {
                            return (<TabPane key={pane.key} tab={pane.title}>{pane.content}</TabPane>)
                        })}
                    </Tabs>
                </Card>
            </div>
        )
    }
}  