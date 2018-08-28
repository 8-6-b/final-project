import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// import { Dashboard } from '../dashboard';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo.component.html',
  styleUrls: [ './todo.component.css' ]
})
export class TodoDetailComponent implements OnInit {
  @Input() todo: any;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(id)
      .subscribe(todo => this.todo = todo);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.todoService.updateTodo(this.todo)
      .subscribe(() => this.goBack());
  }
}
