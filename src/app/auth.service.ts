import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from './../environments/environment';

@Injectable()
export class AuthService {

  private userProfile: any;
  private _user: BehaviorSubject<any> = new BehaviorSubject(null);

  get user$(): Observable<any> {
    return new Observable(fn => this._user.subscribe(fn));
  }

  get currentUser() {
    return this._user.getValue();
  }

  auth0 = new auth0.WebAuth({
    clientID: 'qaP3EIqUt9sMhISBa0QHbBPTTkutqrng',
    domain: 'trackedpixel.auth0.com',
    responseType: 'token id_token',
    audience: 'https://serene-garden-72300.herokuapp.com',
    redirectUri: environment.authRedirectUri,
    scope: 'openid profile'
  });

  constructor(public router: Router) {
    const u = localStorage.getItem('user_profile');

    if (u) {
      try {
        this._user.next(JSON.parse(u)); // set initial value of user and let subscribers know.
      } catch (e) {
        console.error(`error initializing user: ${e}`);
      }
    }
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';

        this.setSession(authResult);

        this.getProfile((err2, profile) => {
          localStorage.setItem('user_profile', JSON.stringify(profile));
          this._user.next(profile);
          this.router.navigate(['/trackings']);

        });
      } else if (err) {
        this.router.navigate(['/trackings']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_profile');

    this._user.next(null);

    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
