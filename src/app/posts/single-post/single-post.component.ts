import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/data.service';
import { SearchService } from 'src/app/search/search.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  carmake:string;
  City:string;
  regcity:string;
  images:string;
  carmileage:String;
  carcolor:String;
  enginetype:string;
  enginecapacity:string;
  features:string;
  mobilenumber:number;
  singleDataId : any ;
  data: any;


  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(public postsService: PostsService, private authService: AuthService, private dataService: DataService, private searchService: SearchService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("in this sngle");
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params", params);
      });
    this.singleDataId = this.dataService.getSingleData();
    console.log("singleId", this.singleDataId);
    if (this.singleDataId) {
      this.searchService.singleSearch(this.singleDataId).subscribe(postData => {
        console.log("searchsinge", postData);
        this.data = postData;
        // this.router.navigate(["/search"]);
      });
    }
  }


}
