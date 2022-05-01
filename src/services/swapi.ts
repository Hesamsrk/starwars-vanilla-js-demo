import {Config} from "../config";
import {Fetch} from "../utils";

export interface MovieOT {
    title: string
    episode_id: number
    starships: string[]
}


export const getMovieByID = async (id: number) => Fetch<MovieOT>(`${Config.Services.swapi.baseURL}/films/${id}`)
    .then(({
               starships,
               episode_id,
               title
           }) => ({
        starships,
        episode_id,
        title
    }))


export const getStarshipByID = async (id: number) => Fetch<MovieOT>(`${Config.Services.swapi.baseURL}/starships/${id}`)