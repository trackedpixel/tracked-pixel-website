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

  public logout() {
    console.log('logging out');
  }
}
