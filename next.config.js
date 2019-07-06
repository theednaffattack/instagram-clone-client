// // module.exports = {
// //   module: {
// //     rules: [
// //       {
// //         test: /\.css$/,
// //         use: ["style-loader", "css-loader"]
// //       }
// //     ]
// //   }
// // };

// // module.exports = withCSS();

// const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
// module.exports = withCSS(withTypescript());

// next.config.js
const withCSS = require("@zeit/next-css");

function HACK_removeMinimizeOptionFromCssLoaders(config) {
  console.warn(
    "HACK: Removing `minimize` option from `css-loader` entries in Webpack config"
  );
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === "css-loader" && u.options) {
          delete u.options.minimize;
        }
      });
    }
  });
}

module.exports = withTypescript(
  withCSS({
    webpack(config) {
      HACK_removeMinimizeOptionFromCssLoaders(config);
      return config;
    }
  })
);
