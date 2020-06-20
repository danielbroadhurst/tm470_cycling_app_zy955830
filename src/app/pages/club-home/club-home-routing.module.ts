import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubHomePage } from './club-home.page';
import { ClubAboutComponent } from 'src/app/components/club/club-about/club-about.component';
import { ClubEventsComponent } from 'src/app/components/club/club-events/club-events.component';
import { ClubNewsComponent } from 'src/app/components/club/club-news/club-news.component';
import { ClubHomeComponent } from 'src/app/components/club/club-home/club-home.component';
import { ClubAdminComponent } from 'src/app/components/club/club-admin/club-admin.component';
import { ClubAdmin } from 'src/app/services/club-admin.service';

const routes: Routes = [
  {
    path: '',
    component: ClubHomePage,
    children: [
      {
        path: '', 
      },
      {
        path: 'home',
        component: ClubHomeComponent
      },
      {
        path: 'about',
        component: ClubAboutComponent
      },
      {
        path: 'events',
        component: ClubEventsComponent
      },
      {
        path: 'news',
        component: ClubNewsComponent
      },
      {
        path: 'admin',
        canActivate: [ClubAdmin],
        component: ClubAdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubHomePageRoutingModule {}
