import { Component, OnInit } from '@angular/core';

import { Chore } from '../chores/chore';
import { ChoreService } from '../chores/chore.service';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.scss']
})
export class ChoresComponent implements OnInit {
  chores: Chore[];

  constructor(private choreService: ChoreService) { }

  ngOnInit() {
    this.getChores();
  }

  getChores(): void {
    this.choreService.getChores()
    .subscribe(chores => this.chores = chores);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.choreService.addChore({ name } as Chore)
      .subscribe(chore => {
        this.chores.push(chore);
      });
  }

  delete(chore: Chore): void {
    this.chores = this.chores.filter(h => h !== chore);
    this.choreService.deleteChore(chore).subscribe();
  }

}

