import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-projects-by-user',
  templateUrl: './projects-by-user.component.html',
  styleUrls: ['./projects-by-user.component.css']
})
export class ProjectsByUserComponent implements OnInit {

  iduser;
  nameuser;
  projs;
  proj;
  idproj;
  projects : any []= []
  exist:boolean = false

  constructor(public userServ : UserService , public route :ActivatedRoute) {
    this.iduser= this.route.snapshot.params['id']


    this.getProjsByUser();
    this.getAllProjects();
  }

  ngOnInit() {
  }



  getNameUser(){
    this.userServ.getNameUser(this.iduser).subscribe(data=>{
      this.nameuser=data

    })
  }


  getProjsByUser(){

    this.userServ.getProjsByUser(this.iduser).subscribe( data =>{
      this.projs=data
    })

  }

  affectNewProjToUser(idproj){
console.log("idprojet:" , idproj)
this.userServ.affectNewProjToUser(this.iduser , idproj).subscribe( res =>{
  console.log("done")
  this.getProjsByUser()
  this.getAllProjects()
})
  }


  getAllProjects(){
    this.projects=[]
    this.userServ.getAllProjects().subscribe( data => {

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

  getIdProj(proj){

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
        this.userServ.removeProjFromListProjByUser(this.iduser,idprojet).subscribe(res=>{
          console.log("done")
          this.getProjsByUser()
          this.getAllProjects()

        })
        swal(
          'Removed!',
          'Your project has been removed from the list.',
          'success'
        )
      }
    })

  }

}
