import request from '@/utils/request'

export const getBannerApi = (params = { distributionSite: '1' }) =>
  request.get('/home/banner', { params })

export const getNewApi = () => request.get('/home/new')

export const getHotApi = () => request.get('/home/hot')

export const getGoodsApi = () => request.get('/home/goods')

export const getCategoryListService = () => request.get('/home/category/head')
