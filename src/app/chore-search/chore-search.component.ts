import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Chore } from '../chores/chore';
import { ChoreService } from '../chores/chore.service';

@Component({
  selector: 'app-chore-search',
  templateUrl: './chore-search.component.html',
  styleUrls: [ './chore-search.component.scss' ]
})
export class ChoreSearchComponent implements OnInit {
  chores$: Observable<Chore[]>;
  private searchTerms = new Subject<string>();

  constructor(private choreService: ChoreService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

  }
}
