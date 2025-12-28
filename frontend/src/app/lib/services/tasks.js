import apiClient from "../api";
import { API_ENDPOINTS } from "../constants";

export const getLists = async () => {
  return apiClient.get(API_ENDPOINTS.LISTS);
};

export const createList = async (title) => {
  return apiClient.post(API_ENDPOINTS.LISTS, { title });
};

export const updateList = async (id, listData) => {
  return apiClient.put(`${API_ENDPOINTS.LISTS}/${id}`, listData);
};

export const deleteList = async (id) => {
  return apiClient.delete(`${API_ENDPOINTS.LISTS}/${id}`);
};

export const getTasks = async (listId = null) => {
  const url = listId ? `${API_ENDPOINTS.TASKS}?listId=${listId}` : API_ENDPOINTS.TASKS;
  return apiClient.get(url);
};

export const createTask = async (taskData) => {
  return apiClient.post(API_ENDPOINTS.TASKS, taskData);
};

export const updateTask = async (id, taskData) => {
  return apiClient.put(`${API_ENDPOINTS.TASKS}/${id}`, taskData);
};

export const deleteTask = async (id) => {
  return apiClient.delete(`${API_ENDPOINTS.TASKS}/${id}`);
};
