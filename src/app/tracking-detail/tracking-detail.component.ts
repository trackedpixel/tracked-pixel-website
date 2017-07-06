import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { TrackingService, TrackingPixel } from './../tracking.service';

@Component({
  selector: 'app-tracking-detail',
  styleUrls: ['./tracking-detail.component.css'],
  templateUrl: 'tracking-detail.component.html'
})
export class TrackingDetailComponent implements OnInit, OnDestroy {

  public trackingPixel: TrackingPixel;
  public isLoading = true;

  private sub1: Subscription;

  constructor(
    private trackingService: TrackingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params.subscribe(params => {
      this.isLoading = true;

      this.trackingService.getTrackingPixelById(params.id)
        .subscribe(c => {
          this.trackingPixel = c;
          this.isLoading = false;
        }, err => {
          console.error('unable to find item', err);
          this.router.navigate(['/trackings']);
        });
    });

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
