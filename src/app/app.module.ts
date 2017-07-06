import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { TrackingDetailComponent } from './tracking-detail/tracking-detail.component';
import { TrackingNewComponent } from './tracking-new/tracking-new.component';
import { TrackingService } from './tracking.service';

@NgModule({
  declarations: [
    AppComponent,
    TrackingListComponent,
    TrackingDetailComponent,
    TrackingNewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [TrackingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
