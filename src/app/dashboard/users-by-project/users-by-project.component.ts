import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-users-by-project',
  templateUrl: './users-by-project.component.html',
  styleUrls: ['./users-by-project.component.css']
})
export class UsersByProjectComponent implements OnInit {

  idproj;
  users;

  constructor(public projectServ : ProjectService , public route :ActivatedRoute) {
    this.idproj= this.route.snapshot.params['id']

    this.getUsersByProject();

  }

  ngOnInit() {
  }

  getUsersByProject(){

    this.projectServ.getUsersByProject(this.idproj).subscribe( data =>{
      this.users=data
    })

  }




}
