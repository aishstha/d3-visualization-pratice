const img = path => `/img/${path}`;
const icons = path => img(`icons/${path}`);

export default {
  appLogo: img("logo.svg"),
  pageNotFound: img("404-img.svg"),
  dataNotAvailable: img("data-not-available.svg"),
  icons: {
    search: icons("search.svg"),
    sprite: icons("sprite.svg"),
    loader: icons("loader.svg"),
    arrowUp: icons("arrow-up.svg"),
    arrowDown: icons("arrow-down.svg"),
  }
};
