import { theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const header = styleVariants({
  wrapper: {
    display: 'flex',
    position: 'relative',
    paddingInline: theme.spaces.default,
    paddingBlock: theme.spaces.sm,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[1],
  },
  logoContent: {
    display: 'flex',
    alignItems: 'center',
  },
});
