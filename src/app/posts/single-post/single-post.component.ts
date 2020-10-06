import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component(
  {
    selector: 'app-singlepost',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.css']
  })

export class SinglePostComponent
{
  post: Post;
  isloading = false;
  userId: string;
  private postsSub: Subscription;
  private authServiceSub: Subscription;
  userIsAuthenticated = false;

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(public postsService: PostsService, private authService: AuthService) { }

  ngOnInit()
  {
    this.post = this.postsService.getpostobser();
    //alert(this.post);
  }

}
