import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  base_url="http://localhost:3000/"

  constructor(private http:HttpClient) { }


  getallProjects(){

    return this.http.get(this.base_url+"projects")
  }

  updateProject(idproj,name)
  {
    return this.http.put(this.base_url+"projects/updateProject/idproj"+idproj+"&name="+name, {})
  }

  removeProject(idproj){

    return this.http.get(this.base_url+"projects/removeProject?idproj="+idproj)
  }

  getUsersByProject(idproj){
    return this.http.get(this.base_url+"users/getUsersByProject?idproj="+idproj)
  }


  getDocsByProject(idproj){
    return this.http.get(this.base_url+"documents/getDocsByProject?idproj="+idproj)
  }

  addProject(name){
    return this.http.post(this.base_url+"projects/addProject?name="+name,{})
  }

}
