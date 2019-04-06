import * as React from "react";

import { storiesOf } from "@storybook/react";
import { PrimaryButton } from "../components/Button/Button";
import { text, select, boolean } from "@storybook/addon-knobs/react";

(storiesOf("Components/Button", module) as any).addWithJSX(
  "basic PrimaryButton",
  () => (
    <PrimaryButton
      label={text("label", "Enroll")}
      disabled={boolean("disabled", false)}
      onClick={() => alert("hello there")}
    />
  ),
  {
    info: {
      text: `

  ### Notes

  light button seen on <https://zpl.io/aM49ZBd>

  ### Usage
  ~~~js
  <PrimaryButton
    label={text('label', 'Enroll')}
    disabled={boolean('disabled',false)}
    onClick={() => alert('hello there')}
  />
  ~~~

`
    }
  }
);
