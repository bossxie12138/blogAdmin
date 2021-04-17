import { Switch, Route, Redirect } from 'react-router-dom'
import { adminRoutes } from './routes'
import { MyLayout } from './components'
import { useSelector } from 'react-redux'

function App() {
  
  const isLogined = useSelector(state => state.userReducer.isLogin)

  return ( isLogined ?
    <MyLayout propRoutes={adminRoutes}>
      <Switch>
        {
          adminRoutes.map(item => (
            <Route key={item.path} path={item.path} component={item.component} />
          ))
        }
        <Redirect from="/admin" to="/admin/index" exact />
        <Redirect to="/404" />
      </Switch>
    </MyLayout> : <Redirect to="/login" />
  )
}

export default App
