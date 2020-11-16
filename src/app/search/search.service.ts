import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/posts/search";

@Injectable({ providedIn: 'root' })

export class SearchService {
  constructor(private http: HttpClient, private router: Router) { }
  search(searchData: any) {
    console.log("Search Text in service:", searchData);
    return this.http.post<any>(BACKEND_URL, searchData);
  }
}
