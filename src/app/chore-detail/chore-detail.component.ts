import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Chore }         from '../chores/chore';
import { ChoreService }  from '../chores/chore.service';

@Component({
  selector: 'app-chore-detail',
  templateUrl: './chore-detail.component.html',
  styleUrls: [ './chore-detail.component.scss' ]
})
export class ChoreDetailComponent implements OnInit {
  @Input() chore: Chore;

  constructor(
    private route: ActivatedRoute,
    private choreService: ChoreService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getChore();
  }

  getChore(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.choreService.getChore(id)
      .subscribe(chore => this.chore = chore);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.choreService.updateChore(this.chore)
      .subscribe(() => this.goBack());
  }
}

