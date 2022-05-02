import {Config} from "../config";
import {Fetch} from "../utils";

export interface MovieOT {
    title: string
    episode_id: number
    starships: number[]
}

export interface MovieResponse {
    title: string
    episode_id: number
    starships: string[]
}


const STARSHIP_REGEX = /https:\/\/swapi\.dev\/api\/starships\/([0-9]*)\//
export const getMovieByID = async (id: number) => Fetch<MovieResponse>(`${Config.Services.swapi.baseURL}/films/${id}`)
    .then(({
               starships,
               episode_id,
               title
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
        title
    }))


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