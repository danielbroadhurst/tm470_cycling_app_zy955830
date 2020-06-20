import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubsPage } from './clubs.page';
import { ClubsHomeComponent } from 'src/app/components/clubs/clubs-home/clubs-home.component';
import { ClubsCreateComponent } from 'src/app/components/clubs/clubs-create/clubs-create.component';
import { ClubsComponent } from 'src/app/components/clubs/clubs-view/clubs.component';

const routes: Routes = [
  {
    path: '',
    component: ClubsPage,
    children: [
      {
        path: '', 
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: ClubsHomeComponent
      },
      {
        path: 'create-club',
        component: ClubsCreateComponent
      },
      {
        path: 'your-clubs',
        component: ClubsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubsPageRoutingModule {}
