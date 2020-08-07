import { User } from './userClass';

export class ClubEvent {
    constructor(
        public cycling_club_id: number,
        public event_name: string,
        public description: string,
        public event_date: string,
        public start_time: string,
        public start_address: string,
        public city: string,
        public profile_picture: string,
        public id?: number,
        public country?: string,
        public difficulty?: string,
        public country_short?: string,
        public county?: string,
        public lat?: number,
        public lng?: number,
        public distanceToUser?: string,
        public attendees?: User[]
    ) { }
}
