import { ClubEvent } from './club-event';

export class CyclingClub {

    constructor(
        public bio: string,
        public club_name: string,
        public country: string,
        public preferred_style: string,
        public profile_picture: string,
        public city: string,
        public id?: number,
        public country_short?: string,
        public county?: string,
        public lat?: number,
        public lng?: number,
        public events?: ClubEvent[],
        public distanceToUser?: string,
        public members?: number,
        public admin?: string
    ) { }
}
