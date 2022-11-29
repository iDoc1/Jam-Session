export function uncapitalize(string: string) {
    return string.charAt(0).toLowerCase() + string.slice(1)
}

export function capitalize(string: string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const sampleProfile = {
    "first_name": "Sample",
    "last_name": "Profile",
    "gender": {
        "id": 1,
        "gender": "Male"
    },
    "birth_date": "1969-06-28",
    "zipcode": "98102",
    "years_playing": 5,
    "level_of_commitment": {
        "id": 6,
        "level": "Just for Fun",
        "rank": 5
    },
    "seeking": [
        {
            "id": 6,
            "name": "vocals"
        },
        {
            "id": 8,
            "name": "guitar"
        }
    ],
    "instruments": [
        {
            "instrument": {
                "id": 5,
                "name": "drums"
            },
            "experience_level": {
                "id": 5,
                "level": "Advanced",
                "rank": 2
            }
        },
        {
            "instrument": {
                "id": 3,
                "name": "bass guitar"
            },
            "experience_level": {
                "id": 7,
                "level": "Intermediate",
                "rank": 4
            }
        }
    ],
    "genres": [
       {
            "id": 2,
            "genre": "rock"
        }
    ]
} 

export const defaultPost = {
    "comments": [
        {
            "id": 0,
            "user": 0,
            "user_profile_id": 0,
            "user_first_name": "Commenter",
            "user_last_name": "Name",
            "post": 0,
            "content": "Sample Comment",
            "comment_date": "2022-11-19T05:14:36.053206Z"
        }
    ],
    "content" : "Sample content body",
    "genres": [
        {
            "id": 2,
            "genre": "rock"
        },
        {
            "id": 3,
            "genre": "metal"
        },
        {
            "id": 4,
            "genre": "r&b"
        }
    ],
    "id": 0,
    "owner_user_id": 0,
    "owner_profile_id": 0,
    "owner_first_name": "Sample",
    "owner_last_name": "Name",
    "instruments": [
        {
            "id": 6,
            "name": "vocals"
        },
        {
            "id": 8,
            "name": "guitar"
        },
        {
            "id": 11,
            "name": "brass"
        }
    ],
    "posted_date": "2022-11-19T05:13:44.853348Z",
    "seeking": "musicians",
    "title": "Sample Post Title",
    "user": 0,
    "zipcode": "99999",
    "city": "City",
    "state": "State"
}

export const seekingOptions = [
    'Musician looking for band',
    'Band looking for members'
]