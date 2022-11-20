// Interfaces that might get reused in other components should go in this file for easier access

export interface Gender {
    id:number,
    gender:string
}

export interface Genres{
    id:number,
    genre:string
}

export interface Instrument{
    id:number,
    name:string,
    children?:any

}
export interface ExperienceLevel {
    id:number,
    rank:number,
    level:string
}
export interface Instruments {
    experience_level:ExperienceLevel
    instrument:Instrument,
    children?:any
}
export interface CommitmentLevel{
    id: number,
    level: string,
    rank:number
}
export interface ProfilePicture {
    id: number,
    user: number,
    created_date: string,
    image_file: string,
}
export interface Profile {
    id: number,
    first_name: string,
    last_name: string,
    zipcode: string,
    city: string,
    state: string,
    profile_picture: ProfilePicture,
    music_samples: any,
    birth_date: string,
    gender: Gender | null,
    genres: Genres[],
    instruments: Instruments[],
    level_of_commitment: CommitmentLevel | null,
    years_playing: number,
    join_date: string,
    seeking: Instrument[]
}

export interface SocialMedia {
    id: number,
    user: number,
    social_media_site: string,
    social_media_link: string
}

export interface Post {
    comments: any,
    content: string,
    genres: Genres[],
    id: number,
    owner_user_id: number,
    owner_profile_id: number,
    owner_first_name: string,
    owner_last_name: string,
    instruments: Instruments[],
    posted_date: string,
    seeking: string,
    title: string,
    user: number,
    zipcode: string,
    city: string,
    state: string
}

export interface IndividualComment {
    id: number,
    user: number,
    user_profile_id: number,
    user_first_name: string,
    user_last_name: string,
    post: number,
    content: string,
    comment_date: string
}