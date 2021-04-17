import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Table, Form, Input, Button, message, Modal, Tag, Space } from 'antd'
import { 
  filterClassify,
  getClassify,
  addClassify,
  delClassify,
  editClassify
} from '../../redux/actionCreators'
import { clearObj, color } from '../../utils'
import './index.less'

export default function Classify() {
  const [loading, setLoading] = useState(false) // 表格loading状态
  
  const [visible, setVisible] = useState(false) // modal是否可见

  const [classify, setClassify] = useState('') // 分类名称

  const [pageNo, setPageNo] = useState(1) // 当前页码

  const [pageSize, setPageSize] = useState(5) // 每页条数

  const [isDelete, setIsDelete] = useState(false) // 是否为delete状态

  const [isEdit, setIsEdit] = useState(false) // 表格edit状态

  const [recordsItem, setRecordsItem] = useState({}) // 整合的内容

  const dataList = useSelector(state => state.classifyReducer.classifyList) // 分类列表

  const userInfo = useSelector(state => state.userReducer.userInfo)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClassify())
  }, [dispatch])

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index + 1,
      width: 50,
      align: 'center'
    },
    {
      title: '分类',
      align: 'center',
      width: 180,
      dataIndex: 'classify',
      render: name => (
        <Tag color={color[Math.floor(Math.random()*color.length)]}>{ name }</Tag>
      )
    },
    {
      title: '创建时间',
      align: 'center',
      width: 180,
      dataIndex: 'publish'
    },
    {
      title: '操作',
      width: 180,
      align: 'center',
      render: record => (
        <Space size={30} className="wrap-btn">
          <Button 
            size="small" 
            ghost  
            type='danger' 
            onClick={() => delBtn(record)}
          >
            删除
          </Button>
          <Button 
            size="small" 
            ghost  
            type='primary' 
            onClick={() => editBtn(record)}
          >
            编辑
          </Button>
        </Space>
      )
    }
  ]

  const delBtn = record => {
    setIsDelete(true)
    setVisible(true)
    setClassify(record.classify)
    setRecordsItem(Object.assign(recordsItem, record))
  }

  const editBtn = record => {
    setIsEdit(true)
    setVisible(true)
    setClassify(record.classify)
    setRecordsItem(Object.assign(recordsItem, record))
  }

  const handleOk = () => {
    if (userInfo.role !== '001') {
      message.error('没有权限进行此操作！')
      return
    }
    if(classify === '') {
      message.error('内容不能为空！')
      return
    }
    let value = {
      publish: moment().format('YYYY-MM-DD'),
      classify
    }
    let editConfig = {
      ...recordsItem,
      classify
    }
    if (isEdit) {
      dispatch(editClassify(editConfig))
      exitModal('编辑成功')
    } else if(isDelete) {
      dispatch(delClassify(recordsItem.key))
      exitModal('删除成功')
    }else {
      dispatch(addClassify(value))
      exitModal('添加成功')
    }
    function exitModal(msg) {
      setLoading(true)
      setVisible(false)
      setClassify('')
      setIsEdit(false)
      setIsDelete(false)
      clearObj(recordsItem)
      message.success(msg)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  const handleCancel = () => {
    setClassify('')
    clearObj(recordsItem)
    setVisible(false)
  }

  const handdleChange = v => setClassify(v.target.value)

  const handleSubmit = value => {
    setLoading(true)
    dispatch(filterClassify(value))
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleOnChange = page => {
    setPageNo(page.current)
    setPageSize(page.pageSize)
  }

  return (
    <div className="classify">
      <Modal
        title={isEdit ? '修改收藏' : isDelete ? '确认删除此条目？' : '添加收藏'}
        visible={visible }
        onOk={handleOk}
        onCancel={handleCancel}>
        <Input placeholder="请输入分类" value={classify} onChange={handdleChange} />
      </Modal>
      <Form layout="inline" onFinish={handleSubmit}>
        <Form.Item name="classify">
          <Input className="title" placeholder="请输入分类" allowClear={true} />
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
