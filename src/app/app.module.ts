import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
  providers: [TrackingService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
