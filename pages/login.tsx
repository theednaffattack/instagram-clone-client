import { Field, Formik } from "formik";
import React from "react";
import {
  Button as ButtonBase,
  Flex as FlexBase,
  Text,
  Card as CardBase,
  Heading,
  Box
} from "rebass";
import styled from "styled-components";
import { boxShadow, borderRadius, minHeight, maxWidth } from "styled-system";

import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { LoginComponent, MeQuery } from "../generated/apolloComponents";
import { Router } from "../server/routes";
import { meQuery } from "../graphql/user/queries/Me";
import { SignUpLink } from "../components/SignUpLink/SignUpLink";
import { CheckBox } from "../components/fields/CheckBox";

const Button = styled(ButtonBase)`
  ${boxShadow}
  ${borderRadius}

  :focus {
    border: 4px lawngreen solid;
    border-radius: 20px;
    outline: none;
  }

  background-image: linear-gradient(
    0deg,
    rgb(210, 48, 120) 6%,
    rgb(254, 97, 97) 74%,
    rgb(255, 121, 85) 100%
  );
`;

const Flex = styled(FlexBase)`
  ${minHeight}

  background-image: linear-gradient(
    0deg,
    rgba(210, 48, 120, 1) 6%,
    rgba(254, 97, 97, 1) 74%,
    rgba(255, 121, 85, 1) 100%
  );
`;

const InnerFlex = styled(FlexBase)`
  ${minHeight}
  background: url('/static/images/login/bg.png') center center no-repeat;
  background-size: cover;
`;

const ContentFlex = styled(FlexBase)`
  ${minHeight}
`;

const Card = styled(CardBase)`
  ${maxWidth}
`;

export default () => {
  return (
    <Layout title="Login page">
      <Flex minHeight="100vh">
        <InnerFlex width={[1]} minHeight="100vh">
          <ContentFlex
            mt={[0, 5, 0]}
            flexDirection="column"
            width={[1]}
            justifyContent="center"
            alignItems="center"
          >
            <Card
              mx={3}
              width={1}
              maxWidth={["350px", "350px"]}
              p={4}
              borderRadius="10px"
              bg="rgb(242,242,242)"
              boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
            >
              <ContentFlex mt={3} mb={4} justifyContent="center">
                <Heading color="text" fontSize={[5]} fontFamily="montserrat">
                  Sign in
                </Heading>
              </ContentFlex>
              <LoginComponent>
                {login => (
                  <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={async (data, { setErrors }) => {
                      let response;
                      try {
                        response = await login({
                          variables: data,
                          update: (cache, { data }) => {
                            if (!data || !data.login) {
                              return;
                            }
                            cache.writeQuery<MeQuery>({
                              query: meQuery,
                              data: {
                                __typename: "Query",
                                me: data.login
                              }
                            });
                          }
                        });
                      } catch (error) {
                        const displayErrors: { [key: string]: string } = {};

                        let myErrors = error.graphQLErrors; //.extensions.exception.validationErrors;
                        console.log(
                          "myErrors",
                          JSON.stringify(myErrors, null, 2)
                        );
                        // myErrors.forEach((errorThing: any) => {
                        //   displayErrors[errorThing.path[0]] =
                        //     errorThing.message;
                        // });

                        // myErrors.forEach((validationError: any) => {
                        //   Object.values(validationError.constraints).forEach(
                        //     (message: any) => {
                        //       displayErrors[validationError.property] = message;
                        //     }
                        //   );
                        // });

                        // return setErrors(displayErrors);

                        return setErrors({
                          email: "invalid login"
                        });
                      }

                      if (response && response.data && !response.data.login) {
                        setErrors({
                          email: "invalid login"
                        });
                        return;
                      }

                      Router.push("/");
                    }}
                    initialValues={{
                      email: "",
                      password: "",
                      keepMeSigned: true
                    }}
                  >
                    {({ handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <Field
                          id="email"
                          name="email"
                          placeholder="input email"
                          component={InputField}
                        />
                        <Field
                          id="password"
                          name="password"
                          placeholder="input password"
                          type="password"
                          component={InputField}
                        />
                        <ContentFlex my={2}>
                          <Box mr="auto">
                            <Text
                              htmlFor="keepMeSignedIn"
                              fontFamily="montserrat"
                            >
                              Keep me logged in
                            </Text>
                          </Box>
                          <Box mr={2}>
                            <label>
                              <Field
                                id="keepMeSignedIn"
                                name="keepMeSignedIn"
                                type="checkbox"
                                shadow="0px 10px 27px 0px rgba(0, 0, 0, 0.1)"
                                component={CheckBox}
                              />
                            </label>
                          </Box>
                        </ContentFlex>
                        <ContentFlex justifyContent="center">
                          <Button
                            mt={2}
                            width="340px"
                            height="47px"
                            borderRadius="30px"
                            boxShadow="0px 10px 27px 0px rgba(0, 0, 0, 0.1)"
                            type="submit"
                          >
                            <Text fontFamily="montserrat">Login</Text>
                          </Button>
                        </ContentFlex>
                      </form>
                    )}
                  </Formik>
                )}
              </LoginComponent>
            </Card>
            <SignUpLink maxWidth={["100%", "500px"]} />
          </ContentFlex>
        </InnerFlex>
      </Flex>
    </Layout>
  );
};
