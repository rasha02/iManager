import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-docs-by-project',
  templateUrl: './docs-by-project.component.html',
  styleUrls: ['./docs-by-project.component.css']
})
export class DocsByProjectComponent implements OnInit {

  idproj;
  docs;

  constructor(public projectServ : ProjectService , public route :ActivatedRoute) {
    this.idproj= this.route.snapshot.params['id']

    this.getDocsByProject();

  }
  ngOnInit() {
  }


  getDocsByProject(){
  this.projectServ.getDocsByProject(this.idproj).subscribe( res =>{
  this.docs=res
})
}



}
