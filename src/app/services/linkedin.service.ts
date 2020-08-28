import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {

  private static CLIENT_ID = '8693eg3yhrand3';
  private static SCOPES = 'r_emailaddress,r_liteprofile,w_member_social';
  private static URL_BASE = 'https://www.linkedin.com/oauth/v2/';

  constructor(private http: HttpClient) {
  }

  getUrlCode(): string {
    return LinkedinService.URL_BASE + 'authorization?response_type=code&client_id=' + LinkedinService.CLIENT_ID +
      '&redirect_uri=' + environment.redirect_uri + '&scope=' + LinkedinService.SCOPES;
  }

  getAuth(userId: number, code: string): Observable<any> {
    return this.http.post(environment.api_linkedin + 'auth/', {userId, code}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getInfoLinkedin(userId: number): Observable<any> {
    return this.http.get(environment.api_linkedin + 'infoAccess/' + userId).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
