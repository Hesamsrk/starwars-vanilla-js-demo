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
export const getMovieByID = async (id: number) => Fetch<MovieResponse>(`${Config.Services.swapi.baseURL}/films/${id}`)
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
* The data structure of Starship response received from server
*
* */
export interface StarshipOT {
    name: string,
    model: string,
    manufacturer: string,
    cost_in_credits: string,
    length: string,
    max_atmosphering_speed: string,
    crew: string,
    passengers: string,
    cargo_capacity: string
}

// Fetches the Starship data with the given ID:
export const getStarshipByID = async (id: number) => Fetch<StarshipOT>(`${Config.Services.swapi.baseURL}/starships/${id}`)
    .then(({
               name,
               model,
               manufacturer,
               cost_in_credits,
               length,
               max_atmosphering_speed,
               crew,
               passengers,
               cargo_capacity
           }
    ) => ({
            name,
            model,
            manufacturer,
            cost_in_credits,
            length,
            max_atmosphering_speed,
            crew,
            passengers,
            cargo_capacity
        }
    ))