/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import moment from 'moment-timezone';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/',
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['timezone'] = moment.tz.guess();
  return config;
});

export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data.users;
};

export const fetchCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};

export const createUser = async (userData: Record<string, any>) => {
  const response = await api.post('/users', userData);
  return response.data.user;
};

export const createCourse = async (courseData: Record<string, any>) => {
  const response = await api.post('/courses', courseData);
  return response.data.course;
};

export const enrollUser = async (enrollmentData: Record<string, any>) => {
  const response = await api.post('/enrollments', enrollmentData);
  return response.data;
};

export default api;
