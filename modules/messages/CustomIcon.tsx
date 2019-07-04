import React from "react";

interface IIconProps {
  fill: string;
  name: string;
  size: string;
  width: string | number;
  props: any;
}

function CustomIcon({ fill, name, size, width, ...props }: IIconProps) {
  return (
    <svg
      width={width}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 199.8 199.8"
    >
      <title>{name}</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            fill={fill}
            d="M99.9,12.49a87.41,87.41,0,0,1,61.81,149.22A87.41,87.41,0,0,1,38.09,38.09,86.84,86.84,0,0,1,99.9,12.49M99.9,0a99.9,99.9,0,1,0,99.9,99.9A99.9,99.9,0,0,0,99.9,0ZM78.05,50c-5.17,0-9.37,8.39-9.37,18.73s4.2,18.73,9.37,18.73S87.41,79,87.41,68.68,83.22,50,78.05,50Zm43.71,0c-5.18,0-9.37,8.39-9.37,18.73s4.19,18.73,9.37,18.73,9.36-8.38,9.36-18.73S126.93,50,121.76,50ZM99.9,162.34a56.24,56.24,0,0,0,51.42-33.53,6.24,6.24,0,1,0-11.42-5,43.71,43.71,0,0,1-80,0,6.25,6.25,0,0,0-11.43,5A56.25,56.25,0,0,0,99.9,162.34Z"
          />
        </g>
      </g>
    </svg>
  );
}

export default CustomIcon;
