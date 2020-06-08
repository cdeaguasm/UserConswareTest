import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { MainComponent } from '../layout/main/main.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    { path: '', component: UserListComponent },
                    { path: 'editor', component: UserEditorComponent },
                    { path: 'editor/:id', component: UserEditorComponent },
                    { path: 'password/:id', component: ChangePasswordComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
