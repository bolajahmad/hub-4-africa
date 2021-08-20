const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const devices = {
  custom: customMediaQuery,
  tablet: customMediaQuery(800),
  tabletM: customMediaQuery(900),
  laptop: customMediaQuery(1024),
  laptopM: customMediaQuery(1240),
  laptopL: customMediaQuery(1440),
  desktop: customMediaQuery(2560),
  phone: customMediaQuery(600),
  phoneM: customMediaQuery(500),
  phoneS: customMediaQuery(450),
};
