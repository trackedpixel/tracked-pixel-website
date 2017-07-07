import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthHttp } from 'angular2-jwt';

import { environment } from './../environments/environment';

export interface TrackingPixel {
  description: string;
  imageUrl?: string;
}

@Injectable()
export class TrackingService {
  constructor(private http: AuthHttp) { }

  getTrackingPixels(): Observable<TrackingPixel[]> {
    return this.http.get(environment.apiUrl + '/trackings')
      .map(c => c.json());
  }

  getTrackingPixelById(id: string): Observable<TrackingPixel> {
    return this.http.get(environment.apiUrl + '/trackings/' + id)
      .map(c => c.json());
  }

  createNewTrackingPixel(trackingPixel: TrackingPixel): Observable<TrackingPixel> {
    return this.http.post(environment.apiUrl + '/trackings', trackingPixel)
      .map(c => c.json());
  }
}
