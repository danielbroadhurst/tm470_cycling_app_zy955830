import { Injectable } from '@angular/core';
import { CyclingClub } from '../classes/cyclingClub';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  selectedClub: string;
  cyclingClub: CyclingClub;
  userGroup: string;

  constructor() { }

  setSelectedClub(id: string) {
    this.selectedClub = id;
  }

  getSelectedClub() {
    return this.selectedClub;
  }

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
    this.selectedClub = null;
  }
}
