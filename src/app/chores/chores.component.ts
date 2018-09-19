import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.scss']
})
export class ChoresComponent implements OnInit {
  todos: any;
  todo: any;

  create() {
    this.todosService.createTodo(this.todo).subscribe(() => {
      window.location.reload();
    });
  }

  edit(td) {
    let newTodo = window.prompt(`Update Todo: ${td.description}`);
    this.todosService.editTodo(newTodo, td._id).subscribe(() => {
      window.location.reload();
    });
  }

  delete(id) {
    this.todosService.deleteTodo(id).subscribe(() => {
      window.location.reload();
    });
  }

  constructor(private todosService: TodosService) {
    this.todosService.getTodos().subscribe((data: any) => {
      this.todos = data;
    });
  }

  ngOnInit() {
    this.todo = {}
  }

}

// import { Component, OnInit } from '@angular/core';

// import { Chore } from '../chores/chore';
// import { ChoreService } from '../chores/chore.service';

// @Component({
//   selector: 'app-chores',
//   templateUrl: './chores.component.html',
//   styleUrls: ['./chores.component.scss']
// })
// export class ChoresComponent implements OnInit {
//   chores: Chore[];

//   constructor(private choreService: ChoreService) { }

//   ngOnInit() {
//     this.getChores();
//   }

//   getChores(): void {
//     this.choreService.getChores()
//     .subscribe(chores => this.chores = chores);
//   }

//   add(name: string): void {
//     name = name.trim();
//     if (!name) { return; }
//     this.choreService.addChore({ name } as Chore)
//       .subscribe(chore => {
//         this.chores.push(chore);
//       });
//   }

//   delete(chore: Chore): void {
//     this.chores = this.chores.filter(h => h !== chore);
//     this.choreService.deleteChore(chore).subscribe();
//   }

// }

