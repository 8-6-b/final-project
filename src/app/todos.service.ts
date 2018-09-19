import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  getTodos() {
    return this.http.get(`${window.location.origin}/todos`);
  }

  createTodo(todo) {
    return this.http.post(`${window.location.origin}/todos`, todo);
  }

  editTodo(todo, id) {
    return this.http.put(`${window.location.origin}/todos/${id}`, {description: todo});
  }

  deleteTodo(id) {
    return this.http.delete(`${window.location.origin}/todos/${id}`);
  }

  constructor(private http: HttpClient) {

  }
}