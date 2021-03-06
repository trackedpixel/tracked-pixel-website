import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import { TrackingService, TrackingPixel } from './../tracking.service';
import { PusherService } from './../pusher.service';

@Component({
  selector: 'app-tracking-list',
  styleUrls: ['./tracking-list.component.css'],
  templateUrl: './tracking-list.component.html'
})

export class TrackingListComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public searchTerm = new FormControl();

  public filteredTrackings: TrackingPixel[] = [];
  public trackings: TrackingPixel[] = [];

  private sub1: Subscription;
  private sub2: Subscription;

  constructor(private trackingService: TrackingService, private pusherService: PusherService) { }

  public ngOnInit() {
    this.isLoading = true;

    this.sub2 = this.pusherService.trackings$
      .subscribe((data) => {
        const tracking = this.trackings.find(c => c._id === data.id);
        if (tracking) {
          tracking.trackingViews.push(data);
        }
      });

    this.sub1 = this.searchTerm.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => this.filterAll(term))
      .subscribe(items => this.filteredTrackings = items);

    this.trackingService.getTrackingPixels()
      .subscribe(trackings => {
        this.trackings = trackings;

        this.filterAll(this.searchTerm.value)
          .subscribe(items => this.filteredTrackings = items);

        this.isLoading = false;
      }, error => {
        console.error(error);
        this.isLoading = false;
      });
  }

  public ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  public clearSearchTerm() {
    this.searchTerm.setValue(null);
  }

  private filterAll(searchTerm: string): Observable<TrackingPixel[]> {

    const results = this.trackings.filter(r => this.filterSearchTerm(r, searchTerm));

    return Observable.of(results);
  }

  private filterSearchTerm(r: TrackingPixel, term: string) {
    if (!term) { return true; }

    term = term.toUpperCase();

    return r.description.toUpperCase().indexOf(term) !== -1;
  }

}
