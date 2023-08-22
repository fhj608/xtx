import request from '@/utils/request'

export const getBannerApi = () => request.get('/home/banner')

export const getNewApi = () => request.get('/home/new')

export const getHotApi = () => request.get('/home/hot')
