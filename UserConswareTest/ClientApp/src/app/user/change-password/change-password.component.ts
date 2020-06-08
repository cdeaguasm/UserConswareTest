import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};
  user: User;
  processing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(data => {
        let id = +data.get('id');
        this.getUser(id);
      });
  }

  getUser(id: number) {
    this.userService.getUser(id)
      .subscribe(data => {
        this.user = data;
      });
  }

  save() {
    this.processing = true;

    let model = {
      id: this.user.id,
      password: this.model.password,
      confirmPassword: this.model.confirmPassword
    }

    this.userService.changePassword(this.user.id, model)
      .subscribe(() => {
        this.goToUsers();
      }, error => {
        this.processing = false;
      });
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

}
