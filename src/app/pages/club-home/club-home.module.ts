import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubHomePageRoutingModule } from './club-home-routing.module';

import { ClubHomePage } from './club-home.page';
import { ClubAboutComponent } from 'src/app/components/club/club-about/club-about.component';
import { ClubAdminComponent } from 'src/app/components/club/club-admin/club-admin.component';
import { ClubEventsComponent } from 'src/app/components/club/club-events/club-events.component';
import { ClubNewsComponent } from 'src/app/components/club/club-news/club-news.component';
import { SharedModule } from 'src/app/components/shared.module';
import { ClubHomeComponent } from 'src/app/components/club/club-home/club-home.component';
import { EventComponent } from 'src/app/components/cards/event/event.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubHomePageRoutingModule,
    SharedModule
  ],
  declarations: [ClubHomePage, ClubHomeComponent, ClubAboutComponent, ClubAdminComponent, ClubEventsComponent, ClubNewsComponent, EventComponent]
})
export class ClubHomePageModule {}
