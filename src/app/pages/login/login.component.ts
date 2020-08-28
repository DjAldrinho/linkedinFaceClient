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

  linkedin: Linkedin;
  message: '';

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
      this.linkedin.authToken = data.linkedin.auth_token;
    });
  }

  postJob(): void {
    this.linkedinService.sharePost(this.linkedin).subscribe((data) => {
      this.message = data;
    });
  }

  private getInfoAccess(): void {
    this.linkedinService.getInfoLinkedin(1).subscribe(data => {
      this.linkedin.id = data.linkedin.id;
      this.linkedin.userId = data.linkedin.user_id;
      this.linkedin.authCode = data.linkedin.auth_code;
      this.linkedin.authToken = data.linkedin.auth_token;
      this.linkedin.linkedinID = data.linkedin.linkedin_id;
    });
  }

}
