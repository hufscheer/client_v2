import { GameTimelineType } from '@/types/game';

import ReplacementTimeline from './Replacement';
import ScoreTimeline from './Score';
import * as styles from './Timeline.css';

export default function Quarter(timeline: GameTimelineType) {
  return (
    <div key={timeline.gameQuarter}>
      <h3 className={styles.title}>{timeline.gameQuarter}</h3>
      <ul>
        {timeline.records.map(record => {
          if (record.type === 'SCORE')
            return <ScoreTimeline key={record.recordedAt} {...record} />;
          if (record.type === 'REPLACEMENT')
            return <ReplacementTimeline key={record.recordedAt} {...record} />;
        })}
      </ul>
    </div>
  );
}
