// Typography System for OpenSansad
// Primary: Inter / Source Sans Pro (Clean, Humanist Sans-Serif)
// Secondary: Merriweather / Lora (Elegant Serif for gravitas)

function pxToRem(value: number) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = "'Inter', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
const FONT_SECONDARY = "'Merriweather', 'Lora', Georgia, 'Times New Roman', serif";

const typography = {
  fontFamily: FONT_PRIMARY,
  fontFamilySerif: FONT_SECONDARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,

  // H1: Page Heroes (Serif for gravitas)
  h1: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 700,
    fontSize: pxToRem(40),
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
    ...responsiveFontSizes({ sm: 48, md: 56, lg: 64 }),
  },

  // H2: Section Headers (Serif)
  h2: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 600,
    fontSize: pxToRem(32),
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    ...responsiveFontSizes({ sm: 36, md: 40, lg: 48 }),
  },

  // H3: Subsection Headers (Sans)
  h3: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 700,
    fontSize: pxToRem(24),
    lineHeight: 1.4,
    ...responsiveFontSizes({ sm: 26, md: 28, lg: 32 }),
  },

  // H4: Card Titles (Sans)
  h4: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 700,
    fontSize: pxToRem(20),
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: 20, md: 22, lg: 24 }),
  },

  // H5: List Headers (Sans)
  h5: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 700,
    fontSize: pxToRem(18),
    lineHeight: 1.5,
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },

  // H6: Sidebar Titles (Sans)
  h6: {
    fontFamily: FONT_PRIMARY,
    fontWeight: 700,
    fontSize: pxToRem(17),
    lineHeight: 1.57,
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },

  // Subtitle1: Emphasized Body
  subtitle1: {
    fontWeight: 600,
    fontSize: pxToRem(16),
    lineHeight: 1.5,
  },

  // Subtitle2: Small Headers
  subtitle2: {
    fontWeight: 600,
    fontSize: pxToRem(14),
    lineHeight: 1.57,
  },

  // Body1: Primary Body Text (16px)
  body1: {
    fontSize: pxToRem(16),
    lineHeight: 1.6,
    fontWeight: 400,
  },

  // Body2: Secondary Body Text (14px)
  body2: {
    fontSize: pxToRem(14),
    lineHeight: 1.57,
    fontWeight: 400,
  },

  // Caption: Metadata, Labels
  caption: {
    fontSize: pxToRem(12),
    lineHeight: 1.5,
    fontWeight: 400,
  },

  // Overline: Section Labels
  overline: {
    fontSize: pxToRem(12),
    fontWeight: 700,
    lineHeight: 1.5,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },

  // Button Text (sentence case, not uppercase)
  button: {
    fontWeight: 600,
    fontSize: pxToRem(14),
    lineHeight: 1.71,
    textTransform: 'none' as const,
    letterSpacing: '0.02em',
  },
} as const;

export default typography;
