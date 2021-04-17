import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox, Menu } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
 import { useDispatch, useSelector } from 'react-redux'
 import { md5 } from '../../utils'
 import { login } from '../../redux/actionCreators'
 import './index.less'

export default function AdminLogin(props) {

  const dispatch = useDispatch()

  const user = useSelector(state => state.userReducer)

  useEffect(() => {
    user.isLogin && props.history.push('/admin/index')
  }, [props.history, user])

  const onFinish = value => {
    let userConfig = {
      ...value,
      password: md5(value.password, value.username)
    }
    dispatch(login(userConfig))
  }
  
  return (
    <div className="login">
      <div className="login-form">
        <div className="form-head">
          <Menu defaultSelectedKeys={['login']} mode="horizontal">
            <Menu.Item key="login">
              登录
            </Menu.Item>
          </Menu>
        </div>
        <div className="form-area">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={ onFinish }
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '用户名不能为空!' }]}
            >
              <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="游客输入guest" 
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码不能为空!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="游客输入guest"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="remeber">记住密码</Checkbox>
              </Form.Item>
              <span className="login-form-forgot">
                忘记密码？
              </span>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
