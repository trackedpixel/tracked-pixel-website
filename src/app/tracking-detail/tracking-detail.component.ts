import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { TrackingService, TrackingPixel } from './../tracking.service';
import { PusherService } from './../pusher.service';

@Component({
  selector: 'app-tracking-detail',
  styleUrls: ['./tracking-detail.component.css'],
  templateUrl: 'tracking-detail.component.html'
})
export class TrackingDetailComponent implements OnInit, OnDestroy {

  public trackingPixel: TrackingPixel;
  public isLoading = true;

  private sub1: Subscription;
  private sub2: Subscription;

  constructor(
    private trackingService: TrackingService,
    private pusherService: PusherService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params.subscribe(params => this.loadTrackings(params.id));

    this.sub2 = this.pusherService.trackings$
      .filter(data => this.trackingPixel != null && data.id === this.trackingPixel._id)
      .subscribe((data) => this.loadTrackings(data.id));
  }

  loadTrackings(id) {
    this.isLoading = true;

    this.trackingService.getTrackingPixelById(id)
      .subscribe(c => {
        this.trackingPixel = c;
        this.isLoading = false;
      }, err => {
        console.error('unable to find item', err);
        this.router.navigate(['/trackings']);
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  delete() {
    this.trackingService.delete(this.trackingPixel._id)
      .subscribe(() => {
        this.router.navigate(['/trackings']);
      }, (err) => {
        console.error('error deleting tracking', err);
      });
  }
}
