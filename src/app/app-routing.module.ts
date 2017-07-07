import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingListComponent } from './tracking-list';
import { TrackingDetailComponent } from './tracking-detail';
import { TrackingNewComponent } from './tracking-new';

const routes: Routes = [
  { path: 'trackings', component: TrackingListComponent },
  { path: 'trackings/new', component: TrackingNewComponent },
  { path: 'trackings/:id', component: TrackingDetailComponent },
  { path: '', redirectTo: 'trackings', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
