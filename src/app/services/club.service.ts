import { Injectable } from '@angular/core';
import { CyclingClub } from '../classes/cyclingClub';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  cyclingClub: CyclingClub;

  constructor() { }

  getCyclingClub() {
    return this.cyclingClub;
  }

  setCyclingClub(club: CyclingClub) {
    this.cyclingClub = club;
  }

  clearCyclingClub() {
    this.cyclingClub = new CyclingClub(null,null,null,null,null,null,null,null)
  }
}
