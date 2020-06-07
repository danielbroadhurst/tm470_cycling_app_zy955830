import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubsPageRoutingModule } from './clubs-routing.module';

import { ClubsPage } from './clubs.page';
import { ClubsCreateComponent } from 'src/app/components/clubs/clubs-create/clubs-create.component';
import { ClubsHomeComponent } from 'src/app/components/clubs/clubs-home/clubs-home.component';
import { ClubsComponent } from 'src/app/components/clubs/clubs/clubs.component';
import { ClubFormComponent } from 'src/app/components/forms/club-form/club-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubsPageRoutingModule
  ],
  declarations: [ClubsPage, ClubsCreateComponent, ClubsHomeComponent, ClubsComponent, ClubFormComponent]
})
export class ClubsPageModule {}
