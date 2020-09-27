import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/search/";

@Injectable({ providedIn: 'root' })

export class SearchService {
  constructor(private http: HttpClient, private router: Router) { }
  search(searchText: string) {
    console.log("Search Text in service:", searchText);
    return this.http.get(BACKEND_URL + searchText);
  }
}
