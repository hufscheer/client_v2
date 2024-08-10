import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { TeamCreateType } from '../types';

type Request = {
  leagueId: string;
  team: TeamCreateType;
};

const postCreateLeagueTeam = ({ leagueId, team }: Request) =>
  fetcher.post<void>(`/leagues/${leagueId}/teams`, { ...team });

const useCreateLeagueTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateLeagueTeam,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.leagueTeams(variables.leagueId).queryKey,
      });
    },
  });
};

export default useCreateLeagueTeam;
