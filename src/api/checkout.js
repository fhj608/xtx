import request from '@/utils/request'

export const getCheckoutAPI = () => request.get('/member/order/pre')

export const submitOrderAPI = (data) => request.post('/member/order', data)
