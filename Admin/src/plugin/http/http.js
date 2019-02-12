import vm from '../../main'
/* eslint-disable func-call-spacing,prefer-promise-reject-errors */
import axios from 'axios'
const instance = axios.create({
  baseURL: '/api/v1',
  withCredentials: true // 跨域类型时是否在请求中协带cookie
})
export default class HttpUtil {
  static get (url, params = {}) {
    return new Promise((resolve, reject) => {
      instance.get(url, { params }).then(({ data }) => {
        if(data.code == 'no-login'){
            vm.$router.push('/login')
        }else{
            resolve(data)
        }
      }).catch((err) => {
        reject({ err: JSON.stringify(err) })
      })
    })
  }
  static post (url, params = {}) {
    return new Promise((resolve, reject) => {
      instance.post(url, params).then(({ data }) => {
          if(data.code == 'no-login'){

          }else{
              resolve(data)
          }
      }).catch((err) => {
        reject({ err: JSON.stringify(err) })
      })
    })
  }
}
