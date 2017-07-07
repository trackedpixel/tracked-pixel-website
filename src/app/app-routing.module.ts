import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingListComponent } from './tracking-list';
import { TrackingDetailComponent } from './tracking-detail';
import { TrackingNewComponent } from './tracking-new';
import { CallbackComponent } from './callback';
import { HomeComponent } from './home';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'trackings', component: TrackingListComponent, canActivate: [AuthGuard]  },
  { path: 'trackings/new', component: TrackingNewComponent, canActivate: [AuthGuard]  },
  { path: 'trackings/:id', component: TrackingDetailComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
