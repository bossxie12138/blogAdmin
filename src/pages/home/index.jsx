import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'antd'
import {
  FormOutlined,
  LikeOutlined,
  CommentOutlined,
  UsergroupAddOutlined,
  MailOutlined,
  QuestionOutlined
} from '@ant-design/icons'
import MyPie from '../../components/pie'
import { getCount } from '../../redux/actionCreators'
import './index.less'

export default function Home() {
  const count = useSelector(state => state.countReducer.countObj) // 右侧统计数值

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCount())
  }, [dispatch])

  const { look, like, comment, userNum, msg } = count
  
  return (
    <div className="home-page">
      <div className="charts-info">
        <MyPie />
      </div>
      <div className="card-info">
        <Card hoverable>
          <div className="card-icon"><FormOutlined /></div>
          <div className="card-text">{`访问人次：${look}`}</div>
        </Card>
        <Card hoverable>
          <div className="card-icon"><LikeOutlined /></div>
          <div className="card-text">{`点赞量：${like}`}</div>
        </Card>
        <Card hoverable>
          <div className="card-icon"><CommentOutlined /></div>
          <div className="card-text">{`评论人次：${comment}`}</div>
        </Card>
        <Card hoverable>
          <div className="card-icon"><UsergroupAddOutlined /></div>
          <div className="card-text">{`用户人数：${userNum}`}</div>
        </Card>
        <Card hoverable>
          <div className="card-icon"><MailOutlined /></div>
          <div className="card-text">{`留言总数：${msg}`}</div>
        </Card>
        <Card hoverable>
          <div className="card-icon"><QuestionOutlined /></div>
          <div className="card-text">敬请期待...</div>
        </Card>
      </div>
      <div className="footer-info">
        <span>博客后台由React+Redux+antd+egg.js等技术开发&nbsp;Copyright ©2021 Xie</span>
      </div>
    </div>
  )
}
