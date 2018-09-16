import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Chore } from './chore';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ChoreService {

  private choresUrl = 'api/chores';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET chores from the server */
  getChores (): Observable<Chore[]> {
    return this.http.get<Chore[]>(this.choresUrl)
      .pipe(
        tap(chores => this.log('fetched chores')),
        catchError(this.handleError('getChores', []))
      );
  }

  /** GET chore by id. Return `undefined` when id not found */
  getChoreNo404<Data>(id: number): Observable<Chore> {
    const url = `${this.choresUrl}/?id=${id}`;
    return this.http.get<Chore[]>(url)
      .pipe(
        map(chores => chores[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} chore id=${id}`);
        }),
        catchError(this.handleError<Chore>(`getChore id=${id}`))
      );
  }

  /** GET chore by id. Will 404 if id not found */
  getChore(id: number): Observable<Chore> {
    const url = `${this.choresUrl}/${id}`;
    return this.http.get<Chore>(url).pipe(
      tap(_ => this.log(`fetched chore id=${id}`)),
      catchError(this.handleError<Chore>(`getChore id=${id}`))
    );
  }

  /* GET chores whose name contains search term */
  searchChores(term: string): Observable<Chore[]> {
    if (!term.trim()) {
      // if not search term, return empty chore array.
      return of([]);
    }
    return this.http.get<Chore[]>(`${this.choresUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found chores matching "${term}"`)),
      catchError(this.handleError<Chore[]>('searchChores', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new chore to the server */
  addChore (chore: Chore): Observable<Chore> {
    return this.http.post<Chore>(this.choresUrl, chore, httpOptions).pipe(
      tap((chore: Chore) => this.log(`added chore w/ id=${chore.id}`)),
      catchError(this.handleError<Chore>('addChore'))
    );
  }

  /** DELETE: delete the chore from the server */
  deleteChore (chore: Chore | number): Observable<Chore> {
    const id = typeof chore === 'number' ? chore : chore.id;
    const url = `${this.choresUrl}/${id}`;

    return this.http.delete<Chore>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted chore id=${id}`)),
      catchError(this.handleError<Chore>('deleteChore'))
    );
  }

  /** PUT: update the chore on the server */
  updateChore (chore: Chore): Observable<any> {
    return this.http.put(this.choresUrl, chore, httpOptions).pipe(
      tap(_ => this.log(`updated chore id=${chore.id}`)),
      catchError(this.handleError<any>('updateChore'))
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

  /** Log a ChoreService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ChoreService: ${message}`);
  }
}
