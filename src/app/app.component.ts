import { Component, OnInit } from '@angular/core';

import { ToasterService, Toast } from 'angular2-toaster';

import { AuthService } from './auth.service';
import { PusherService } from './pusher.service';
import { DesktopNotificationService } from './desktop-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isCollapsed = true;

  constructor(
    public auth: AuthService,
    private toaster: ToasterService,
    public desktopNotification: DesktopNotificationService,
    private pusherService: PusherService
  ) {

    pusherService.init();
    auth.handleAuthentication();
  }

  public toggleDesktopNotifications() {
    if (this.desktopNotification.isOn) {
      this.desktopNotification.off();
    } else {
      this.desktopNotification.on();
    }
  }

  public get profileName() {
    if (this.auth.currentUser && this.auth.currentUser.given_name) {
      return this.auth.currentUser.given_name;
    } else if (this.auth.currentUser) {
      return 'User';
    }
  }

  ngOnInit() {
    this.pusherService.trackings$.subscribe(data => {

      if (!this.desktopNotification.isOn) {
        const toast: Toast = {
          type: 'success',
          title: 'Tracking Pixel Viewed',
          body: `"${data.description}" tracking pixel viewed!`
        };
        this.toaster.pop(toast);
      }

    });
  }
}
