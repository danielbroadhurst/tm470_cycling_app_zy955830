import { Profile } from './profile';

export class User {

    constructor(
      public id: number,
      public firstName: string,
      public lastName: string,
      public email: string,
      public userProfile: Profile[],
    ) {  }
  
  }
  