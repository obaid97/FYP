import { Component, OnInit, OnDestroy } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AuthSignupData } from '../auth/auth-signup-data.model';



@Component(
{
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent
{

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService){}
  accountStatus :any;
  userandadminstatus:boolean;
  status :string;
  authorizedStatus:boolean;
  ngOnInit()
  {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated;
    this.accountStatus = this.authService.getcurrentuserstatus();

    //this.authorizedStatus =
     //console.log(this.authService.getcurrentuserauthorizestatus()+ " - header");
   if(this.accountStatus == "user")
   {
     this.userandadminstatus = true;
   }
   else
   {
     this.userandadminstatus = false;
   }
  });
  }

  ngOnDestroy()
  {
    this.authListenerSubs.unsubscribe();
  }

  onLogout()
  {
    this.authService.logout();
  }
}
