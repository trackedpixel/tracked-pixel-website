import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';
import { environment } from './../environments/environment';

declare const Pusher: any;

export interface PusherNotification {
  description: string,
  id: string;
}

@Injectable()
export class PusherService {

  private pusher: any;
  private pusherSubject: Subject<PusherNotification> = new Subject<PusherNotification>();

  get trackings$(): Observable<PusherNotification> {
    return new Observable(fn => this.pusherSubject.subscribe(fn));
  }

  constructor(private auth: AuthService) { }

  public init() {
    this.auth.user$.distinctUntilChanged().subscribe(user => {
      if (this.pusher) {
        this.pusher.disconnect();
        this.pusher = null;
      }

      if (!user) {
        return;
      }

      this.pusher = new Pusher(environment.pusherKey, {
        cluster: environment.pusherCluster,
        authEndpoint: environment.pusherAuthUri
      });

      const channelName = 'private-' + user.sub.replace('|', '_');

      const channel = this.pusher.subscribe(channelName);

      channel.bind('tracking-pixel-update', (data) => {

        this.pusherSubject.next(data);
      });
    });
  }
}
