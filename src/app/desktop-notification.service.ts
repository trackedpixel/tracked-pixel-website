import { Injectable } from '@angular/core';
import { PusherService } from './pusher.service';

@Injectable()
export class DesktopNotificationService {

  constructor(private pusherService: PusherService) { }

  public init() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
      return;
    }

    if (Notification['permission'] === 'granted') {
      this.subscribeToPusherService();

    } else /*if (Notification['permission'] !== 'denied')*/ {

      Notification.requestPermission((permission) => {
        // Whatever the user answers, we make sure Chrome stores the information
        if (!('permission' in Notification)) {
          Notification['permission'] = permission;
        }

        if (permission === 'granted') {
          this.subscribeToPusherService();
        }
      });
    }
  }

  private subscribeToPusherService() {
    this.pusherService.trackings$.subscribe(data => {
      this.sendNotification(data.description);
    });
  }

  private sendNotification(description: string) {
    // const img = '/to-do-notifications/img/icon-128.png';
    const notification = new Notification('Tracking Pixel Viewed', { body: `${description} has been viewed!` });
    window.navigator.vibrate(500);
  }
}
