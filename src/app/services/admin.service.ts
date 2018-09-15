import { Injectable } from '@angular/core';
import {fn} from '../../../node_modules/@angular/compiler/src/output/output_ast';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  base_url="http://localhost:3000/admin"

  constructor(private http:HttpClient) { }

  getAllAdmins(){

    return this.http.get(this.base_url)
  }

  updateAdmin(id,name,email,password){

    return this.http.put(this.base_url+"/updateAdmin/"+id, {name:name,email:email,password:password})
  }

  addAdmin(name,email,password){

    return this.http.post(this.base_url+"/addAdmin",{name:name,email:email,password:password})
  }

  removeAdmin(id){

    return this.http.delete(this.base_url+"/removeAdmin?id="+id)

  }

  login(email , mdp){
    return this.http.post(this.base_url+"/login?email="+email+"&password="+mdp , {})
  }

}
