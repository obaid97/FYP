import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { mimeType } from '../../posts/post-create/mime-type.validator';
import { AuthSignupData } from '../auth-signup-data.model';
import { PageEvent } from '@angular/material/paginator';
import { PostsService } from 'src/app/posts/posts.service';
import { Post } from 'src/app/posts/post.model';

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
  accountStatus:any;
  authorizedStatus:boolean;
  try:any[];
  private authListenerSubs: Subscription;
  userdetails: any
  userandadminstatus:boolean;
  totalUnverifiedUsers = 0;
  allposts:any=[];
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  barChartData: any;
  barChartLabels: any;
  barChartType = 'bar';
  chartReady = false;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  userPosts: any;
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              userCallback: function(label, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                      return label;
                  }

              },
          }
      }],
  },
  };
  verified:boolean ;

  constructor(public authService: AuthService, public postsService: PostsService,public router: Router)
{

  this.authService.getuserDeatils().subscribe(data =>{
    let dataincome= data;
    this.userdetails = dataincome.user;
    this.userId = dataincome.user._id;
    //console.log(this.userId)
    this.postsService.getuserposts(this.userId).subscribe(data =>
      {
        let alluserposts = data;
        this.allposts = alluserposts;
        console.log(this.allposts);
      });
    //console.log(this.userdetails);
},err=>{
  console.log(err);

});

  this.authService.getuserStats().subscribe(data =>{
 console.log("issssdata", data);
 this.userPosts = data.userPosts;
 let values = []; 
 let labels = [];
 data.barData.forEach((elem) => {
   if(elem._id !== null) {
    values.push(elem.count);
    labels.push(this.months[elem._id]);
   }  
 });
 values.push(0);
 console.log("values", values);
 console.log("values", labels);
 this.barChartData = [{data: values, label: 'No.of Posts'}];
 this.barChartLabels = labels;
 this.chartReady = this.userPosts > 0 ?  true :  false;
},err=>{
console.log(err);

});


}


  ngOnInit()
{

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated;
    this.accountStatus = this.authService.getcurrentuserstatus();
      //console.log(this.userdetails);
   if(this.accountStatus == "user")
   {
     this.userandadminstatus = true;
   }
   else
   {
     this.userandadminstatus = false;
   }
  });


  //this.authService.getuserDeatils();
  //this.currentusercnic = this.authService.getUsercnic();
  //console.log(this.authService.getuserDeatils());
 // alert(this.userdf);
  //alert(this.fullName);


  this.isloading=true;

  // console.log( this.authService.getcurrentuserdetails());
  this.isloading=false;



}


ngOnDestroy()
{}

onedit()
{
  this.router.navigate(["/editprofile"]);
}

onLogout()
{
  this.authService.logout();
}
onuserDelete()
{

  this.authService.deleteUser(this.currentusercnic);
  this.authService.logout();
}

onpostDelete(postId: string) {
  this.isloading = true;
  this.postsService.deletepost(postId).subscribe(() => {
    this.router.navigate(["/userprofile"])
  }, () => {
    this.isloading = false;

  });
}


}
