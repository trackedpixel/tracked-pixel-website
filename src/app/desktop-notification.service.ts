import { Injectable } from '@angular/core';
import { PusherService } from './pusher.service';

@Injectable()
export class DesktopNotificationService {

  constructor(private pusherService: PusherService) { }

  public init() {
    this.pusherService.trackings$.subscribe(data => {
      this.createNotification(data.description);
    });
  }

  private sendNotification(description: string) {
    // const img = '/to-do-notifications/img/icon-128.png';
    const notification = new Notification('Tracking Pixel Viewed', { body: `${description} has been viewed!` });
    window.navigator.vibrate(500);
  }

  // function for creating the notification
  private createNotification(description: string) {

    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
      return;
    }

    // Let's check if the user is okay to get some notification
    if (Notification['permission'] === 'granted') {

      // If it's okay let's create a notification
      this.sendNotification(description);

    } else if (Notification['permission'] !== 'denied') {

      // Otherwise, we need to ask the user for permission
      // Note, Chrome does not implement the permission static property
      // So we have to check for NOT 'denied' instead of 'default'
      Notification.requestPermission(function (permission) {

        // Whatever the user answers, we make sure Chrome stores the information
        if (!('permission' in Notification)) {
          Notification['permission'] = permission;
        }

        // If the user is okay, let's create a notification
        if (permission === 'granted') {
          this.sendNotification(description);
        }
      });
    }
  }

}
