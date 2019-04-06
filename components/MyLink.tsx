import * as React from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled.a`
  color: white;
`;

export default ({ href, name }: any) => (
  <Link prefetch href={href} passHref>
    <StyledLink>{name}</StyledLink>
  </Link>
);
