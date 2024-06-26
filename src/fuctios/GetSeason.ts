interface Episode {
  season: number;
  episodes: {
    episode: string;
    id: string;
    release: string;
  }[];
}

export function getSeasons(episodes: Episode[]): number[] {
  const seasons = episodes?.map((episode) => episode.season);
  return seasons ? [...new Set(seasons)] : [];
}
