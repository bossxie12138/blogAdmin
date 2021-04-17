import React from 'react'
import loadable from '@loadable/component'
import { Loading } from '../components'

const Login = loadable(() => import('./adminLogin'), {
  fallback: <Loading />
})

const NotFound = loadable(() => import('./404'), {
	fallback: <Loading />
})

const Home = loadable(() => import('./home'), {
	fallback: <Loading />
})

const Collect = loadable(() => import('./adminCollect'), {
	fallback: <Loading />
})

const Classify = loadable(() => import('./classify'), {
	fallback: <Loading />
})

const ArticleList = loadable(() => import('./articleList'), {
	fallback: <Loading />
})

const ArticleDetail = loadable(() => import('./articleDetail'), {
	fallback: <Loading />
})

const UserCenter = loadable(() => import('./userInfo'), {
	fallback: <Loading />
})

export {
  Login,
  NotFound,
  UserCenter,
  Home,
  ArticleList,
  ArticleDetail,
  Classify,
  Collect
}