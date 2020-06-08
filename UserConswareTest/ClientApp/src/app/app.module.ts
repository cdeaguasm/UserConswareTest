import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoadingContentComponent } from './loading-content/loading-content.component';
import { LoadingContentInterceptor } from './interceptors/loading-content.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canLoad: [AuthGuard]
      },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingContentInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
