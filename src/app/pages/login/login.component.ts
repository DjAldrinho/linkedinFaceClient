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
  message: string;
  show = false;

  constructor(private linkedinService: LinkedinService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!this.show) {
      this.route.queryParams.subscribe(params => {
        if (!_.isEmpty(params)) {
          this.getAuth(params.code);
        }
      });
    }

    this.linkedin = {
      userId: null,
      id: null,
      authCode: '',
      authToken: '',
      linkedinID: '',
    };

    this.loadLinkedin();

  }

  getUrlCode(): string {
    return this.linkedinService.getUrlCode();
  }

  getAuth(code: string): void {
    this.linkedinService.getAuth(1, code).subscribe((data) => {
      this.message = data.msj;
      this.show = data.show;
    });
  }

  postJob(): void {
    if (!_.isEmpty(this.linkedin)) {
      this.linkedinService.sharePost(this.linkedin).subscribe((data) => {
        this.message = data;
      });
    } else {
      this.message = 'Debe autenticarse';
    }
  }

  private getInfoAccess(): void {
    this.linkedinService.getInfoLinkedin(1).subscribe(data => {

      if (!_.isEmpty(data.linkedin)) {
        this.linkedin.id = data.linkedin.id;
        this.linkedin.userId = data.linkedin.user_id;
        this.linkedin.authCode = data.linkedin.auth_code;
        this.linkedin.authToken = data.linkedin.auth_token;
        this.linkedin.linkedinID = data.linkedin.linkedin_id;
        this.show = true;
      }


    });
  }

  private loadLinkedin(): void {
    this.getInfoAccess();
  }

}
