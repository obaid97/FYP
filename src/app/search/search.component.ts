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
  sharedData: any;
  price : any;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  accountStatus :any;
  userandadminstatus:boolean;
  status :string;
  authorizedStatus:boolean;
  storedPosts:any;
  adminstatus:string;
  approve:boolean;
  isloading:boolean;
  userId:string;
  model: string = '';
  selectedBrand: any = '';
  selectedCity: any = '';
  selectedColour: any = '';
  features:any =[];
  selectedPrice: string = '';
  brands = [{ name: 'Audi', value: 'Audi' }, { name: 'BMW', value: 'BMW' }, { name: 'Lexus', value: 'Lexus' }, { name: 'Mercedes', value: 'Mercedes Benz' }, { name: 'Toyota', value: 'Toyota' }, { name: 'Honda', value: 'Honda' }, { name: 'Suzuki', value: 'Suzuki' }, { name: 'Kia', value: 'Kia' }];
  colours = [{ name: 'Any Colour', value: '' }, { name: 'White', value: 'white' }, { name: 'Black', value: 'black' }, { name: 'Silver', value: 'silver' }];
  cities = [{ name: 'Any City', value: '' }, { name: 'Karachi', value: 'khi' }, { name: 'Islamabad', value: 'isb' }];
  prices = [{ name: '< 500000', value: '' }, { name: '500000 - 1000000', value: 'khi' }, { name: '1000000 - 1500000', value: 'isb' }, { name: '1500000 - 2000000', value: 'isb' }, { name: '2000000 - 3000000', value: 'isb' }, { name: '3000000 - 4000000', value: 'isb' }, { name: '4000000 - 5000000', value: 'isb' }, { name: '> 5000000', value: 'isb' }];

  constructor(public searchService: SearchService, private dataService: DataService, private authService: AuthService,private router: Router,public postsService: PostsService)
   {
    this.isloading = true;
    this.userId = this.authService.getUserId();
    this.authorizedStatus = this.authService.getcurrentuserauthorizestatus();
  
    }

  ngOnInit(): void {

    this.sharedData = this.dataService.getData();
console.log("shared: "+ this.sharedData )
  
    /*if(this.dataService.getData() != null)
    {
      this.sharedData = this.dataService.getData();
    }
    else
    {
      
      let arr = [];  
      this.sharedData = Object.keys(localStorage.getItem('searchedposts')).map(function(key){  
          arr.push({[key]:localStorage.getItem('searchedposts')[key]})  
          return arr;  
      });  
    }*/
    //localStorage.removeItem('searchedposts');
    ///localStorage.setItem('searchedposts',this.sharedData);
    
    
    console.log("this.sharedData", this.sharedData);

  //  this.price= 2450;
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
    //console.log("set true");
    this.approve = true;
  }
  else
  {
    this.approve = false;
  }

  }

  search() {
   // console.log("here in search");
    // console.log("Search text:", this.myForm.value.searchText);
   // console.log("form value");
    this.searchService.search(this.myForm.value.searchText).subscribe(postData => {

    });

    this.myForm.reset();
  }

  searchAll() {
    //console.log("herinall");
    this.searchService.searchAll().subscribe(postData => {
      this.sharedData = postData;
    });
  }


  onLogout()
  {
    this.authService.logout();

  }

  roting(post) {
    this.dataService.setSingleData(post._id);
    this.router.navigate(["/single-post"]);

  }
  searchByCond(condition:string, value:string) {
   // console.log("type", condition);
   // console.log("value", value);
    this.searchService.searchByCond({[condition]: value}).subscribe(postData => {
      console.log("postreturndata", postData);
      this.dataService.setData(postData);
      this.router.navigate(["/search"]);
    });
  }

  clickcheck() {

  }
  searching() {
    let price = null;
    if (this.selectedPrice !== '') {
      if (this.selectedPrice.includes('>')) {
        price = Object.assign({ min: 5000000 }, price);
        price = Object.assign({ max: null }, price);
      } else if (this.selectedPrice.includes('<')) {
        price = Object.assign({ min: 0 }, price);
        price = Object.assign({ max: 500000 }, price);
      } else {
        price = Object.assign({ min: Number(this.selectedPrice.split('-')[0].trim()) }, price);
        price = Object.assign({ max: Number(this.selectedPrice.split('-')[1].trim()) }, price);
      }
    }
    const data = {
      make: this.selectedBrand === '' ? null : this.selectedBrand,
      city: this.selectedCity === '' ? null : this.selectedCity,
      exteriorcolor: this.selectedColour === '' ? null : this.selectedColour,
      price,
      model: this.model === '' ? null : this.model
    };
    if ((Object.values(data)).every(e => e === null)) {
      //console.log("pai g khali jae sb khuda da wasta ae select krlo kuch");
      return;
    } else {
     // console.log('data', data);
      this.searchService.search(data).subscribe(postData => {
      //  console.log("postreturndata", postData);
        this.dataService.setData(postData);
        //localStorage.removeItem('searchedposts');
        localStorage.setItem('searchedposts',postData.posts);
        window.location.reload();
        this.router.navigate(["/search"]);
      });
    }
  };

  onKey(event) { this.model = event.target.value; }
}
