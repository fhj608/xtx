import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores'

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const data = response.data
    if (data.code !== '1') {
      ElMessage.error(data.msg || data.message || '服务异常')
      return Promise.reject(data)
    }
    return data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response?.status === 401) {
      const userStore = useUserStore()
      userStore.setUserInfo({})
      ElMessage.error(error.response.data.message || '服务异常')
      router.push('/login')
    } else {
      ElMessage.error(error.response.data.message || '服务异常')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
