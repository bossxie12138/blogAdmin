import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form, Input, Button, message, Modal, Space } from 'antd'
import {
  addCollect,
  delCollect,
  editCollect,
  filterCollect,
  getCollect
} from '../../redux/actionCreators'
import { clearObj } from '../../utils'
import './index.less'

export default function AdminCollect() {
  const [loading, setLoading] = useState(false) // table loading状态

  const [visible, setVisible] = useState(false) // modal 是否显示

  const [title, setTitle] = useState('')  // 收藏标题

  const [content, setContent] = useState('') // 收藏内容

  const [pageNo, setPageNo] = useState(1) // 当前页码

  const [pageSize, setPageSize] = useState(5) // 每页条数

  const [recordItem, setRecordItem] = useState({}) //整合的内容

  const [isEdit, setIsEdit] = useState(false) // 是否处于edit状态

  const [isDelete, setIsDelete] = useState(false) // 是否处于delete状态

  const dataList = useSelector(state => state.collectReducer.collectList) // 收藏列表

  const userInfo = useSelector(state => state.userReducer.userInfo)

  const dispatch = useDispatch()

  useEffect(() => dispatch(getCollect()), [dispatch])
  
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index + 1,
      width: 80,
      align: 'center'
    },
    {
      title: '标题',
      align: 'center',
      ellipsis: {
        showTitle: false
      },
      dataIndex: 'title'
    },
    {
      title: '内容',
      align: 'center',
      ellipsis: {
        showTitle: false
      },
      dataIndex: 'content'
    },
    {
      title: '创建时间',
      align: 'center',
      width: 150,
      dataIndex: 'publish'
    },
    {
      title: '操作',
      align: 'center',
      width: 140,
      render: record => (
        <Space size={12} className="wrap-btn">
          <Button 
            ghost 
            size="small" 
            type='danger' 
            onClick={() => delClick(record)}
          >
            删除
          </Button>
          <Button 
            ghost 
            size="small" 
            type='primary' 
            onClick={() => editClick(record)}
          >
            编辑
          </Button>
        </Space>
      )
    }
  ]

  const editClick = record => {
    setIsEdit(true)
    setVisible(true)
    setTitle(record.title)
    setContent(record.content)
    setRecordItem(Object.assign(recordItem, record))
  }

  const delClick = record => {
    setIsDelete(true) 
    setVisible(true)
    setTitle(record.title)
    setContent(record.content)
    setRecordItem(Object.assign(recordItem, record))
  }

  const okHandle = () => {
    if (userInfo.role !== '001') {
      message.error('没有权限进行此操作！')
      return
    }
    if(title === '' || content === ''){
      message.error('标题或内容不能为空！')
      return
    }
    let value = {
      publish: moment().format('YYYY-MM-DD'),
      title,
      content
    }
    let editConfig = {
      ...recordItem,
      title,
      content
    }
    if (isEdit) {
      dispatch(editCollect(editConfig))
      exitModal('编辑成功')
    } else if(isDelete) {
      dispatch(delCollect(recordItem.key))
      exitModal('删除成功')
    }else {
      dispatch(addCollect(value))
      exitModal('添加成功')
    }
    function exitModal(msg) {
      setLoading(true)
      setVisible(false)
      setTitle('')
      setContent('')
      setIsEdit(false)
      setIsDelete(false)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      clearObj(recordItem)
      message.success(msg)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
    setVisible(false)
    setIsDelete(false)
    setIsEdit(false)
    clearObj(recordItem)
  }

  const handleOnChange = page => {
    setPageSize(page.pageSize)
    setPageNo(page.current)
  }

  const handleSubmit = value => {
    setLoading(true)
    dispatch(filterCollect(value))
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e, value) => {
    if(value === 'title') {
      setTitle(e.target.value)
      return
    }
    setContent(e.target.value)
  }
  return (
    <div className="collect">
      <Modal
        title={isEdit ? '修改收藏' : isDelete ? '确认删除此条目？' : '添加收藏'}
        visible={visible}
        destroyOnClose={true}
        onOk={okHandle}
        onCancel={handleCancel}>
        <Input 
          placeholder="请输入标题" 
          value={title} 
          onChange={e => handleChange(e, 'title')} 
        />
        <Input.TextArea 
          placeholder="请输入内容" 
          value={content} 
          onChange={e => handleChange(e, 'content')} 
          style={{ marginTop: '10px' }} 
        />
      </Modal>
      <Form layout="inline" onFinish={handleSubmit}>
        <Form.Item name="title">
          <Input className="title" placeholder="请输入标题" allowClear={true} />
        </Form.Item>
        <Form.Item>
          <Space size={12}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button type='primary' onClick={ () => setVisible(true) }>添加</Button>
          </Space>
        </Form.Item>
      </Form>
      <Table
        bordered
        scroll={{ y: 350 }}
        pagination={{
          current: pageNo,
          position: ['bottomCenter'],
          showQuickJumper: true,
          showSizeChanger: true,
          total: dataList.length,
          showTitle: false,
          hideOnSinglePage: true,
          pageSize: pageSize,
          pageSizeOptions: ['10', '20', '30', '40']
        }}
        loading={loading}
        columns={columns}
        dataSource={dataList}
        onChange={handleOnChange}
      />
    </div>
  )
}
