import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { 
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Badge,
  Drawer,
  Button,
  Input,
  List,
  Typography,
  Switch,
  message
} from 'antd'
import { 
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  NotificationOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons'
import Scrollbars from 'react-custom-scrollbars'
import { useSelector } from 'react-redux'
import renderThumb from '../renderThumb'
import { clearUser, getMsgLists, replyAction } from '../../redux/actionCreators'
import './index.less'

const { Header, Sider, Content } = Layout

export default function MyLayout(props) {
  const [collapsed, SetCollapsed] = useState(false)

  const [visible, setVisible] = useState(false)

  const [userName, setUserName] = useState('')

  const [avatar, setAvatar] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')

  const [reply, setReply] = useState('')

  const [replyContent, setReplyContent] = useState('')

  const [selectedKey, setSelectedKey] = useState('/admin/index')

  const [childrenDrawer, setChildrenDrawer] = useState(false)

  const [currentUser, setCurrentUser] = useState({})

  const [isFull, setIsFull] = useState(true)

  const [deepColor, setDeepColor] = useState(true)

  const [isSend, setIsSend] = useState(false)

  const history = useHistory()

  const userMsg = useSelector(state => state.userReducer.userInfo)

  const msgList = useSelector(state => state.messagesReducer.messagesList)

  const dispatch = useDispatch()

  useEffect(() => {
    const { pathname } = history.location
    setSelectedKey(pathname)
    setUserName(userMsg.nickname||userMsg.username)
    setAvatar(userMsg.avatar)
    dispatch(getMsgLists())
  }, [history, userMsg, dispatch ])

  const toggle = () => SetCollapsed(!collapsed)

  const toggleColor = () => setDeepColor(!deepColor)

  const screenToggle = () => {
    let dom = document.getElementById('root')
    if (isFull) {
      dom.requestFullscreen() || 
      dom.mozRequestFullScreen() || 
      dom.webkitRequestFullscreen() || 
      dom.msRequestFullscreen()
      setIsFull(!isFull)
    } else {
      document.exitFullscreen() || 
      document.mozCancelFullScreen() || 
      document.webkitExitFullscreen() || 
      document.msExitFullscreen()
      setIsFull(!isFull)
    }
  }

  const exit = () => {
    localStorage.removeItem('adminToken')
    dispatch(clearUser())
    history.push('/login')
  }

  const userClick = () => history.push('/admin/user-info')

  const onClose = () => setVisible(false)

  const menuClick = e => setSelectedKey(e.key)

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false)
    setReplyContent('')
    setIsSend(false)
  }

  const lookMsg = item => {
    setChildrenDrawer(true)
    setCurrentUser({...item})
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={exit}>退出登录</Menu.Item>
      <Menu.Item key="2"onClick={userClick}>个人中心</Menu.Item>
    </Menu>
  )

  const openFirst = () => setVisible(true)

  const sendMsg = e => setReply(e.target.value)

  const send = () => {
    if (userMsg.role!=='001') {
      message.error('没有权限进行此操作！')
      setReply('')
      return
    }
    setIsSend(true)
    let key = currentUser.key
    dispatch(replyAction({ key, reply }))
    setReplyContent(reply)
    setReply('')
  }

  return (
    <div>
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          trigger={null}
          collapsible
          className={!deepColor && 'deep-color'}
          collapsed={collapsed}>
          <div className="logo">{collapsed ? '' : '博客后台管理'}</div>
          <Menu theme="dark" mode="inline" selectedKeys={ [selectedKey] }>
            {
              props.propRoutes.filter(item => item.menu).map(item => {
                return (
                <Menu.Item onClick={menuClick} key={item.path}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{ item.title }</span>
                  </Link>
                </Menu.Item>)
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            {
              collapsed ? <MenuUnfoldOutlined className="trigger" onClick={toggle} /> 
              : <MenuFoldOutlined className="trigger" onClick={toggle} />
            }
            {
              isFull ? <FullscreenOutlined className="screen" onClick={screenToggle} /> 
              : <FullscreenExitOutlined className="screen" onClick={screenToggle} />
            }
            <div className="switch-color">
              <Switch 
                onClick={toggleColor} 
                checkedChildren="deep" 
                unCheckedChildren="shallow" 
                defaultChecked 
              />
            </div>
            <div className="msg" onClick={openFirst}>
              <Badge dot={ msgList.length === 0 ? false : true }>
                <NotificationOutlined  />
              </Badge>
            </div>
            <Dropdown placement='bottomCenter' overlay={menu} className='ml10' >
              <div className='user'>
                <Avatar src={avatar} />
                <span className="uname">{userName}</span>
                <DownOutlined className="arrow-icon"/>
              </div>
            </Dropdown>
            <Drawer
              title={`留言(${msgList.length})`}
              width={400}
              headerStyle={{ textAlign: 'center' }}
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              <Scrollbars style={{height: '100%'}} renderThumbVertical={renderThumb}>
              <List
                size="small"
                bordered
                dataSource={msgList}
                renderItem={item => (
                  <List.Item onClick={() => lookMsg(item)} >
                    <div className="user-avatar">
                      <Avatar size="large" src={item.avatar} />
                    </div>
                    <div className="user-group" >
                      <div className="uname">
                        {item.username}
                      </div>
                      <div className="user-msg">
                        <Typography.Paragraph ellipsis={{ rows: 1 }} >
                          {item.content}
                        </Typography.Paragraph>
                      </div>
                    </div>
                    <div className="date">{item.createdAt}</div>
                  </List.Item>
                )}
              />
              </Scrollbars>
              <Drawer
                title={currentUser.username}
                width={320}
                headerStyle={{ textAlign: 'center' }}
                closable={false}
                onClose={onChildrenDrawerClose}
                visible={childrenDrawer}
              >
                <div className="current-msg">
                  <Avatar src={currentUser.avatar} />
                  <span className="umsg" >{currentUser.content}</span>
                </div>
                <div className="reply-msg">
                  <span className="content" >{replyContent}</span>
                  { isSend && <Avatar src={userMsg.avatar} /> }
                </div>
                <div className="send-msg">
                  <Button type="link" onClick={send}>发送</Button>
                  <Input.TextArea value={reply} onChange={sendMsg} />
                </div>
              </Drawer>
            </Drawer>
          </Header>
          <div className='wrap-content'>
            <Content className='content'>
              {props.children}
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  )
}
