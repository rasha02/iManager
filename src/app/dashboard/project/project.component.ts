import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import swal from "sweetalert2";



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  id;
  name;
  docs;
  users;

  projects: any;

  constructor(public projectServ:ProjectService, public route :ActivatedRoute) {
    this.getAllProjects()
  }

  ngOnInit() {


  }


  getAllProjects() {

    this.projectServ.getallProjects().subscribe(res => {
      console.log(res);
      this.projects = res;

    })

  }

  editProject(id,name){
    this.id=id;
    this.name=name;
  }

  updateProject(){
    this.projectServ.updateProject(this.id,this.name).subscribe(res=>{
      this.getAllProjects()
    })
  }

  removeProject(id)
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
        this.projectServ.removeProject(id).subscribe(res=>{
          this.getAllProjects();

        })
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  addProject(){

    this.projectServ.addProject(this.name).subscribe(res => {
      console.log(res)
      this.getAllProjects()

    })

  }


}
