import * as React from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled.a`
  text-decoration: none;
  color: ${props => props.fill || "white"};
`;

export default ({ href, name, fill, theme }: any) => (
  <Link prefetch href={href} passHref>
    <StyledLink fill={fill}>{name}</StyledLink>
  </Link>
);
