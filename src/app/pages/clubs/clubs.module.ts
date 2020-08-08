import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubsPageRoutingModule } from './clubs-routing.module';

import { ClubsPage } from './clubs.page';
import { ClubsCreateComponent } from 'src/app/components/clubs/clubs-create/clubs-create.component';
import { ClubsHomeComponent } from 'src/app/components/clubs/clubs-home/clubs-home.component';
import { ClubsComponent } from 'src/app/components/clubs/clubs-view/clubs.component';
import { SharedModule } from 'src/app/components/shared.module';
import { ClubComponent } from 'src/app/components/cards/club/club.component';
import { SearchComponent } from 'src/app/components/search/search.component';

import {Geolocation} from '@ionic-native/geolocation/ngx'
import { EventMapComponent } from 'src/app/components/event-map/event-map.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubsPageRoutingModule,
    SharedModule
  ],
  declarations: [ClubsPage, ClubsCreateComponent, ClubsHomeComponent, ClubsComponent, ClubComponent, SearchComponent, EventMapComponent],
  providers: [Geolocation]
})
export class ClubsPageModule {}