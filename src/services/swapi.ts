import {Config} from "../config";
import {Fetch} from "../utils";

/*
* MovieResponse wrapped into some other format  for ease of use (Starship links are parsed into ID numbers)
*
* */
export interface MovieOT {
    title: string
    episode_id: number
    release_date: string
    starships: number[]
}

/*
* The data structure of Movie response received from server
*
* */
export interface MovieResponse {
    title: string
    episode_id: number
    release_date: string
    starships: string[]
}

// The regex which we used to replace starship links with starship IDs.
const STARSHIP_REGEX = /https:\/\/swapi\.dev\/api\/starships\/([0-9]*)\//

// Fetches the Movie data with the given ID and parses the data to MovieOT:
export const getMovieByID = async (id: number): Promise<MovieOT> => Fetch<MovieResponse>(`${Config.Services.swapi.baseURL}/films/${id}`)
    .then(({
               starships,
               episode_id,
               title,
               release_date
           }) => ({
        starships: starships.map(item => {
            const result = STARSHIP_REGEX.exec(item)
            if (result) {
                return Number(result[1])
            } else {
                return undefined
            }
        }).filter(item => item !== undefined) as number[],
        episode_id,
        title,
        release_date
    }))


/*
* StarshipResponse wrapped into some other format  for ease of use (Movie links are parsed into ID numbers)
*
* */
export interface StarshipOT {
    name: string,
    model: string,
    manufacturer: string,
    crew: string,
    passengers: string,
    films: number[]
}

/*
* The data structure of Starship response received from server
*
* */
export interface StarshipResponse {
    name: string,
    model: string,
    manufacturer: string,
    crew: string,
    passengers: string,
    films: string[]
}


// The regex which we used to replace film links with film IDs.
const MOVIE_REGEX = /https:\/\/swapi\.dev\/api\/films\/([0-9]*)\//
// Fetches the Starship data with the given ID:
export const getStarshipByID = async (id: number): Promise<StarshipOT> => Fetch<StarshipResponse>(`${Config.Services.swapi.baseURL}/starships/${id}`)
    .then(({
               name,
               model,
               manufacturer,
               crew,
               passengers,
               films
           }
    ) => ({
            name,
            model,
            manufacturer,
            crew,
            passengers,
            films: films.map(item => {
                const result = MOVIE_REGEX.exec(item)
                if (result) {
                    return Number(result[1])
                } else {
                    return undefined
                }
            }).filter(item => item !== undefined) as number[],
        }
    ))