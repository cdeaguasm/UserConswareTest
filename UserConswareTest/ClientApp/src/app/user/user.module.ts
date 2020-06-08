import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { MainComponent } from '../layout/main/main.component';
import { NavMenuComponent } from '../layout/nav-menu/nav-menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MustMatchDirective } from '../helpers/must-match.directive';
import { LoadingContentComponent } from '../loading-content/loading-content.component';
import { AlertComponent } from '../alert/alert.component';

@NgModule({
    declarations: [
        UserListComponent,
        UserEditorComponent,
        ChangePasswordComponent,
        NavMenuComponent,
        MainComponent,
        MustMatchDirective,
        LoadingContentComponent,
        AlertComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class UserModule { }
