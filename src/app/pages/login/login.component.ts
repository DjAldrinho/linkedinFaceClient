import {Component, OnInit} from '@angular/core';
import {LinkedinService} from '../../services/linkedin.service';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {Linkedin} from '../../models/linkedin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  token: string;
  linkedin: Linkedin;

  constructor(private linkedinService: LinkedinService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (!_.isEmpty(params)) {
        this.getAuth(params.code);
      } else {
        this.linkedin = {
          userId: null,
          id: null,
          authCode: '',
          authToken: '',
          linkedinID: '',
          token: ''
        };
        this.getInfoAccess();
      }
    });
  }

  getUrlCode(): string {
    return this.linkedinService.getUrlCode();
  }

  getAuth(code: string): void {
    this.linkedinService.getAuth(1, code).subscribe((data) => {
      this.linkedin.token = data.linkedin.token;
    });
  }

  postJob(): void {
    console.log(1);
  }

  private getInfoAccess(): void {
    this.linkedinService.getInfoLinkedin(1).subscribe(data => {
      this.linkedin.id = data.id;
      console.log(data);
      this.linkedin.userId = data.user_id;
      this.linkedin.authCode = data.auth_code;
      this.linkedin.authToken = data.auth_token;
      this.linkedin.linkedinID = data.linkedin_id;
    });
  }

}
