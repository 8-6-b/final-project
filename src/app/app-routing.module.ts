import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChoresComponent } from './chores/chores.component';
import { ChoreDetailComponent } from './chore-detail/chore-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: ChoreDetailComponent },
  { path: 'mytodo',     component: ChoresComponent, data: {title: "To Do Tasks"} },
  { path: 'login',      component: LoginComponent },
  { path: 'signup',     component: SignupComponent} 
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule {}
