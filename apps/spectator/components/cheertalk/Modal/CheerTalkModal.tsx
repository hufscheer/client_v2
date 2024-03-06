import { Modal } from '@hcc/ui';
import { useState } from 'react';

import Banner from 'components/cheertalk/Modal/Banner';
import CheerTalkList from 'components/cheertalk/Modal/CheerTalkList';

import AsyncBoundary from '@/components/AsyncBoundary';
import Loader from '@/components/Loader';
import useSocket from '@/hooks/useSocket';
import { GameCheerTalkType } from '@/types/game';

import * as styles from './CheerTalkModal.css';
import ModalSection from './Section';
import CheerTalkEntryButton from '../EntryButton/CheerTalkEntryButton';

interface CheerTalkModalProps {
  gameId: string;
}

const CheerTalkModal = ({ gameId }: CheerTalkModalProps) => {
  const [cheerTalks, setCheerTalks] = useState<
    (GameCheerTalkType & {
      direction: 'left' | 'right';
      logoImageUrl: string;
    })[]
  >([]);

  const handleSocketMessage = (
    cheerTalk: GameCheerTalkType & {
      direction: 'left' | 'right';
      logoImageUrl: string;
    },
  ) => {
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

  return (
    <Modal>
      <Modal.Trigger as="div">
        <CheerTalkEntryButton />
      </Modal.Trigger>
      <Modal.Content key="cheer-talk" className={styles.wrapper}>
        {/* Game Banner */}
        <Modal.Close className={styles.close} />
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
          <ModalSection gameId={gameId} cheerTalks={cheerTalks} />
        </AsyncBoundary>
      </Modal.Content>
    </Modal>
  );
};

export default CheerTalkModal;
