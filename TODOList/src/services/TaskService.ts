import { Task } from '@/interfaces/task';
import axios, { AxiosResponse, AxiosPromise } from 'axios';

export class TaskService {
    private static readonly serviceAddress: string = 'http://localhost:3000/tasks';

    public static getTasks(): AxiosPromise<Task[]> {
      const axiosPromise: AxiosPromise<Task[]> = axios.get(this.serviceAddress);
      return axiosPromise;
    }

    public static getTask(id: number): AxiosPromise<Task> {
      const axiosPromise: AxiosPromise<Task> = axios.get(this.serviceAddress + '/' + id);
      return axiosPromise;
    }

    public static postTask(newTask: Task): AxiosPromise<Task> {
      return axios.post(this.serviceAddress, newTask);
    }

    public static putTask(taskToUpdate: Task): AxiosPromise<Task> {
      return axios.put(this.serviceAddress + '/' + taskToUpdate.id, taskToUpdate);
    }

    public static deleteTask(taskToDelete: Task) {
      axios.delete(this.serviceAddress + '/' + taskToDelete.id);
    }
}
