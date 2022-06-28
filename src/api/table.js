import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function getDepartList(params) {
  return request({
    url: '/depart/list',
    method: 'get',
    params
  })
}
