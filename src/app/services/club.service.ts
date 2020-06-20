import { Injectable } from '@angular/core';
import { CyclingClub } from '../classes/cyclingClub';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  cyclingClub: CyclingClub;
  userGroup: string;

  constructor() { }

  getCyclingClub() {
    return this.cyclingClub;
  }

  setCyclingClub(club: CyclingClub) {
    this.cyclingClub = club;
  }

  getUserGroup() {
    return this.userGroup;
  }

  setUserGroup(userGroup: string) {
    this.userGroup = userGroup;
  }

  clearCyclingClub() {
    this.cyclingClub = new CyclingClub(null,null,null,null,null,null,null,null);
    this.userGroup = null;
  }
}
