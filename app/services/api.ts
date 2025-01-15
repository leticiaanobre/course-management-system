import axios from 'axios'
import moment from 'moment-timezone'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/',
})

api.interceptors.request.use((config) => {
  config.params = config.params || {}
  config.params['timezone'] = moment.tz.guess()
  return config
})

export const fetchUsers = async () => {
  const response = await api.get('/users')
  return response.data.users
}

export const fetchCourses = async () => {
  const response = await api.get('/courses')
  return response.data
}

export default api

