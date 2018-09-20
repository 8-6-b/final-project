import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: any

  signup() {
    this.userService.signup(this.user).subscribe((data: any) => {
      localStorage.setItem('token', data.token)
      this.router.navigate(['/login'])
    });
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.user = {}
  }

}