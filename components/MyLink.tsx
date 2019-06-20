import * as React from "react";
import Link from "next/link";
import styled from "styled-components";

interface IStyledLinkProps {
  shade: string;
}

const StyledLink = styled.a<IStyledLinkProps>`
  text-decoration: none;
  color: ${(props: any) =>
    props.shade === "dark" ? props.theme.colors.text : "white"};
`;

export default ({ href, name, shade, theme }: any) => (
  <Link prefetch href={href} passHref>
    <StyledLink shade={shade}>
      {name}
      {JSON.stringify(theme)}
    </StyledLink>
  </Link>
);
