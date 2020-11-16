import { Component, OnInit, OnDestroy } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AuthSignupData } from '../auth/auth-signup-data.model';
import { SearchService } from '../search/search.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';



@Component(
  {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })

export class HomeComponent {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService, private searchService: SearchService, private dataService: DataService, private router:Router) { }
  accountStatus: any;
  userandadminstatus: boolean;
  status: string;
  authorizedStatus: boolean;
  model: string = '';
  selectedBrand: any = '';
  selectedCity: any = '';
  selectedColour: any = '';
  selectedPrice: string = '';
  brands = [{ name: 'Any Brand', value: '' }, { name: 'Audi', value: 'Audi' }, { name: 'BMW', value: 'BMW' }, { name: 'Lexus', value: 'Lexus' }, { name: 'Mercedes', value: 'Mercedes Benz' }, { name: 'Toyota', value: 'Toyota' }, { name: 'Honda', value: 'Honda' }, { name: 'Suzuki', value: 'Suzuki' }, { name: 'Kia', value: 'Kia' }]
  colours = [{ name: 'Any Colour', value: '' }, { name: 'White', value: 'white' }, { name: 'Black', value: 'black' }, { name: 'Silver', value: 'silver' }];
  cities = [{ name: 'Any City', value: '' }, { name: 'Karachi', value: 'khi' }, { name: 'Islamabad', value: 'isb' }];
  prices = [{ name: '< 500000', value: '' }, { name: '500000 - 1000000', value: 'khi' }, { name: '1000000 - 1500000', value: 'isb' }, { name: '1500000 - 2000000', value: 'isb' }, { name: '2000000 - 3000000', value: 'isb' }, { name: '3000000 - 4000000', value: 'isb' }, { name: '4000000 - 5000000', value: 'isb' }, { name: '> 5000000', value: 'isb' }];

  ngOnInit() {
    // document.getElementById('car_search_form').submit(this.searching());
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.accountStatus = this.authService.getcurrentuserstatus();

      //this.authorizedStatus =
      //console.log(this.authService.getcurrentuserauthorizestatus()+ " - header");
      if (this.accountStatus == "user") {
        this.userandadminstatus = true;
      }
      else {
        this.userandadminstatus = false;
      }
    });
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
      console.log('data', data);
      this.searchService.search(data).subscribe(postData => {
        console.log("postreturndata", postData);
        this.dataService.setData(postData);
        this.router.navigate(["/search"]);
      });
    }
  };

  onKey(event) { this.model = event.target.value; }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
