import React, { Component } from 'react'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken'
import { EDIT_USER } from '../../redux/actionTypes'
import store from '../../redux/store'
import { config } from '../../utils'
import 'antd/es/modal/style'

class PhotoUpload extends Component {
  state = {
    fileList: []
  }

  onChange = ({ fileList: newFileList, file }) => {
    this.setState({ fileList: newFileList })
    const info = file.response
    if (info!==undefined) {
      store.dispatch({data: info, type: EDIT_USER})
      const token = jwt.sign({
        key: info.key,
        username: info.username,
        role: info.role,
        nickname: info.nickname,
        avatar: info.avatar,
        email: info.email,
        password: info.password
      }, config.jwtSecret)
      localStorage.setItem('jwtToken', token)
    }
  }

  onPreview = async file => {
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  render() {
    const { fileList } = this.state
    let {key} = jwtDecode(localStorage.getItem('jwtToken'))
    return (
      <ImgCrop rotate>
        <Upload
          maxCount={1}
          action="/api/admin/upload"
          listType="picture-card"
          fileList={fileList}
          data={{key}}
          onChange={this.onChange}
          onPreview={this.onPreview}
        >
          {fileList.length < 5 && this.props.title}
        </Upload>
      </ImgCrop>
    )
  }
}

export default PhotoUpload