import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';


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
  post: Post[];
  isloading = false;
  userId: string;
  private postsSub: Subscription;
  private authServiceSub: Subscription;
  userIsAuthenticated = false;
  carmake: string;
  City: string;
  regcity: string;
  images: string;
  carmileage: String;
  carcolor: String;
  enginetype: string;
  enginecapacity: string;
  mobilenumber: number;
  postId: string
  postList: any=[];
  features= [];
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(public postsService: PostsService, private authService: AuthService, private route: ActivatedRoute)
  {
    this.postId =  this.route.snapshot.paramMap.get('id');
  }

  ngOnInit()
  {

    this.postsService.getsinglepost(this.postId).subscribe(data=>{

      this.postList = data;
      /*
      var fruits = 'apple,orange,pear,banana,raspberry,peach';
      var ar = fruits.split(','); // split string on comma space
      console.log( ar );
      */

      var str = this.postList.features;
      //var count = str.length(str.split(',') );
      //console.log("count: ",count);
      var seprate = str.split(',');
      for(let i=0; i<seprate.length; i++)
      {
        this.features[i] = seprate[i];
      }
     // console.log("post data: ", this.features);

    },err=>{

    });


}

  onLogout()
  {
    this.authService.logout();
  }
}
