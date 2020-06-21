import Typography from 'typography';
import '../../gatsby-browser';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.50,
  headerFontFamily: ['Montserrat', 'Noto Sans JP', 'sans-serif'],
  bodyFontFamily: ['Montserrat', 'Noto Sans JP', 'sans-serif'],
  overrideStyles: ({ rhythm }) => ({
    h1: {
      marginBottom: rhythm(1)
    },
    'h2, h3, h4, h5, h6': {
      marginTop: rhythm(2),
      marginBottom: rhythm(1)
    },
  }),
});

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
