import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';
import { environment } from './../environments/environment';

declare const Pusher: any;

@Injectable()
export class PusherService {

  private pusher: any;
  private pusherSubject: Subject<any> = new Subject<any>();

  get trackings$(): Observable<any> {
    return new Observable(fn => this.pusherSubject.subscribe(fn));
  }

  constructor(private auth: AuthService) {
    this.init();
  }

  init() {
    this.pusher = new Pusher(environment.pusherKey, {
      cluster: environment.pusherCluster,
      authEndpoint: environment.pusherAuthUri
    });

    const channelName = 'private-' + this.auth.profile.sub.replace('|', '_');

    const channel = this.pusher.subscribe(channelName);

    channel.bind('tracking-pixel-update', (data) => {

      this.pusherSubject.next(data);
    });

  }
}
