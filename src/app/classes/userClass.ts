import { Profile } from './profile';
import { CyclingClub } from './cyclingClub';

export class User {
    event_attendee: Array<CyclingClub>;

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
  