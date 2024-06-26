import { gql } from "@apollo/client";

///  listado de episodeos
export const EPISODES_TMDB = gql`
  query ($episodesTmdbId: Int!, $season: Int!, $infoSeriesId: String!) {
    episodesTmdb(id: $episodesTmdbId, season: $season) {
      season_number
      episodes {
        episode_number
        name
        overview
        still_path
        runtime
        air_date
      }
    }

    infoSeries(id: $infoSeriesId) {
      episodes {
        season
        episodes {
          episode
          id
          release
        }
      }
    }
  }
`;

///  get las episode
export const GET_LAST_EPISODES = gql`
  query {
    lastEpisodes {
      id
      title
      poster
      year
    }
  }
`;

///   obteniendo peliculas por generos
export const MOVIES_BY_GENERES = gql`
  query ($type: Int!, $page: Int!, $detall: Int!) {
    AllPeliculas(type: $type, page: $page, detall: $detall) {
      title
      id
      poster
    }
  }
`;

export const ALL_SERIE = gql`
  query ($page: Int!) {
    AllSeries(page: $page) {
      genres
      title
      id
      poster
    }
  }
`;

export const INFO_Peliculas = gql`
  query ($infoMoviesId: String!) {
    infoMovies(id: $infoMoviesId) {
      info1 {
        backdrop_path
        id
        overview
        title
        video
        popularity
        release_date
      }
      info2 {
        poster
        backdrop_path
        title
        release_date
      }

      recomendado {
        poster
        title
        id
        genres
      }

      reparto {
        name
        id
        profile_path
        popularity
      }

      trailer {
        url
      }
    }
  }
`;

export const INFO_SERIES = gql`
  query ($infoMoviesId: String!) {
    infoSeries(id: $infoMoviesId) {
      info1 {
        backdrop_path
        id
        overview
        title
        video
        popularity
        release_date
      }
      info2 {
        poster
        backdrop_path
        title
        release_date
      }
      episodes {
        season
        episodes {
          id
          preview
          release
          episode
        }
      }

      trailer {
        url
      }
    }
  }
`;
