import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChoreDetailComponent } from './chore-detail/chore-detail.component';
import { ChoresComponent } from './chores/chores.component';
//import { ChoreSearchComponent } from './chore-search/chore-search.component';

import { ChoreService } from './chores/chore.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ChoreDetailComponent,
    ChoresComponent,
    //ChoreSearchComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [ ChoreService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
