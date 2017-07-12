import { Component, OnInit, OnDestroy } from '@angular/core';

import { ToasterService, Toast } from 'angular2-toaster';

import { AuthService } from './auth.service';
import { environment } from './../environments/environment';

declare const Pusher: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public isCollapsed = true;
  private pusher: any;

  constructor(public auth: AuthService, private toaster: ToasterService) {
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
    this.pusher = new Pusher(environment.pusherKey, {
      cluster: environment.pusherCluster,
      authEndpoint: environment.pusherAuthUri
    });

    const channelName = 'private-' + this.auth.profile.sub.replace('|', '_');

    const channel = this.pusher.subscribe(channelName);
    channel.bind('tracking-pixel-update', (data) => {
      const toast: Toast = {
        type: 'success',
        title: 'Tracking Pixel Viewed',
        body: `"${data.description}" tracking pixel viewed!`
      };
      this.toaster.pop(toast);
    });
  }

  ngOnDestroy() {
    this.pusher.disconnect();
  }
}
