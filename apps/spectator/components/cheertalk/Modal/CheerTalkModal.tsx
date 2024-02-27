import { Dialog } from '@hcc/ui';
import { useRef, useState } from 'react';

import Banner from 'components/cheertalk/Modal/Banner';
import CheerTalkForm from 'components/cheertalk/Modal/CheerTalkForm';
import CheerTalkList from 'components/cheertalk/Modal/CheerTalkList';

import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loader from '@/components/common/Loader';
import useSocket from '@/hooks/useSocket';
import GameCheerTalkFetcher from '@/queries/useGameCheerTalkById/Fetcher';
import useSaveCheerTalkMutation from '@/queries/useSaveCheerTalkMutation/query';
import { GameCheerTalkType } from '@/types/game';

import * as styles from './CheerTalkModal.css';
import CheerTalkEntryButton from '../EntryButton/CheerTalkEntryButton';

interface CheerTalkModalProps {
  gameId: string;
}

const CheerTalkModal = ({ gameId }: CheerTalkModalProps) => {
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
    <Dialog>
      <Dialog.Trigger>
        <CheerTalkEntryButton />
      </Dialog.Trigger>
      <Dialog.Content className={styles.wrapper}>
        {/* Game Banner */}
        <AsyncBoundary
          errorFallback={props => <>{props}</>}
          loadingFallback={<></>}
        >
          <Banner gameId={gameId} />
        </AsyncBoundary>

        {/* Game Timeline */}
        <div className={styles.timeline}></div>

        {/* CheerTalk List */}
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
        <Dialog.Close />
      </Dialog.Content>
    </Dialog>
  );
};

export default CheerTalkModal;
