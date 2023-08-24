import request from '@/utils/request'

export const getGoodDetailService = (id) =>
  request.get('/goods', { params: { id } })

export const getHotService = ({ id, type, limit = 3 }) =>
  request.get('/goods/hot', { params: { id, type, limit } })
