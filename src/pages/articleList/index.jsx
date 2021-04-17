import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form, Input, Button, message, Tag, Space, Modal } from 'antd'
import { delArticle, filterArticle, getArticle } from '../../redux/actionCreators'
import { clearObj, color } from '../../utils'
import './index.less'

export default function ArticleList(props) {
  const [loading, setLoading] = useState(false) // table的loading状态
  
  const [visible, setVisible] = useState(false) // modal是否可见

  const [pageNo, setPageNo] = useState(1) // 当前页码

  const [records, setRecords] = useState({}) // 整合内容

  const [pageSize, setPageSize] = useState(5) // 每页条数

  const dispatch = useDispatch()

  const dataList = useSelector(state => state.articleReducer.articleList) // 文章列表

  const userInfo = useSelector(state => state.userReducer.userInfo)

  useEffect(() => {
    dispatch(getArticle())
  }, [dispatch])

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index + 1,
      width: 60,
      align: 'center'
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: {
        showTitle: false,
      },
      align: 'center'
    },
    {
      title: '内容',
      dataIndex: 'content',
      ellipsis: {
        showTitle: false,
      },
      align: 'center'
    },
    {
      title: '简介',
      dataIndex: 'introduce',
      ellipsis: {
        showTitle: false,
      },
      align: 'center'
    },
    {
      title: '分类',
      align: 'center',
      dataIndex: 'classify',
      render: name => (
        <Tag color={color[Math.floor(Math.random()*color.length)]}>{ name }</Tag>
      )
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'publish'
    },
    {
      title: '热词',
      ellipsis: {
        showTitle: false,
      },
      align: 'center',
      dataIndex: 'hot',
    },
    {
      title: '操作',
      align: 'center',
      render: record => (
        <Space size={15} className="wrap-btn">
          <Button 
            size="small" 
            ghost  
            type='danger' 
            onClick={ () => delBtn(record) }
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

  const handleOk = () => {
    if (userInfo.role!=='001') {
      message.error('没有权限进行此操作！')
      return
    }
    dispatch(delArticle(records.key))
    setLoading(true)
    setVisible(false)
    clearObj(records)
    message.success('删除成功')
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleCancel = () => {
    setVisible(false)
    clearObj(records)
  }

  const delBtn = record => {
    setRecords(Object.assign(records, record))
    setVisible(true)
  }

  const editBtn = record => props.history.push(`/admin/article-add?id=${record.key}`)

  const handleSubmit = e => {
    setLoading(true)
    dispatch(filterArticle(e))
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleOnChange = page => {
    setPageNo(page.current)
    setPageSize(page.pageSize)
  }

  return (
    <div className="article">
      <Modal
        title='确认删除此条目？'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>{`标题：${records.title}`}</p>
        <p>{`分类：${records.classify}`}</p>
        <p>{`热词：${records.hot}`}</p>
        <p>{`简介：${records.introduce}`}</p>
        <p>{`内容：${records.content}`}</p>
        <p>{`日期：${records.publish}`}</p>
      </Modal>
      <Form layout="inline" onFinish={handleSubmit}>
        <Form.Item name="title">
          <Input className="title" placeholder="请输入标题" allowClear={true} />
        </Form.Item>
        <Form.Item>
          <Space size={12}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Link to='/admin/article-add'>
              <Button type='primary'>添加</Button>
            </Link>
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
          pageSizeOptions: ['10', '20', '30', '40'],
        }}
        loading={loading}
        columns={columns}
        dataSource={dataList}
        onChange={handleOnChange}
      />
    </div>
  )
}
