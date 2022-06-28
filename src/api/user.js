import request from '@/utils/request'

export function login(data) {
  // console.log('data', data)
  return request({
    url: '/user/login',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token: token }
  })
}

export function userAdd(data) {
  // console.log('data', data)
  return request({
    url: '/user/add',
    method: 'get',
    params: data
  })
}
