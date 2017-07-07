import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { AuthService } from './auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { TrackingNewComponent } from './tracking-new/tracking-new.component';
import { TrackingService } from './tracking.service';
import { HighlightPipe } from './highlight.pipe';
import { CallbackComponent } from './callback/callback.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    TrackingListComponent,
    TrackingDetailComponent,
    TrackingNewComponent,
    HighlightPipe,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ClipboardModule
  ],
  providers: [
    TrackingService,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
