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
      viewBox="0 0 149.85 199.8"
    >
      <title>{name}</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            fill={fill}
            d="M74.93,149.85A50,50,0,0,0,124.88,99.9V50A50,50,0,1,0,25,50v50A50,50,0,0,0,74.93,149.85Zm37.46-62.44H37.46v-25h74.93ZM74.93,12.49A37.46,37.46,0,0,1,112.39,50V56.2H37.46V50A37.47,37.47,0,0,1,74.93,12.49ZM37.46,93.66h74.93V99.9a37.47,37.47,0,1,1-74.93,0ZM149.85,81.17V99.9a75,75,0,0,1-68.68,74.67v12.75h25a6.24,6.24,0,0,1,0,12.48H43.71a6.24,6.24,0,1,1,0-12.48h25V174.57A75,75,0,0,1,0,99.9V81.17a6.25,6.25,0,0,1,12.49,0V99.9a62.44,62.44,0,0,0,124.88,0V81.17a6.24,6.24,0,1,1,12.48,0Z"
          />
        </g>
      </g>
    </svg>
  );
}

export default CustomIcon;