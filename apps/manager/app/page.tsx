'use client';

import { MessageIcon, RewardIcon } from '@hcc/icons';
import { Button, Icon, Spinner } from '@hcc/ui';
import Link from 'next/link';
import { Suspense } from 'react';

import Divider from '@/components/Divider';
import Layout from '@/components/Layout';

import MatchOverview from './_components/MatchOverview';
import * as styles from './page.css';

export default function Page() {
  return (
    <Layout headerVisible={true} navigationVisible={false}>
      <nav className={styles.navigation}>
        <Button colorScheme="accentPrimary" asChild fullWidth>
          <Link href={`/league`}>
            <Icon source={RewardIcon} size={20} />
            <span className={styles.navigationText}>대회 관리</span>
          </Link>
        </Button>
        <Button colorScheme="accentPrimary" asChild fullWidth>
          <Link href={`/cheer-talk`}>
            <Icon source={MessageIcon} size={20} />
            <span className={styles.navigationText}>응원톡 관리</span>
          </Link>
        </Button>
      </nav>

      <Divider height={6} />

      <Suspense fallback={<Spinner />}>
        <MatchOverview state="finished" />
      </Suspense>
    </Layout>
  );
}
