'use client';

import { Button, Flex } from '@mantine/core';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { MouseEvent, useState } from 'react';

import AddButton from '@/components/AddButton';
import Card from '@/components/Card';
import Layout from '@/components/Layout';
import useDeleteLeagueTeamMutation from '@/hooks/mutations/useDeleteLeagueTeamMutation';
import useLeagueTeamQuery from '@/hooks/queries/useLeagueTeamQuery';

import LeagueTeamActionIcon from './_components/ActionIcon';

export default function Page() {
  const [edit, setEdit] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const leagueId = params.leagueId as string;

  const { data: leagueTeams, refetch } = useLeagueTeamQuery(leagueId);
  const { mutate: deleteLeagueTeam } = useDeleteLeagueTeamMutation();
  if (!leagueTeams) return null;

  const handleClickCard = async (
    e: MouseEvent<HTMLButtonElement>,
    teamId: string,
  ) => {
    if (!edit) return;

    e.preventDefault();
    deleteLeagueTeam(teamId, {
      onSuccess: () => refetch(),
    });

    alert('삭제되었습니다.');
  };

  const handleClickMenuButton = () => {
    setEdit(prev => !prev);
  };

  return (
    <Layout
      navigationTitle="대회 팀 관리"
      navigationMenu={
        <Button variant="subtle" onClick={handleClickMenuButton}>
          {edit ? '완료' : '편집'}
        </Button>
      }
    >
      <AddButton
        component={Link}
        href={{
          pathname: `${pathname}register`,
        }}
      >
        신규 대회 팀 추가
      </AddButton>
      <Flex direction="column" mt="xs" gap="xs">
        {leagueTeams.length > 0 ? (
          leagueTeams.map(team => (
            <Card.Root key={team.id} paddingVertical="sm">
              <Card.Content component={Link} href={`${pathname}${team.id}`}>
                <Card.Title text="semibold" style={{ flex: 1 }}>
                  {team.name}
                </Card.Title>
                <Card.Action onClick={e => handleClickCard(e, String(team.id))}>
                  <LeagueTeamActionIcon edit={edit} />
                </Card.Action>
              </Card.Content>
            </Card.Root>
          ))
        ) : (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            팀이 없습니다.
          </Flex>
        )}
      </Flex>
    </Layout>
  );
}
