import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { AuthSignupData } from '../../auth-signup-data.model';
@Component(
  {
    selector: 'app-',
    templateUrl:'./unverified-users.component.html',
    styleUrls: ['./unverified-users.component.css']
  })

  export class UnverifiedUsersComponent
  {
    constructor(private authService: AuthService ,public route: ActivatedRoute, private _formBuilder: FormBuilder){}

unverifiedUsers: AuthSignupData[] = [];
isloading =false;
totalUnverifiedUsers = 0;
unverifiedUsersPerPage = 5;
currentPage = 1;
pageSizeOptions = [1,2,5,10];
userId :string;
private postsSub: Subscription;
private authServiceSub : Subscription;
userIsAuthenticated =false;
accountStatus:string;
verified:boolean ;


ngOnInit()
  {this.isloading=true;
    this.unverifiedUsers = this.authService.getUnverifiedUsers();

   // this.userId = this.authService.getUserId();
    /*this.authServiceSub = this.authService.getUnverifiedUsersupdate()
      .subscribe((userData: {unverifiedUsers:AuthSignupData[], unverifiedUsersCount:number})=>
      {
        this.isloading=false;
        this.totalUnverifiedUsers = userData.unverifiedUsersCount;
        this.unverifiedUsers = userData.unverifiedUsers;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
*/
    this.isloading=false;
  }


onChangedPage(pageData: PageEvent)
{
  this.currentPage = pageData.pageIndex +1;
  this.unverifiedUsersPerPage = pageData.pageSize;
  this.authService.getUnverifiedUsers();
}

ngOnDestroy()
{}

onDelete(cnicNumber: number)
{
  this.isloading = true;
  this.authService.deleteUser(cnicNumber).subscribe(()=>
  {
    this.authService.getUnverifiedUsers();
  },()=>
  {
    this.isloading=false;
  });
}

onApprove(cnicNumber:number)
{
  this.isloading=true;

}

  }
