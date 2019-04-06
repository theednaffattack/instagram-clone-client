import { configure } from "@storybook/react";
import { setAddon, addDecorator } from "@storybook/react";
import JSXAddon from "storybook-addon-jsx";
import { withKnobs, select } from "@storybook/addon-knobs/react";
import { withInfo } from "@storybook/addon-info";

addDecorator(withKnobs);
addDecorator(withInfo);
setAddon(JSXAddon);

// Globally in your .storybook/config.js, or alternatively, per-chapter
addDecorator(
  withInfo({
    styles: {
      header: {
        h1: {
          marginRight: "20px",
          fontSize: "25px",
          display: "inline"
        },
        body: {
          paddingTop: 0,
          paddingBottom: 0
        },
        h2: {
          display: "inline",
          color: "#999"
        }
      },
      infoBody: {
        backgroundColor: "#eee",
        padding: "0px 5px",
        lineHeight: "2"
      }
    },
    inline: true,
    source: false
  })
);

// automatically import all files ending in *.stories.js
// const req = require.context("../components", true, /.stories.js$/);

// automatically import all files ending in *.stories.tsx
const req = require.context("../stories", true, /\.stories\.tsx$/);

console.log("req".toUpperCase());
console.log(req.name);
console.log(req.length);

function loadStories() {
  require("./welcomeStory");
  // req.keys().forEach(req);
  req.keys().forEach(filename => req(filename));
  console.log("req.keys()");
  console.log(req.keys());
}

configure(loadStories, module);
