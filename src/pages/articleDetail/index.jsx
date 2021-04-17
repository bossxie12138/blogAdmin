import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, message, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { addArticle, editArticle, getClassify } from '../../redux/actionCreators'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import moment from 'moment'
import { getArticleById } from '../../api'
import './index.less'

const { Option } = Select

export default function Detail(props) {
  const [isEdit, setIsEdit] = useState(false) // 是否为编辑状态
  
  const [id, setId] = useState() // 文章id

  const [confirmLoading, setConfirmLoading] = useState(false) // 按钮的loading状态

  const [recordItem, setRecordItem] = useState({}) // 整合的内容

  const [visible, setVisible] = useState(false) // modal是否可见

  const [editor, setEditor] = useState(EditorState.createEmpty()) // 编辑器的内容

  const classifyList = useSelector(state => state.classifyReducer.classifyList)

  const userInfo = useSelector(state => state.userReducer.userInfo)

  const dispatch = useDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(getClassify())
    if (props.location.search !== '') {
      setIsEdit(true)
      let paramsId = Number(props.location.search.split('=')[1])
      setId(paramsId)
      getArticleById(paramsId).then(result => {
        const { title, introduce, classify, hot, content } = result[0]
        form.setFieldsValue({title, introduce, hot, classify})
        const contentBlock = htmlToDraft(content)
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        setEditor(editorState)
      })
    }
  }, [dispatch, form, props.location.search])

  const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 5 },
      xxl: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 12 }
    }
  }

  const handleSubmit = data => {
    let content = draftToHtml(convertToRaw(editor.getCurrentContent()))
    let day = moment().format('YYYY-MM-DD')
    let newData = JSON.parse(JSON.stringify({...data,content,publish: day}))
    setRecordItem(Object.assign(recordItem, newData))
    setVisible(true)
  }

  const onEditorStateChange = e => setEditor(e)

  const handleOk = () => {
    if (userInfo.role!=='001') {
      message.error('没有权限进行此操作！')
      return
    }
    setConfirmLoading(true)
    if (id) {
      dispatch(editArticle(id, recordItem))
      exitHandle('修改成功')
    } else {
      dispatch(addArticle(recordItem))
      exitHandle('添加成功')
    }
    function exitHandle(msg) {
      setTimeout(() => {
        setVisible(false)
        setConfirmLoading(false)
        setRecordItem({})
        message.success(msg)
        props.history.push('/admin/article')
      }, 1500)
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setRecordItem({})
  }

  return (
    <div className='admin-article'>
      <Modal
        title={isEdit ? '确认修改' : '确认添加？'}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{`标题：${recordItem.title}`}</p>
        <p>{`分类：${recordItem.classify}`}</p>
        <p>{`热词：${recordItem.hot}`}</p>
        <p>{`简介：${recordItem.introduce}`}</p>
        <p>{`内容：${recordItem.content}`}</p>
        <p>{`日期：${recordItem.publish}`}</p>
      </Modal>
      <Form onFinish={handleSubmit} {...formItemLayout} form={form}>
        <Form.Item label='标题' name="title">
          <Input placeholder="输入标题" />
        </Form.Item>
        <Form.Item label='简介' name="introduce">
            <Input placeholder="输入简介" />
        </Form.Item>
        <Form.Item label='分类' name="classify">
          <Select
            style={{ width: '100%' }}
            placeholder="选择分类"
          >
          {
            classifyList.map(category => (
              <Option value={category.classify} key={category.key}>
                {category.classify}
              </Option>
            ))
          }
        </Select>
        </Form.Item>
        <Form.Item label='热词' name="hot">
          <Input placeholder="添加热词" />
        </Form.Item>
        <Form.Item label='内容' wrapperCol={{span: 19}} name="content">
          <Editor
            editorState={editor}
            editorClassName="editor"
            onEditorStateChange={onEditorStateChange}
          />
        </Form.Item>
        <Form.Item wrapperCol={{span: 24}}>
          <div className="article-button">
            <Button type="primary" htmlType="submit">
            { isEdit ? '修改' : '添加' }
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
