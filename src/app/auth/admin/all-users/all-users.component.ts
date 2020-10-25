import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../posts/post.model';
import { AuthSignupData } from '../../auth-signup-data.model';
import { PostsService } from '../../../posts/posts.service';
import {Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component(
  {
    selector: 'app-allusers',
    templateUrl:'./all-users.component.html',
    styleUrls: ['./all-users.component.css']
  })

export class AllUsersComponent
  {
    allusers: AuthSignupData[] = [];
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






    constructor(public authService: AuthService)
    {}


    ngOnInit()
      {this.isloading=true;
        this.allusers = this.authService.getallUsers();
        this.isloading=false;

      }


    onChangedPage(pageData: PageEvent)
    {
      this.currentPage = pageData.pageIndex +1;
      this.unverifiedUsersPerPage = pageData.pageSize;
      this.authService.getallUsers();
    }

    ngOnDestroy()
    {}

    onDelete(cnicNumber: number)
    {
      this.isloading = true;
      this.authService.deleteUser(cnicNumber);
      this.isloading=false;
    }

    ondisbale(cnicNumber:number)
    {
      this.isloading=true;
      this.authService.disableUser(cnicNumber);
      this.isloading=false;
    }
  }
