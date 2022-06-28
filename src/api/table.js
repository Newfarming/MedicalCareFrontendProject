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
export function getDepartDetails(params) {
  return request({
    url: '/depart/details',
    method: 'get',
    params
  })
}
export function departDelete(params) {
  return request({
    url: '/depart/delete',
    method: 'get',
    params
  })
}
export function departEdit(params) {
  return request({
    url: '/depart/edit',
    method: 'get',
    params
  })
}
export function departAdd(params) {
  return request({
    url: '/depart/add',
    method: 'get',
    params
  })
}

export function getActivityList(params) {
  return request({
    url: '/activity/list',
    method: 'get',
    params
  })
}
export function getActivityDetails(params) {
  return request({
    url: '/activity/details',
    method: 'get',
    params
  })
}
export function activityDelete(params) {
  return request({
    url: '/activity/delete',
    method: 'get',
    params
  })
}
export function activityEdit(params) {
  return request({
    url: '/activity/edit',
    method: 'get',
    params
  })
}
export function activityAdd(params) {
  return request({
    url: '/activity/add',
    method: 'get',
    params
  })
}
