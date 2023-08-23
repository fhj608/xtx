import request from '@/utils/request'

export const getCategoryService = (id) =>
  request.get('/category', { params: { id } })

export const getSubCategoryService = (id) =>
  request.get('/category/sub/filter', { params: { id } })

export const getCategoryGoodsService = (data) =>
  request.post('/category/goods/temporary', data)
