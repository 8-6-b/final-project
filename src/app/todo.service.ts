import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from './todo';
// import { MessageService } from './message.service';
import { TodoDetail } from './todo-detail/todo-detail.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TodoService {

  private todosUrl = 'api/todos';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getTodos (): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.TodosUrl)
      .pipe(
        tap(todos => this.log('fetched todos')),
        catchError(this.handleError('getTodos', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getTodoNo404<Data>(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/?id=${id}`;
    return this.http.get<Todo[]>(url)
      .pipe(
        map(todos => todos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Todo>(`getTodo id=${id}`))
      );
  }

  /** GET todo by id. Will 404 if id not found */
  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Todo>(`getHero id=${id}`))
    );
  }

  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     tap(_ => this.log(`found heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

  //////// Save methods //////////

  /** POST: add a new Todo to the server */
  addTodo (todo: Todoo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions).pipe(
      tap((todo: Todoo) => this.log(`added todo w/ id=${todo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  /** DELETE: delete the todo from the server */
  deleteTodo (todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todosUrl}/${id}`;

    return this.http.delete<Todo>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  /** PUT: update the todo on the server */
  updateHero (todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, httpOptions).pipe(
      tap(_ => this.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add(`TodoService: ${message}`);
  // }
}
