import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-projetbyuser',
  templateUrl: './projetbyuser.component.html',
  styleUrls: ['./projetbyuser.component.css']
})
export class ProjetbyuserComponent implements OnInit {
iduser;
projs;
proj;
idproj;
projects : any []= []
  exist:boolean = false
  constructor(public userservice : UserService , public route :ActivatedRoute) {
    this.iduser= this.route.snapshot.params['id']

    this.getprojetbyuser()
    this.getallprojects();
  }

  ngOnInit() {
  }



  getprojetbyuser(){

    this.userservice.listprojbyuser(this.iduser).subscribe( data =>{
      this.projs=data
    })

  }

  affecNewProjToUser(idprojet){
console.log("idprojet:" , idprojet)
this.userservice.affecNewProjToUser(this.iduser , idprojet).subscribe( res =>{
  console.log("done")
  this.getprojetbyuser()
  this.getallprojects()
})
  }


  getallprojects(){
    this.projects=[]
this.userservice.getallproject().subscribe( data => {

  for(var i=0 ; i<data['length'] ; i++){
    this.exist=false;
    for(var j=0 ; j<this.projs['length'] ; j++){

      console.log(data[i]._id)
      console.log(this.projs[j]._id)
      if(data[i]._id == this.projs[j]._id){
        this.exist = true;
      }

    }
    console.log(this.exist)
    if(!this.exist){
      this.projects.push(data[i])
    }



  }
})
  }

  getidproj(proj){

  this.idproj=proj
  console.log(proj)
  }


  removeProjFromListProjByUser(idprojet)
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
        this.userservice.removeProjFromListProjByUser(this.iduser,idprojet).subscribe(res=>{
          console.log("done")
          this.getprojetbyuser()
          this.getallprojects()

        })
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

}
