import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  processing = false;
  invalidLogin: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.logout();
  }

  validateLogin() {
    this.processing = true;
    this.authService.login(this.userName, this.password)
      .subscribe(result => {
        this.authService.setSesion(result.fullName);
        this.router.navigate(['/users']);
        this.processing = false;
      }, error => {
        if (error.status === 401) {
          this.invalidLogin = "Usuario o Contraseña incorrectos";
          setTimeout(() => {
            this.invalidLogin = "";
          }, 8000);
        }
        this.processing = false;
      });
  }

}