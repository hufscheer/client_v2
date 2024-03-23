import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const highlight = style({
  width: '100%',
  marginBlock: theme.spaces.default,
  paddingInline: theme.spaces.default,
  borderRadius: theme.spaces.xs,
  border: 'none',

  aspectRatio: '16 / 9',
});