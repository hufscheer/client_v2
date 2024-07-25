import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const tab = style({
  marginTop: rem(16),
  paddingInline: theme.sizes.appInlinePadding,
});

export const tabListContainer = style({
  ...theme.layouts.center,
  position: 'relative',
  width: '100%',
  height: rem(35),
  borderRadius: rem(8),
  backgroundColor: theme.colors.black25,
});

export const activeTabIndicator = style({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: `calc(50% - ${rem(6)})`,
  margin: rem(3),
  backgroundColor: theme.colors.white,
  borderRadius: rem(6),
  boxShadow: theme.shadows.sm,
});

export const tabButton = recipe({
  base: {
    flex: 1,
    fontSize: rem(14),
    fontWeight: 500,
    textAlign: 'center',
    zIndex: theme.zIndices.tab,
  },
  variants: {
    state: {
      active: { color: theme.colors.black900 },
      inactive: { color: theme.colors.black100 },
    },
  },
  defaultVariants: {
    state: 'inactive',
  },
});
