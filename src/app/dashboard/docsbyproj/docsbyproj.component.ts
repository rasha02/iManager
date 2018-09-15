import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-docsbyproj',
  templateUrl: './docsbyproj.component.html',
  styleUrls: ['./docsbyproj.component.css']
})
export class DocsbyprojComponent implements OnInit {
docs;
iduser;
idproj;
  constructor( public userservice : UserService , public route:ActivatedRoute) {
    this.iduser=this.route.snapshot.params['iduser']
    this.idproj=this.route.snapshot.params['idproj']


    this.userservice.getdocbyprojet(this.iduser,this.idproj).subscribe( res => {
      this.docs=res ;
    })


  }

  ngOnInit() {
  }

}
