import { Modal } from '@hcc/ui';
import { useRef, useState } from 'react';

import CheerTalkForm from 'components/cheertalk/Modal/CheerTalkForm';
import CheerTalkList from 'components/cheertalk/Modal/CheerTalkList';

import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loader from '@/components/common/Loader';
import useSocket from '@/hooks/useSocket';
import GameByIdFetcher from '@/queries/useGameById/Fetcher';
import GameCheerTalkFetcher from '@/queries/useGameCheerTalkById/Fetcher';
import useSaveCheerTalkMutation from '@/queries/useSaveCheerTalkMutation/query';
import { GameCheerTalkType } from '@/types/game';

import * as styles from './CheerTalkModal.css';

type CheerTalkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
};

const CheerTalkModal = ({ isOpen, onClose, gameId }: CheerTalkModalProps) => {
  const [cheerTalks, setCheerTalks] = useState<GameCheerTalkType[]>([]);

  const handleSocketMessage = (cheerTalk: GameCheerTalkType) => {
    if (cheerTalk) {
      setCheerTalks(prev => [...prev, cheerTalk]);
    }
  };

  const { connect } = useSocket({
    url: 'wss://api.hufstreaming.site/ws',
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  connect();

  const { mutate } = useSaveCheerTalkMutation();

  const scrollRef = useRef(null);
  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    (scrollRef.current as HTMLDivElement).scrollIntoView();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.cheerTalkModalWrapper}>
        <AsyncBoundary
          errorFallback={props => <>{props}</>}
          loadingFallback={<></>}
        >
          <GameByIdFetcher gameId={gameId}>
            {data => {
              const [firstTeam, secondTeam] = data.gameTeams;
              return (
                <div className={styles.cheerTalkModalHeader}>
                  <span>
                    <span>{firstTeam.gameTeamName}</span>
                    <span>{firstTeam.score}</span>
                    <span>
                      <span>{data.gameQuarter}</span>
                      <span>{data.startTime}</span>
                    </span>
                    <span>{secondTeam.gameTeamName}</span>
                    <span>{secondTeam.score}</span>
                    {/* close */}
                  </span>
                </div>
              );
            }}
          </GameByIdFetcher>
        </AsyncBoundary>
        <div className={styles.cheerTalkModalTimeline}></div>
        <AsyncBoundary
          errorFallback={props => <CheerTalkList.ErrorFallback {...props} />}
          loadingFallback={<Loader />}
        >
          <GameCheerTalkFetcher gameId={gameId}>
            {({ gameTalkList, gameTeams, ...data }) => (
              <div className={styles.cheerTalkListContainer}>
                <ul className={styles.cheerTalkList}>
                  <CheerTalkList
                    cheerTalkList={gameTalkList.pages.flat()}
                    scrollToBottom={scrollToBottom}
                    {...data}
                  />
                  <CheerTalkList.SocketList cheerTalkList={cheerTalks} />
                  <li ref={scrollRef}></li>
                </ul>
                <CheerTalkForm
                  gameTeams={gameTeams}
                  gameId={gameId}
                  mutate={mutate}
                  scrollToBottom={scrollToBottom}
                />
              </div>
            )}
          </GameCheerTalkFetcher>
        </AsyncBoundary>
      </div>
    </Modal>
  );
};

export default CheerTalkModal;
