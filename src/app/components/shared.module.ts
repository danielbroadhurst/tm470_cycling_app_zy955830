import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileFormComponent } from './forms/profile-form/profile-form.component';
import { ClubFormComponent } from './forms/club-form/club-form.component';
import { EventFormComponent } from './forms/event-form/event-form.component';
import { MapComponent } from './map/map.component';

@NgModule({
 imports:      [ CommonModule, IonicModule],
 declarations: [ ProfileFormComponent, ClubFormComponent, EventFormComponent, MapComponent ],
 exports:      [ ProfileFormComponent, ClubFormComponent, EventFormComponent, MapComponent,
                 CommonModule, FormsModule ]
})
export class SharedModule { }