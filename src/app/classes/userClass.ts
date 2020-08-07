import { Profile } from './profile';
import { CyclingClub } from './cyclingClub';
import { ClubEvent } from './club-event';

export class User {
    event_attendee: Array<ClubEvent>;

    constructor(
      public id: number,
      public first_name: string,
      public last_name: string,
      public email: string,
      public user_profile: Profile,
      public cycling_club_admin: Array<CyclingClub>,
      public cycling_club_member: Array<CyclingClub>
    ) {  }
  
  }
  