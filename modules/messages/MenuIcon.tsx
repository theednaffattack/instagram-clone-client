interface IMenuDots {
  fill: string;
  name: string;
  size: string;
  className: string;
}

export const MenuDots = ({ className, fill, name, size }: IMenuDots) => {
  return (
    <svg
      className={className}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 342.38 90.44"
    >
      <title>{name}</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Capa_1" data-name="Capa 1">
          <path
            fill={fill}
            d="M45.22,0A45.22,45.22,0,1,0,90.44,45.22,45.26,45.26,0,0,0,45.22,0Z"
          />
          <path
            fill={fill}
            d="M173.41,0a45.22,45.22,0,1,0,45.22,45.22A45.27,45.27,0,0,0,173.41,0Z"
          />
          <path
            fill={fill}
            d="M297.17,0a45.22,45.22,0,1,0,45.21,45.22A45.27,45.27,0,0,0,297.17,0Z"
          />
        </g>
      </g>
    </svg>
  );
};
