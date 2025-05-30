import axios from 'axios';

export type Course = {
  id: number,
  name: string,
  periods: number
}

const base_url = 'https://672947486d5fa4901b6cb7c1.mockapi.io/courses';

export async function getCourses(): Promise<Course[]> {
   const response = await axios.get(base_url);
   return response.data;
}

export async function createCourse(data: Omit<Course, "id">): Promise<Course[]> {
   const response = await axios.post(base_url, data);
   return response.data;
};

export async function updateCourse(id: number, data: Omit<Course, "id">): Promise<Course[]> {
   const response = await axios.put(`${base_url}/${id}`, data);
   return response.data;
};

export async function deleteCourse(id: number): Promise<Course[]> {
   const response = await axios.delete(`${base_url}/${id}`);
   return response.data;
};