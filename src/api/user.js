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

export function getUserDetails(params) {
  return request({
    url: '/user/details',
    method: 'get',
    params: params
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

export function userEdit(data) {
  // console.log('data', data)
  return request({
    url: '/user/edit',
    method: 'get',
    params: data
  })
}

export function userDelete(data) {
  // console.log('data', data)
  return request({
    url: '/user/delete',
    method: 'get',
    params: data
  })
}
