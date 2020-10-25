import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../posts/post.model';
import { AuthSignupData } from '../auth-signup-data.model';
import { PostsService } from '../../posts/posts.service';
import {Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';


@Component(
{
  selector: 'app-admin',
  templateUrl:'./admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit, OnDestroy
{

users: AuthSignupData[] = [];
unverifiedUsers: AuthSignupData[] = [];
verifiedUsers: AuthSignupData[] = [];
isloading =false;
totalUnverifiedUsers = 0;
unverifiedUsersPerPage = 5;
currentPage = 1;
pageSizeOptions = [1,2,5,10];
userId :string;
private postsSub: Subscription;
private authServiceSub : Subscription;
private alluser: Subscription;
private allunverifiedUsers: Subscription;
private allverifiedUser: Subscription;

userIsAuthenticated =false;
accountStatus:string;
verified:boolean ;
allusercount:number;
allunverifiedUserCount:number;
allverifiedUserCount:number;
allpostscount:number;
allposts:Post[]=[];
totalPosts = 0;




constructor(public authService: AuthService,public postsService: PostsService)
{}


ngOnInit()
  {this.isloading=true;
    this.users = this.authService.getallUsers();
    this.allusercount = this.users.length;
    this.unverifiedUsers = this.authService.getUnverifiedUsers();
    this.allunverifiedUserCount = this.unverifiedUsers.length;
    this.verifiedUsers = this.authService.getVerifiedUsers();
    this.allverifiedUserCount=this.verifiedUsers.length;
    this.postsService.getPosts(this.unverifiedUsersPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdate()
    .subscribe((postData: { posts: Post[], postCount: number }) => {
      this.isloading = false;
      this.totalPosts = postData.postCount;
      this.allposts = postData.posts;
    });
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
  this.authService.deleteUser(cnicNumber);
  this.isloading=false;
}

onApprove(cnicNumber:number)
{
  this.isloading=true;
  this.authService.approveUser(cnicNumber);
  this.isloading=false;
}

}
