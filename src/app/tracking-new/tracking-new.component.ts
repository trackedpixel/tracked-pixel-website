import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TrackingService, TrackingPixel } from './../tracking.service';

@Component({
  selector: 'app-tracking-new',
  styleUrls: ['./tracking-new.component.css'],
  templateUrl: 'tracking-new.component.html'
})

export class TrackingNewComponent implements OnInit {
  public newTrackingPixel: TrackingPixel;
  public trackingForm: FormGroup;

  constructor(
    private trackingService: TrackingService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.trackingForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  create() {
    if (!this.trackingForm.valid) {
      return;
    }

    const trackingPixel: TrackingPixel = {
      description: this.trackingForm.value.description
    };

    this.trackingService.createNewTrackingPixel(trackingPixel)
      .subscribe(c => {
        this.newTrackingPixel = c;
        this.trackingForm.setValue({ description: '' });
      });
  }
}
