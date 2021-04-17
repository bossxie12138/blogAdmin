import {
  Login,
  Home,
  ArticleList,
  ArticleDetail,
  Classify,
  Collect,
  NotFound,
  UserCenter
} from '../pages'
import {
  HomeOutlined,
  EditOutlined,
  FolderOutlined,
  StarOutlined
} from '@ant-design/icons'

export const outRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/404',
    component: NotFound
  }
]

export const adminRoutes = [
  {
    menu: true,
    icon: <HomeOutlined />,
    title: '首页',
    path: '/admin/index',
    component: Home
  },
  {
    menu: true,
    icon: <EditOutlined />,
    title: '文章',
    path: '/admin/article',
    component: ArticleList
  },
  {
    menu: true,
    icon: <FolderOutlined />,
    title: '分类',
    path: '/admin/classify',
    component: Classify
  },
  {
    menu: true,
    icon: <StarOutlined />,
    title: '收藏',
    path: '/admin/collect',
    component: Collect
  },
  {
    path: '/admin/article-add',
    component: ArticleDetail
  },
  {
    path: '/admin/article-edit/:id',
    component: ArticleDetail
  },
  {
    path: '/admin/user-info',
    component: UserCenter
  }
]