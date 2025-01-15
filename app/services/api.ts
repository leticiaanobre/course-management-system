/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import moment from 'moment-timezone';
import { toast } from "@/hooks/use-toast"; 

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
  try {
    const response = await api.post('/users', userData);
    toast({
      title: "User created successfully!",
      description: `User ${response.data.user.name} has been added.`,
    });
    return response.data.user;
  } catch (error: any) {
    toast({
      title: "Error creating user",
      description: error.response?.data?.error || error.message,
      variant: "destructive",
    });
    throw error;
  }
};

export const createCourse = async (courseData: Record<string, any>) => {
  try {
    const response = await api.post('/courses', courseData);
    toast({
      title: "Course created successfully!",
      description: `Course ${response.data.course.name} has been added.`,
    });
    return response.data.course;
  } catch (error: any) {
    toast({
      title: "Error creating course",
      description: error.response?.data?.error || error.message,
      variant: "destructive",
    });
    throw error;
  }
};

export const enrollUser = async (enrollmentData: Record<string, any>) => {
  try {
    const response = await api.post('/enrollments', enrollmentData);
    toast({
      title: "User enrolled successfully!",
      description: `User has been enrolled in the course.`,
    });
    return response.data;
  } catch (error: any) {
    toast({
      title: "Error enrolling user",
      description: error.response?.data?.error || error.message,
      variant: "destructive",
    });
    throw error;
  }
};

export default api;
