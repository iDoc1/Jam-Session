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
export interface Profile {
    id: number,
    first_name: string,
    last_name: string,
    zipcode: string,
    city: string,
    state: string,
    profile_picture_url: string | null,
    birth_date: string,
    gender: Gender,
    genres: Genres[],
    instruments: Instruments[],
    level_of_commitment: CommitmentLevel,
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