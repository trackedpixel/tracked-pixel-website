import { Component, OnInit } from '@angular/core';

import { ToasterService, Toast } from 'angular2-toaster';

import { AuthService } from './auth.service';
import { PusherService } from './pusher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isCollapsed = true;

  constructor(public auth: AuthService, private toaster: ToasterService, private pusherService: PusherService) {
    auth.handleAuthentication();
  }

  public get profileName() {
    if (this.auth.profile && this.auth.profile.given_name) {
      return this.auth.profile.given_name;
    } else if (this.auth.profile) {
      return 'User';
    }
  }

  ngOnInit() {
    this.pusherService.trackings$.subscribe(data => {
      const toast: Toast = {
        type: 'success',
        title: 'Tracking Pixel Viewed',
        body: `"${data.description}" tracking pixel viewed!`
      };
      this.toaster.pop(toast);

    });
  }
}
