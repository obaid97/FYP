import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { SearchComponent } from '../../search/search.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Tile {
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})




export class PostListComponent implements OnInit, OnDestroy {
  count = 0;
  posts: Post[] = [];
  curretnusercnicNumber: number;
  isloading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [10, 15, 20, 25];
  userId: string;
  private postsSub: Subscription;
  private authServiceSub: Subscription;
  userIsAuthenticated = false;
  authorizedStatus:boolean;
  searchform : FormGroup;


  constructor(public postsService: PostsService, private authService: AuthService,private router: Router) { }

  tiles: Tile[] = [
    {cols: 1, rows: 2},
    { cols: 3, rows: 1,},
    { cols: 1, rows: 1,},
    { cols: 2, rows: 1,},
  ];

/*
tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

*/
  ngOnInit() {

    this.searchform= new FormGroup(
      {
      //basic car info
        make : new FormControl(null),
        model: new FormControl(null),
        price: new FormControl(null),

      }
    );


    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.isloading = true;
    this.userId = this.authService.getUserId();
    this.authorizedStatus = this.authService.getcurrentuserauthorizestatus();
    this.postsSub = this.postsService.getPostUpdate()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.isloading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authServiceSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
    this.count = this.posts.length % 3;
    this.curretnusercnicNumber = this.authService.getUsercnic();
    //console.log(this.count);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isloading = true;
    this.postsService.deletepost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isloading = false;

    });
  }

  singlepostview(postid:string)
  {
    this.postsService.getsinglepost(postid);
  }

  onLogout()
  {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authServiceSub.unsubscribe();
  }

  onchat(creatorid: any)
  {
   //this.authService.createport(creatorid);

   this.postsService.setCreatorId(creatorid);
   this.router.navigate(["/chat",creatorid]);
   //this.authService.startchat(creatorid);
  }

  //end
}
