import React from 'react';
import { Card, Button, Modal } from 'antd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class Rich extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            showRichEditor: false,

        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    handleClearContent = () => {
        this.setState({
            editorState: EditorState.createEmpty()
        })
    }
    handleGetText = () => {
        this.setState({
            showRichEditor: true
        })
    }
    render() {
        const { editorState } = this.state;
        return <div>
            <Card>
                <Button type='primary' onClick={this.handleClearContent}>清空内容</Button>
                <Button type='primary' onClick={this.handleGetText}>获取HTML文本</Button>
            </Card>
            <Card title='富文本编译器'>

                <Editor
                    editorState={editorState}
                    // toolbarClassName="toolbarClassName"
                    // wrapperClassName="wrapperClassName"
                    // editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </Card>
            <Modal title='富文本' visible={this.state.showRichEditor} onCancel={() => {
                this.setState({
                    showRichEditor: false
                })
            }} onOk={() => {
                this.setState({
                    showRichEditor: false
                })
            }}>
                {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            </Modal>
        </div>
    }
}