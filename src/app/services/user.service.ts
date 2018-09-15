import { Injectable } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url: any="http://localhost:3000/"

  constructor(public http:HttpClient) { }


  getAllUsers(){

    return this.http.get(this.base_url+"users")
  }

  removeUser(id){

    return this.http.get(this.base_url+"users/removeUser?id="+id)

  }

  updateUser(id,name,email,password)
  {
    return this.http.put(this.base_url+"users/updateUserPost?id="+id+"&name="+name+"&email="+email+"&password="+password, {})
  }

  addUser(name,email,password){

    return this.http.post(this.base_url+"users/addUser?name="+name+"&email="+email+"&password="+password,{})
  }

  listprojbyuser(id){
    return this.http.get(this.base_url+"projects/listProjsByUser?idUser="+id)
  }

  affecNewProjToUser(iduser , idproj){

    return this.http.post(this.base_url+"projects/affectUserToProj/"+iduser+"?idProj="+idproj , {})
  }

  getallproject(){
    return this.http.get(this.base_url+"projects")
  }

  removeProjFromListProjByUser(iduser , idproj){

    return this.http.get(this.base_url+"projects/removeProjFromListProjByUser?idUser="+iduser+"&idproj="+idproj)
  }

  getdocbyprojet(iduser , idproj){
    return this.http.get(this.base_url+"document/listDocByUser?idUser="+iduser+"&idProj="+idproj)
  }

}
