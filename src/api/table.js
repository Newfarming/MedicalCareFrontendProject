import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export function getUserList(params) {
  params.token = getToken()
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function getDepartList(params) {
  params.token = getToken()
  return request({
    url: '/depart/list',
    method: 'get',
    params
  })
}
export function getDepartDetails(params) {
  params.token = getToken()
  return request({
    url: '/depart/details',
    method: 'get',
    params
  })
}
export function departDelete(params) {
  params.token = getToken()
  return request({
    url: '/depart/delete',
    method: 'get',
    params
  })
}
export function departEdit(params) {
  params.token = getToken()
  return request({
    url: '/depart/edit',
    method: 'get',
    params
  })
}
export function departAdd(params) {
  params.token = getToken()
  return request({
    url: '/depart/add',
    method: 'get',
    params
  })
}

export function getActivityList(params) {
  params.token = getToken()
  return request({
    url: '/activity/list',
    method: 'get',
    params
  })
}
export function getActivityDetails(params) {
  params.token = getToken()
  return request({
    url: '/activity/details',
    method: 'get',
    params
  })
}
export function activityDelete(params) {
  params.token = getToken()
  return request({
    url: '/activity/delete',
    method: 'get',
    params
  })
}
export function activityEdit(params) {
  params.token = getToken()
  return request({
    url: '/activity/edit',
    method: 'get',
    params
  })
}
export function activityAdd(params) {
  params.token = getToken()
  return request({
    url: '/activity/add',
    method: 'get',
    params
  })
}
