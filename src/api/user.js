import request from '@/utils/request'

export const loginService = ({ account, password }) =>
  request.post('/login', { account, password })
