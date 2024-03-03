import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const wrapper = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: theme.sizes.appWidth,
  width: '100%',
  backgroundColor: theme.colors.background.normal,
  padding: 0,
  borderRadius: 0,
});

export const timeline = style({
  display: 'flex',
  flexShrink: 0,
  height: rem(42),
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
});

export const cheerTalkListContainer = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflow: 'hidden',
});

export const cheerTalkList = style([
  cheerTalkListContainer,
  {
    padding: `${rem(16)} ${rem(16)} 0 ${rem(16)}`,
    overflowY: 'auto',
  },
]);

export const close = style({
  position: 'absolute',
  top: calc.subtract(theme.spaces.default, rem(4)),
  right: theme.spaces.default,

  zIndex: 100,
});
