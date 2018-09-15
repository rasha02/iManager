import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

import swal from 'sweetalert2'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id;
  name;
  email;
  password;
  firstName;
  lastName;
  phone;

  users: any;
  constructor(public userServ:UserService) { }

  ngOnInit() {
    this.getallUsers()
  }

  getallUsers(){

    this.userServ.getAllUsers().subscribe(res=>{
      console.log(res);
      this.users=res;

    })

  }

  removeUser(id)
  {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.userServ.removeUser(id).subscribe(res=>{
          this.getallUsers();

        })
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })




  }







  editUser(id,firstName, lastName, phone){
    this.id=id;
    this.name=firstName;
    this.email=lastName;
    this.password=phone;

  }

  updateUser(){
console.log(this.id,this.name,this.email,this.password)
    this.userServ.updateUser(this.id,this.name,this.email,this.password).subscribe(res=>{
      this.getallUsers()

    })

  }

  addUser(){
  this.userServ.addUser(this.name, this.email, this.password).subscribe(res=>{
    console.log("done")
    this.getallUsers()

  })
  }

}
