import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { mimeType } from '../../posts/post-create/mime-type.validator';
import { AuthSignupData } from '../auth-signup-data.model';
import { PageEvent } from '@angular/material/paginator';

export interface userData
{
  fullName:string;
  email: string;

  phoneNumber:string;
  fullAddress:string;
  cnicNumber:number;
  dob:Date;
  genderStatus:string;
  //accountStatus:string;
  imagePath:string;
}


@Component({
  selector: 'app-userprofile',
templateUrl:'./user-profile.component.html',
styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit
{
  isloading =false;
  private authStatusSub: Subscription;
  signupform : FormGroup;
  userId :string;
  private authServiceSub : Subscription;
  userIsAuthenticated =false;
  currentusercnic:number;
  userdf:userData;
  usercnic:string;
  form : FormGroup;
  imagePreview : string;
  fullName:string;
  fullAddress: string;
  email: string;
  cnicNumber: number;
  dob:Date;
  phoneNumber:string;
  genderStatus:string;
  accountStatus:string;
  authorizedStatus:boolean;
  try:any[];

  userdetails: any

  totalUnverifiedUsers = 0;

  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  verified:boolean ;

  constructor(public authService: AuthService)
{

  this.authService.getuserDeatils().subscribe(data =>{
    this.userdetails= data
},err=>{
  console.log(err);

});
}


  ngOnInit()
{

  //this.authService.getuserDeatils();
  //this.currentusercnic = this.authService.getUsercnic();
  //console.log(this.authService.getuserDeatils());
 // alert(this.userdf);
  //alert(this.fullName);


  this.isloading=true;

  // console.log( this.authService.getcurrentuserdetails());
  this.isloading=false;

  console.log(this.userdetails);


}


ngOnDestroy()
{}

onedit()
{

}


onDelete()
{

  this.authService.deleteUser(this.currentusercnic);
  this.authService.logout();
}
/*
  this.isloading = true;
  this.userId =  this.authService.getUserId();

  this.authService.getuserDeatils().subscribe(userData =>
    {
      this.user
      {
        this.fullName = userData.fullName,
        this.fullAddress = userData.fullAddress,
        this.email = userData.email,
        this.dob = userData.dob;
        this.cnicNumber= userData.cnicNumber;
        this.phoneNumber = userData.phoneNumber;
        this.accountStatus= userData.accountStatus;
        this.authorizedStatus= userData.authorizedStatus;
      }
      this.isloading=false;
        console.log(this.cnicNumber)
    });*/
  //this.authService.getUser(this.usercnic);
  /*this.postsSub=this.postsService.getPostUpdate()
  .subscribe((postData : {posts: Post[], postCount:number}) => {
    this.isloading = false;
    this.totalPosts=postData.postCount;
    this.posts=postData.posts;
  });
 this.userIsAuthenticated  = this.authService.getIsAuth();
 this.authServiceSub= this.authService.getAuthStatusListener().subscribe(isAuthenticated =>
  {
    this.userIsAuthenticated = isAuthenticated;
    this.userId =  this.authService.getUserId();
  });*/


}
