'use client';

import { HamburgerIcon } from '@hcc/icons';
import { theme } from '@hcc/styles';
import { Icon, Modal } from '@hcc/ui';

import * as styles from './Sidebar.css';
import LeagueList from '../LeagueList';

export default function Sidebar() {
  return (
    <Modal>
      <Modal.Trigger>
        <Icon source={HamburgerIcon} />
      </Modal.Trigger>
      <Modal.Content
        key="sidebar"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { x: theme.sizes.appWidth },
          visible: { x: 0 },
        }}
        transition={{ type: 'just' }}
        aria-label="Sidebar"
        style={styles.root}
        className={styles.sidebar}
      >
        <div className={styles.sidebarHeader}>
          <span>대회 목록</span>
          <Modal.Close className={styles.close} />
        </div>

        <LeagueList />
      </Modal.Content>
    </Modal>
  );
}
