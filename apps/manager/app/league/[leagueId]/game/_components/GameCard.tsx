import { CaretDownIcon, SubtractIcon } from '@hcc/icons';
import { Icon, Modal } from '@hcc/ui';
import { Button, Flex } from '@mantine/core';
import Link from 'next/link';

import Card from '@/components/Card';
import useDeleteGameMutation from '@/hooks/mutations/useDeleteGameMutation';
import useGameQuery from '@/hooks/queries/useGameQuery';
import { stateMap, StateType } from '@/types/game';
import { LeagueType } from '@/types/league';
import { formatTime } from '@/utils/time';

import * as styles from '../page.css';

type PlayingCardProps = {
  league: LeagueType;
  state: StateType;
  edit: boolean;
};

const alertMessage =
  '삭제된 경기는 이후 복구할 수 없습니다.\n삭제하시겠습니까?';

export default function GameCard({ league, state, edit }: PlayingCardProps) {
  const { data, refetch } = useGameQuery(league, state);
  const { mutate: mutateDeleteGame, isPending } = useDeleteGameMutation();
  const handleDelete = (gameId: string) => {
    if (isPending) return;

    mutateDeleteGame(gameId, {
      onSuccess: () => refetch(),
    });
  };

  if (!data) return;

  return (
    <>
      <p className={styles.title}>
        {stateMap[state.toUpperCase() as StateType]}
      </p>
      <Flex direction="column" gap="xs" mt="md">
        {data.data.map(game => (
          <Card.Root key={game.id}>
            <Card.Content
              component={Link}
              href={edit ? `#` : `/game/${league.leagueId}/${game.id}`}
            >
              <div style={{ flex: 1 }}>
                <Card.Title text="semibold">{game.gameName}</Card.Title>
                <Card.SubContent>
                  {formatTime(game.startTime, 'YYYY.MM.DD')}
                </Card.SubContent>
              </div>
              <Card.Action>
                {edit ? (
                  <Modal>
                    <Modal.Trigger>
                      <Icon source={SubtractIcon} color="error" />
                    </Modal.Trigger>
                    <Modal.Content
                      key="report-menu"
                      className={styles.modalContainer}
                    >
                      <div className={styles.modalContent}>
                        <p className={styles.gameName}>{game.gameName}</p>
                        <p className={styles.gameDate}>
                          {formatTime(game.startTime, 'YYYY.MM.DD')}
                        </p>
                      </div>
                      <div className={styles.alert}>
                        <p>{alertMessage}</p>
                        <div className={styles.menuContainer}>
                          <Modal.Close
                            className={styles.positiveMenu}
                            onClick={() => handleDelete(String(game.id))}
                          >
                            예
                          </Modal.Close>
                          <Modal.Close className={styles.negativeMenu}>
                            아니오
                          </Modal.Close>
                        </div>
                      </div>
                    </Modal.Content>
                  </Modal>
                ) : (
                  <Icon
                    source={CaretDownIcon}
                    style={{ transform: 'rotate(-90deg)' }}
                  />
                )}
              </Card.Action>
            </Card.Content>
            {state === 'playing' && (
              <Card.Footer>
                <Flex gap="xs">
                  <Button
                    fullWidth
                    component={Link}
                    variant="light"
                    href={`/game/${league.leagueId}/${game.id}/lineup`}
                  >
                    라인업
                  </Button>
                  <Button
                    fullWidth
                    component={Link}
                    variant="light"
                    href={`/game/${league.leagueId}/${game.id}/timeline`}
                  >
                    타임 라인
                  </Button>
                </Flex>
              </Card.Footer>
            )}
          </Card.Root>
        ))}
      </Flex>
    </>
  );
}
