import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  id;
  name;
  email;
  password;


  admins: any;

  constructor(public adminServ:AdminService) { }

  ngOnInit() {
    this.getallAdmins()
  }

  getallAdmins(){

    this.adminServ.getAllAdmins().subscribe(res=>{
      console.log(res);
      this.admins=res;

    })

  }

  editAdmin(id,name, email, password){
    this.id=id;
    this.name=name;
    this.email=email;
    this.password=password;

  }

  updateAdmin(){

    this.adminServ.updateAdmin(this.id,this.name,this.email,this.password).subscribe(res=>{
      this.getallAdmins()

    })

  }

  addAdmin(name, email, password) {
    this.adminServ.addAdmin(this.name, this.email, this.password).subscribe(res => {
      this.getallAdmins()

    })
  }

  removeAdmin(id)
  {
    this.adminServ.removeAdmin(id).subscribe(res=>{
      this.getallAdmins();

    })
  }


}
