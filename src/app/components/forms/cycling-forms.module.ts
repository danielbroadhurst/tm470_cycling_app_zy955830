import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ClubFormComponent } from './club-form/club-form.component';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ ProfileFormComponent, ClubFormComponent ],
 exports:      [ ProfileFormComponent, ClubFormComponent,
                 CommonModule, FormsModule ]
})
export class CyclingFormsModule { }