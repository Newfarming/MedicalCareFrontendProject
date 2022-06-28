import request from '@/utils/request'
import {userDelete} from "@/api/user";

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
