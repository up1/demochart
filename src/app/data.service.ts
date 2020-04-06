import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Result} from './record';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {

  }

  readData(): Observable<Result> {
    return this.http.get<Result>('https://api.airtable.com/v0/appTmxT7I3Kh61mYq/data?pageSize=30&view=Grid%20view&api_key=key3Bb6XIxxcxFk7U');
  }

}
