import { Component, OnInit } from '@angular/core';

import { TrackingService, TrackingPixel } from './../tracking.service';

@Component({
  selector: 'app-tracking-list',
  styleUrls: ['./tracking-list.component.css'],
  templateUrl: './tracking-list.component.html'
})

export class TrackingListComponent implements OnInit {
  public isLoading = true;
  public trackings: TrackingPixel[] = [];

  constructor(private trackingService: TrackingService) { }

  ngOnInit() {
    this.isLoading = true;

    this.trackingService.getTrackingPixels()
      .subscribe(trackings => {
        this.trackings = trackings;
        this.isLoading = false;
      }, error => {
        console.error(error);
        this.isLoading = false;
      });
  }
}
