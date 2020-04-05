export class Profile {

    constructor(
        public gender: string,
        public date_of_birth: Date,
        public bio: string,
        public town: string,
        public region: string,
        public country: string,
        public current_bike: string,
        public preferred_style: string,
        public profile_picture: string
    ) { }
}
