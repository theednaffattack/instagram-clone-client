import React from "react";

export const GlobalSVGGradient = (props: any) => {
  return (
    <svg width="1px" height="1px" xlinkHref="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="mine" x1="0%" x2="0%" y1="100%" y2="0%">
          <stop offset="6%" stopColor="rgb(210,48,120)" stopOpacity="0.75" />
          <stop offset="74%" stopColor="rgb(254,97,97)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="rgb(255,121,85)" stopOpacity="0.75" />
        </linearGradient>
      </defs>
    </svg>
  );
};
