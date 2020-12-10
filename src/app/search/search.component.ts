import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
import { PostsService } from '../posts/posts.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myForm = new FormGroup({
    searchText: new FormControl('', [Validators.required]),
  });
  sharedDataincoming: any[];
  sharedData: any[];
  price : any;
  userId: string;
  isloading = false;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  accountStatus :any;
  userandadminstatus:boolean;
  status :string;
   totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  authorizedStatus:boolean;
  storedPosts:any;
  adminstatus:string;
  approve:boolean;
  constructor(public searchService: SearchService, private dataService: DataService, private authService: AuthService,private router: Router,public postsService: PostsService)
   {
    this.isloading = true;
    this.userId = this.authService.getUserId();
    this.authorizedStatus = this.authService.getcurrentuserauthorizestatus();

    }

  ngOnInit(): void {
    this.sharedData = this.dataService.getData();
    //console.log("this.sharedData");
    this.storedPosts = JSON.parse(localStorage.getItem("postsearched"));
    console.log( "stored Names: ",this.storedPosts);
   this.price= 2450;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated;
    this.accountStatus = this.authService.getcurrentuserstatus();


    //this.authorizedStatus =
     //console.log(this.authService.getcurrentuserauthorizestatus()+ " - header");
   if(this.accountStatus == "user")
   {
     this.userandadminstatus = true;
   }
   else
   {
     this.userandadminstatus = false;
   }
  });
  this.adminstatus = localStorage.getItem("adminstatus");
  if(this.adminstatus == 'true')
  {
    console.log("set true");
    this.approve = true;
  }
  else
  {
    this.approve = false;
  }

  }

  search() {
    console.log("here in search");
    // console.log("Search text:", this.myForm.value.searchText);
    this.searchService.search(this.myForm.value.searchText).subscribe(postData => {

    });

    this.myForm.reset();
  }


  onDelete(postId: string) {
    this.isloading = true;
    this.postsService.deletepost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isloading = false;

    });
  }

  singlepost(postid:string)
  {
    this.router.navigate(["/post", postid]);
  }

  onLogout()
  {
    this.authService.logout();

  }



  onchat(creatorid: any)
  {
   //this.authService.createport(creatorid);

   this.postsService.setCreatorId(creatorid);
   this.router.navigate(["/chat",creatorid]);
   //this.authService.startchat(creatorid);
  }


}
