import { Component, OnInit } from '@angular/core';
import { Chore } from '../chores/chore';
import { ChoreService } from '../chores/chore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  chores: any;

  constructor(private choreService: ChoreService) { }

  ngOnInit() {
    this.getChores();
  }

  getChores(): void {
    this.choreService.getChores()
      .subscribe(chores => this.chores = chores.slice(1, 5));
  }
}
