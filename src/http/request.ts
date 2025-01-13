import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 15000
})

// axios 实例拦截请求
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log('request error', error) // for debug
    Promise.reject(error)
  }
)

// axios 实例拦截响应
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('response error', error) // for debug
    return Promise.reject(error)
  }
)

export default service