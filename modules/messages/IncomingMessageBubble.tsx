import { Text } from "./SVGText";

export const MyPath = (props: any) => {
  return (
    <path
      id={props.passIndex === 0 ? "selectMe" : props.passIndex}
      className="messageWindow"
      fillRule="evenodd"
      fill="url(#mine)"
      d="M263.000,186.666 L59.333,186.666 C50.128,186.666 42.667,179.205 42.667,170.000 L42.667,71.333 L42.667,53.666 L42.667,39.609 C42.227,36.361 40.870,33.609 39.006,31.979 L34.489,27.285 L34.495,27.267 C33.616,26.472 33.052,25.328 33.052,24.041 C33.052,21.667 34.939,19.744 37.279,19.705 L37.283,19.696 L42.844,19.684 L42.844,19.666 L59.333,19.666 L66.729,19.666 L263.000,19.666 C272.205,19.666 279.667,27.128 279.667,36.333 L279.667,53.666 L279.667,71.333 L279.667,170.000 C279.667,179.205 272.205,186.666 263.000,186.666 Z"
    />
  );
};

export const IncomingMessageBubble = (props: any) => {
  // const w = MyPath.getBoundingClientRect().width;
  // const h = MyPath.getBoundingClientRect().height;

  return (
    <svg
      style={{ border: "2px red solid" }}
      width="100%"
      preserveAspectRatio="xMidYMax meet"
      // preserveAspectRatio="none"
      height="100%"
      // width="313px"
      // height="233px"
      // viewBox="33 20 247 67"
      viewBox="33 20 247 167"
      xlinkHref="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient id="PSgrad_0" x1="0%" x2="0%" y1="100%" y2="0%">
          <stop offset="6%" stopColor="rgb(210,48,120)" stopOpacity="0.75" />
          <stop offset="74%" stopColor="rgb(254,97,97)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="rgb(255,121,85)" stopOpacity="0.75" />
        </linearGradient>
        <filter
          filterUnits="userSpaceOnUse"
          id="Filter_0"
          x="0px"
          y="0px"
          width="313px"
          height="233px"
        >
          <feOffset in="SourceAlpha" dx="0" dy="13" />
          <feGaussianBlur result="blurOut" stdDeviation="5.745" />
          <feFlood floodColor="rgb(0, 0, 0)" result="floodOut" />
          <feComposite operator="atop" in="floodOut" in2="blurOut" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.1" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#Filter_0)">
        <MyPath id={props.passIndex} />
      </g>
      {/* <path
        fill="url(#PSgrad_0)"
        d="M263.000,186.666 L59.333,186.666 C50.128,186.666 42.667,179.205 42.667,170.000 L42.667,71.333 L42.667,53.666 L42.667,39.609 C42.227,36.361 40.870,33.609 39.006,31.979 L34.489,27.285 L34.495,27.267 C33.616,26.472 33.052,25.328 33.052,24.041 C33.052,21.667 34.939,19.744 37.279,19.705 L37.283,19.696 L42.844,19.684 L42.844,19.666 L59.333,19.666 L66.729,19.666 L263.000,19.666 C272.205,19.666 279.667,27.128 279.667,36.333 L279.667,53.666 L279.667,71.333 L279.667,170.000 C279.667,179.205 272.205,186.666 263.000,186.666 Z"
      /> */}
      {/* <text
        kerning="auto"
        fontFamily="AdobeArabic"
        fill="rgb(0, 0, 0)"
        transform="matrix( 0.44711522058824, 0, 0, 0.44711519813681, 62.1653785693383, 164.629806386958)"
        fontSize="19.384px"
      >
        <tspan
          fontSize="19.384px"
          fontFamily="Montserrat"
          fontWeight="bold"
          fill="#FFFFFF"
        />
      </text> */}
      <Text
        x={props.x + 30}
        y={props.y + 80}
        leftPad={30}
        topPad={80}
        width={props.width}
        kerning="auto"
        fill="white"
        fontSize="16px"
        // transform="matrix( 0.49313725490196, 0, 0, 0.49313724040985, 62.5340519607843, 84.5584735023976)"
      >
        {props.messageText}
      </Text>
      {/* <Text x="0" y="0.71em" width={props.width} style={{ fontSize: "150%" }}>
        {props.timestamp}
      </Text> */}
      {/* <text
        kerning="auto"
        fontFamily="AdobeArabic"
        fill="rgb(0, 0, 0)"
        transform="matrix( 0.49313725490196, 0, 0, 0.49313724040985,62.5340519607843, 84.5584735023976)"
        fontSize="24.334px"
      >
        <tspan fontSize="24.334px" fontFamily="Montserrat" fill="#FFFFFF">
          {props.messageText}
        </tspan>
      </text> */}
      <path
        fillRule="evenodd"
        fillOpacity="0.251"
        fill="rgb(255, 255, 255)"
        d="M42.667,66.333 L279.667,66.333 L279.667,68.333 L42.667,68.333 L42.667,66.333 Z"
      />
      <text
        kerning="auto"
        fontFamily="AdobeArabic"
        fill="rgb(0, 0, 0)"
        transform="matrix( 0.49313725490196, 0, 0, 0.49313724040985,62.3615367647059, 40.8015526184436)"
        fontSize="24.334px"
      >
        <tspan fontSize="24.334px" fontFamily="Montserrat" fill="#FFFFFF">
          {props.title}
        </tspan>
      </text>
    </svg>
  );
};
