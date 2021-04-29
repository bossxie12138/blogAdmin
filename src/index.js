import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import App from './App'
import { outRoutes } from './routes'
import store from './redux/store'
import jwtDecode from 'jwt-decode'
import reportWebVitals from './reportWebVitals'
import { LOGIN_ADMIN } from './redux/actionTypes'
import './assets/css/style.less'

if (localStorage.adminToken) {
  store.dispatch({ data: jwtDecode(localStorage.adminToken), type: LOGIN_ADMIN })
}

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <Switch>
          {
            outRoutes.map(item => (
              <Route key={item.path} path={item.path} component={item.component} />
            ))
          }
          <Route path="/admin"  component={App} />
          <Redirect from="/" to="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
