import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodosService } from './todos.service';
import { AppRoutingModule } from './app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChoresComponent } from './chores/chores.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ChoresComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [ TodosService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
