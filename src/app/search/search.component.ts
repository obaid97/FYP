import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';
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
  sharedData: any[];
  price : any;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  accountStatus :any;
  userandadminstatus:boolean;
  status :string;
  authorizedStatus:boolean;
  constructor(public searchService: SearchService, private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {
    this.sharedData = this.dataService.getData();
    console.log("this.sharedData");
   
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
  }

  search() {
    console.log("here in search");
    // console.log("Search text:", this.myForm.value.searchText);
    this.searchService.search(this.myForm.value.searchText).subscribe(postData => {

    });

    this.myForm.reset();
  }


  onLogout()
  {
    this.authService.logout();
  }

}
