import Link from "next/link";
import { withRouter } from "next/router";
import { Text } from "rebass";
import styled from "styled-components";
import { color, space, textColor, width } from "styled-system";

const StyledLink = styled.a`
  ${space}
  ${width}
  ${color}
  ${textColor}
  text-decoration: none !important;
  font-weight: 600;
  &:hover {
    color: crimson;
    transform: "scale(1.1)";
  }
  /* &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: goldenrod;
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
    //transition: width .3s;
  } */
`;

const LinkText = styled(Text)`
  &:hover {
    color: crimson;
    transition: color 0.2s;
  }
`;

interface CustomLinkProps {
  router: any;
  href: string;
  name: string;
}

function ActiveLink({
  children,
  className,
  params,
  router,
  route,
  href,
  name,
  ...props
}: CustomLinkProps) {
  const style = {
    // marginRight: 10,
    color: router.pathname === href ? "red" : "#b2b2d8"
  };

  const handleClick = e => {
    e.preventDefault();
    let prepHref = `/${href}`;
    router.push(prepHref);
  };

  return (
    <Link prefetch href={href} passHref>
      <StyledLink className={className} style={style} {...props}>
        {children}
      </StyledLink>
    </Link>
  );
}
export default withRouter(ActiveLink);

// const StyledLink = styled.a`
//   //styles
// `
// export const someLink = ({ route, params, href, children, className }) => (
//   <Link route={route} params={params} href={href} passHref>
//     <StyledLink className={className} >{children}</StyledLink>
//   </Link>
// );
