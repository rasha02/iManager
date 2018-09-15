import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  projs: any;
  constructor(public projectServ:ProjectService) { }

  ngOnInit() {
    this.getallProjects()

  }


  getallProjects() {

    this.projectServ.getAllProjects().subscribe(res => {
      console.log(res);
      this.projs = res;

    })

  }

}
