import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  base_url="http://localhost:3000/project"

  constructor(private http:HttpClient) { }


  getAllProjects(){

    return this.http.get(this.base_url)
  }




}
