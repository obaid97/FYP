import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import * as io from 'socket.io-client';
import { PostsService } from 'src/app/posts/posts.service';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-chat-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})


export class InboxComponent
{
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  accountStatus: any;
  userandadminstatus: boolean;
  status: string;
  authorizedStatus: boolean;
  users=[];
  constructor(private authService: AuthService, private router:Router)
  {
    this.authService.getuserchats().subscribe(userchat =>
      {
        let temp =userchat;
        //console.log();
        for(let i = 0; i<2;i++)
        {
          this.users[i] = temp[i];
        }
      });
  }

  ngOnInit()
  {
    // document.getElementById('car_search_form').submit(this.searching());
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.accountStatus = this.authService.getcurrentuserstatus();

      //this.authorizedStatus =
      //console.log(this.authService.getcurrentuserauthorizestatus()+ " - header");
      if (this.accountStatus == "user") {
        this.userandadminstatus = true;
      }
      else {
        this.userandadminstatus = false;
      }
    });


  }

  onchat(userid:string)
  {
    this.authService.getchats(userid);
    this.router.navigate(["/chat"]);

  }

  onLogout() {
    this.authService.logout();
  }
}
