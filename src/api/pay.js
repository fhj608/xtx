import request from '@/utils/request'

export const getPayAPI = (id) => request.get(`/member/order/${id}`)
