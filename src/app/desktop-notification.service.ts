import { Injectable } from '@angular/core';
import { PusherService } from './pusher.service';

@Injectable()
export class DesktopNotificationService {

  public isOn = false;

  constructor(private pusherService: PusherService) {
    this.subscribeToPusherService();
  }

  public on() {
    // if this is already on, end early
    if (this.isOn) { return; }

    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
      return;
    }

    if (Notification['permission'] === 'granted') {
      this.isOn = true;

    } else if (Notification['permission'] !== 'denied') {

      this.requestNotification()
        .then(() => {
          // Whatever the user answers, we make sure Chrome stores the information
          if (!('permission' in Notification)) {
            Notification['permission'] = 'granted';
          }

          this.isOn = true;
        });
    }
  }

  public off() {
    this.isOn = false;
  }

  private requestNotification(): Promise<string> {
    return new Promise((resolve, reject) => {
      Notification.requestPermission((permission: string) => {
        if (permission === 'granted') {
          resolve(permission);
        } else {
          reject(permission);
        }
      });
    });
  }

  private subscribeToPusherService() {
    this.pusherService.trackings$.subscribe(data => {
      if (this.isOn) {
        this.sendNotification(data.description);
      }
    });
  }

  private sendNotification(description: string) {
    // const img = '/to-do-notifications/img/icon-128.png';
    const notification = new Notification('Tracking Pixel Viewed', { body: `${description} has been viewed!` });
    window.navigator.vibrate(500);
  }
}
