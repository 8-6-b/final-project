import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: any

  register() {
    this.userService.register(this.user).subscribe((data: any) => {
      localStorage.setItem('token', data.token) 
    });
  }

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.user = {}
  }

}
