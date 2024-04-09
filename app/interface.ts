export interface Movie {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  name: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  first_air_date: string
  video: boolean
  vote_average: number
  vote_count: number
  runtime: number
}
export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface Trailer {
  id: string
  key: string
  name: string
  type: string
}

export interface Genre {
  id: number
  name: string
}
