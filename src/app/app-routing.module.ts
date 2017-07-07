import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingListComponent } from './tracking-list';
import { TrackingDetailComponent } from './tracking-detail';
import { TrackingNewComponent } from './tracking-new';
import { CallbackComponent } from './callback';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'trackings', component: TrackingListComponent },
  { path: 'trackings/new', component: TrackingNewComponent },
  { path: 'trackings/:id', component: TrackingDetailComponent },
  { path: '', redirectTo: 'trackings', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
