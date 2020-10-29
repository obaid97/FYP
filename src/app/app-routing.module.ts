import { NgModule } from "@angular/core";
import { RouterModule,Routes, ROUTES} from "@angular/router";
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from '../app/auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { SmartContractComponent } from './auth/smart-contract/smart-contract.component';
import { SearchComponent } from './search/search.component';

import { SinglePostComponent } from './posts/single-post/single-post.component';
import { ChatInboxComponent } from './auth/chat-inbox/chat-inbox.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DisplayNewPasswordComponent } from './auth/forgot-password/display-new-password/display-new-password';
import { BlogComponent } from './blog/blog.component.ts';
import { FAQComponent } from './FAQ/FAQ.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './About-us/About-us.component';
import { SingleBlogComponent } from './blog/single-blog/single-blog.component';

const routes: Routes=[
  { path:'', component: HomeComponent },
  { path:'posts',component:PostListComponent },
  { path:'post/:postId',component:SinglePostComponent },
  { path:'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path:'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path:'userprofile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path:'blog', component:BlogComponent },
  { path:'singleblog', component:SingleBlogComponent },
  { path:'faq', component:FAQComponent },
  { path:'contactus', component:ContactUsComponent },
  { path:'about', component:AboutUsComponent },

  { path:'userdetail/:userId', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path:'smartcontract', component: SmartContractComponent, canActivate: [AuthGuard] },
  { path:'forgotpassword',component:ForgotPasswordComponent},
  { path:'DNP',component: DisplayNewPasswordComponent},
  { path:'search', component: SearchComponent },
  { path:'chat', component:ChatInboxComponent, canActivate: [AuthGuard]},
  //this wont work in the newer version
  //another way to load children is
  { path:"auth",loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule(
{
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule
{

}
