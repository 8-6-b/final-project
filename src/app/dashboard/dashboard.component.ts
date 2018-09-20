import { Component, OnInit } from '@angular/core';
//import { Chore } from '../chores/chore';
//import { ChoreService } from '../chores/chore.service';
import { TodosService } from '../todos.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  todos: any;
  todo: any;

  create() {
    this.todosService.createTodo(this.todo).subscribe(() => {
      this.router.navigate(['/todos'])
    });
  }

  edit(td) {
    let newTodo = window.prompt(`Update Todo: ${td.description}`);
    this.todosService.editTodo(newTodo, td._id).subscribe(() => {
      this.router.navigate(['/todos'])
      window.location.reload();
    });
  }

  delete(id) {
    this.todosService.deleteTodo(id).subscribe(() => {
      this.router.navigate(['/todos'])
      window.location.reload();
    });
  }

  constructor(
    private todosService: TodosService,
    private router: Router    
    ) {
    this.todosService.getTodos().subscribe((data: any) => {
      this.todos = data;
    });
  }

  ngOnInit() {
    this.todo = {}
  }

}


//   chores: any;

//   constructor(private choreService: ChoreService) { }

//   ngOnInit() {
//     this.getChores();
//   }

//   getChores(): void {
//     this.choreService.getChores()
//       .subscribe(chores => this.chores = chores.slice(1, 5));
//   }
// }
