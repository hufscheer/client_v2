import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.default,

  paddingInline: theme.spaces.default,
});

export const title = style({
  ...theme.textVariants.lg,
  marginTop: theme.spaces.default,
});

export const timeline = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  alignItems: 'center',
  gap: theme.spaces.lg,
});

export const rightSide = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.xs,

  paddingBlock: theme.spaces.sm,

  borderBottom: `1px solid ${theme.colors.gray[2]}`,
});

export const timestampBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: rem(32),
  height: rem(32),
  borderRadius: '50%',
  border: `1px solid ${theme.colors.gray[3]}`,
  padding: rem(4),
});

export const timestamp = styleVariants({
  left: [
    timestampBase,
    {
      backgroundColor: theme.colors.indicatorBlue[3],
      color: theme.colors.white,
    },
  ],
  right: [
    timestampBase,
    {
      backgroundColor: theme.colors.indicatorRed[3],
      color: theme.colors.white,
    },
  ],
});

export const content = styleVariants({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spaces.xxs,
  },
  title: {
    fontSize: theme.textVariants.sm.fontSize,
    fontWeight: '600',
  },
  description: {
    fontSize: theme.textVariants.xs.fontSize,
    color: theme.colors.gray[4],
  },
});

export const errorFallback = styleVariants({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.default,

    minHeight: rem(180),
    paddingInline: theme.spaces.default,
    backgroundColor: theme.colors.gray[2],
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spaces.sm,

    color: theme.colors.gray[5],
    ...theme.textVariants.default,

    textAlign: 'center',
  },
  retry: {
    ...theme.textVariants.default,
    color: theme.colors.primary[3],
    gap: theme.spaces.xs,
  },
});
