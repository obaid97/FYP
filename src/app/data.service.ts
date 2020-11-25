import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sharedData: any[];


  setData(data) {
    this.sharedData = data.posts;
  }

  getData() {

    return this.sharedData ;
    //return localStorage.getItem('postsearched');
  }
  constructor() { }
}
