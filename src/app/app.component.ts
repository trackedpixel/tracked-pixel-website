import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isCollapsed = false;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  public get profileName() {
    if (this.auth.profile && this.auth.profile.given_name) {
      return this.auth.profile.given_name;
    } else if (this.auth.profile) {
      return 'User';
    }
  }

  public logout() {
    console.log('logging out');
  }
}
