import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileFormComponent } from './forms/profile-form/profile-form.component';
import { ClubFormComponent } from './forms/club-form/club-form.component';
import { EventFormComponent } from './forms/event-form/event-form.component';
import { EventMapComponent } from './event-map/event-map.component';
import { MapElevationComponent } from './map-elevation/map-elevation.component';

@NgModule({
 imports:      [ CommonModule, IonicModule],
 declarations: [ ProfileFormComponent, ClubFormComponent, EventFormComponent, EventMapComponent, MapElevationComponent ],
 exports:      [ ProfileFormComponent, ClubFormComponent, EventFormComponent, EventMapComponent, MapElevationComponent,
                 CommonModule, FormsModule ]
})
export class SharedModule { }