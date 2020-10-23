import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';

const routes: Routes =[
  { path:'login',component:LoginComponent},
  { path:'signup',component: SignupComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'chat',component: ChatInboxComponent}
]

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})

export class AuthRoutingModuel
{

}
