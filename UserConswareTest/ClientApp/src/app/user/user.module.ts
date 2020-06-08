import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { MainComponent } from '../layout/main/main.component';
import { NavMenuComponent } from '../layout/nav-menu/nav-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
    declarations: [
        UserListComponent,
        UserEditorComponent,
        ChangePasswordComponent,
        NavMenuComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
