import { TestBed, inject } from '@angular/core/testing';

import { DesktopNotificationService } from './desktop-notification.service';

describe('DesktopNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesktopNotificationService]
    });
  });

  it('should be created', inject([DesktopNotificationService], (service: DesktopNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
