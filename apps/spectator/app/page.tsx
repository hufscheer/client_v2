import { Skeleton } from '@hcc/ui';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Fragment, ReactElement } from 'react';

import { GAME_STATE } from '@/constants/configs';
import { useLeaguesPrefetch } from '@/queries/useLeague';
import { useLeagueDetailPrefetch } from '@/queries/useLeagueDetail';
import { useLeagueTeamsPrefetch } from '@/queries/useLeagueTeams';
import { useSportsPrefetch } from '@/queries/useSports';
import { GameState } from '@/types/game';

import LeagueFilter from './_components/GameFilter/LeagueFilter';
import LeagueTeamFilter from './_components/GameFilter/LeagueTeamFilter';
import RoundFilter from './_components/GameFilter/RoundFilter';
import SportFilter from './_components/GameFilter/SportFilter';
import GameList from './_components/GameList';
import getQueryClient from './getQueryClient';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
  const year = Number(searchParams.year) || dayjs().year();
  const queryClient = getQueryClient();
  const leagues = await useLeaguesPrefetch(year);
  const inProgress =
    leagues.find(league => league.isInProgress) || leagues?.[0];
  const initialLeagueId = Number(searchParams.league) || inProgress?.leagueId;

  const leagueDetail = await useLeagueDetailPrefetch(initialLeagueId);
  const currentRound =
    Number(searchParams.round) || leagueDetail.inProgressRound;

  await useLeagueTeamsPrefetch(initialLeagueId, currentRound);
  await useSportsPrefetch(initialLeagueId);

  return (
    <Fragment>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LeagueFilter year={year} />
        {initialLeagueId && <SportFilter leagueId={initialLeagueId} />}
        {initialLeagueId && <RoundFilter initialLeagueId={initialLeagueId} />}
        {initialLeagueId && (
          <LeagueTeamFilter leagueId={initialLeagueId} round={currentRound} />
        )}
      </HydrationBoundary>

      {GAMES.map(game => (
        <GameList
          key={game.key}
          state={game.key}
          initialLeagueId={initialLeagueId.toString()}
        />
      ))}
    </Fragment>
  );
}

type Games = {
  key: GameState;
  loadingFallback: ReactElement;
};

const GAMES: Games[] = [
  {
    key: GAME_STATE.PLAYING,
    loadingFallback: <Skeleton />,
  },
  {
    key: GAME_STATE.SCHEDULED,
    loadingFallback: <Skeleton />,
  },
  {
    key: GAME_STATE.FINISHED,
    loadingFallback: <Skeleton />,
  },
];
