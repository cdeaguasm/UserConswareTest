import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users$: Observable<User[]>;
    _baseUrl: string;

    constructor(private userService: UserService,
        @Inject('BASE_URL') private baseUrl: string) { }

    ngOnInit() {
        this._baseUrl = `${this.baseUrl}uploads`;
        this.getUsers();
    }

    getUsers(filter?: string) {
        this.users$ = this.userService.getUsers(filter);
    }

    deleteUser(user: User) {
        const result = confirm(`¿ Está seguro que desea eliminar el usuario ${user.userName} ?`);

        if (result) {
            this.userService.deleteUser(user.id)
                .subscribe(() => {
                    this.getUsers();
                })
        }
    }

}