import { StateType } from '@hcc/api';
import { ProgressType } from '@hcc/api/src';

export const QUARTERS_DB = {
  경기전: '경기전',
  전반전: '전반전',
  후반전: '후반전',
  승부차기: '승부차기',
  '경기 종료': '경기 종료',
  연장전: '연장전',
} as const;

export const QUARTER_ID: Record<QUARTER_KEY, number> = {
  전반전: 4,
  후반전: 5,
  경기전: 6,
  승부차기: 7,
  '경기 종료': 8,
  연장전: 9,
} as const;

export type QUARTER_KEY = keyof typeof QUARTERS_DB;

export const getStateByQuarter = (quarter: QUARTER_KEY): StateType => {
  if (quarter === '경기전') return 'SCHEDULED';
  if (quarter === '경기 종료') return 'FINISHED';

  return 'PLAYING';
};

export const getProgressTypeByQuarter = (
  quarter: QUARTER_KEY,
): ProgressType => {
  switch (quarter) {
    case '전반전':
      return 'QUARTER_START';
    case '후반전':
      return 'QUARTER_START';
    case '승부차기':
      return 'QUARTER_START';
    case '경기 종료':
      return 'GAME_END';
    default:
      return 'GAME_END';
  }
};

export const getProgressSemantics = (progressType: ProgressType): string => {
  switch (progressType) {
    case 'GAME_START':
      return '시작';
    case 'QUARTER_START':
      return '시작';
    case 'QUARTER_END':
      return '종료';
    case 'GAME_END':
      return '종료';
  }
};
