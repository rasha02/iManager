import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-docs-by-user-project',
  templateUrl: './docs-by-user-project.component.html',
  styleUrls: ['./docs-by-user-project.component.css']
})
export class DocsByUserProjectComponent implements OnInit {
  docs;
  iduser;
  idproj;

  constructor( public userServ : UserService , public route:ActivatedRoute) {
    this.iduser=this.route.snapshot.params['iduser']
    this.idproj=this.route.snapshot.params['idproj']


    this.userServ.getDocsByUserByProj(this.iduser,this.idproj).subscribe( res => {
      this.docs=res ;
    })


  }

  ngOnInit() {
  }

}
