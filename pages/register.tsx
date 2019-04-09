import { Field, Formik } from "formik";
import React from "react";
import { Box, Text } from "rebass";

import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { RegisterComponent } from "../generated/apolloComponents";
import { Router } from "../server/routes";
import { Wrap, ContentFlex } from "../modules/register/Wrap";
import { Button } from "../components/Button/Button";
import { CheckBox } from "../components/fields/CheckBox";
import MyLink from "../components/MyLink";

export default () => {
  return (
    <Layout title="Register page">
      <Wrap heading="Join us">
        <RegisterComponent>
          {register => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors }) => {
                try {
                  const response = await register({
                    variables: {
                      data
                    }
                  });
                  Router.push("/check-email");
                } catch (error) {
                  const displayErrors: { [key: string]: string } = {};

                  let myErrors =
                    error.graphQLErrors[0].extensions.exception
                      .validationErrors;

                  myErrors.forEach((validationError: any) => {
                    Object.values(validationError.constraints).forEach(
                      (message: any) => {
                        displayErrors[validationError.property] = message;
                      }
                    );
                  });
                  return setErrors(displayErrors);

                  // const errors: { [key: string]: string } = {};
                  // err.graphQLErrors[0].validationErrors.forEach(
                  //   (validationErr: any) => {
                  //     Object.values(validationErr.constraints).forEach(
                  //       (message: any) => {
                  //         errors[validationErr.property] = message;
                  //       }
                  //     );
                  //   }
                  // );
                  // setErrors(errors);
                }
              }}
              initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                termsAndConditions: false
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <Field
                    label="first name"
                    name="firstName"
                    placeholder="enter first name"
                    component={InputField}
                  />
                  <Field
                    label="last name"
                    name="lastName"
                    placeholder="enter last name"
                    component={InputField}
                  />
                  <Field
                    label="email"
                    name="email"
                    placeholder="enter email"
                    component={InputField}
                  />
                  <Field
                    label="password"
                    name="password"
                    type="password"
                    component={InputField}
                  />

                  <ContentFlex justifyContent="center" mt={2} mb={3}>
                    <Box mr={2}>
                      <label>
                        <Field
                          label="terms and conditions"
                          id="termsAndConditions"
                          name="termsAndConditions"
                          type="checkbox"
                          shadow="0px 10px 27px 0px rgba(0, 0, 0, 0.1)"
                          component={CheckBox}
                        />
                      </label>
                    </Box>
                    <ContentFlex>
                      <Text htmlFor="keepMeSignedIn" fontFamily="montserrat">
                        Agree to our
                      </Text>
                      &nbsp;
                      <Text fontFamily="montserrat">
                        <MyLink
                          href="terrms_and_conditions"
                          name="Terms & stuff"
                          shade="dark"
                        />
                      </Text>
                    </ContentFlex>
                  </ContentFlex>
                  <ContentFlex justifyContent="center">
                    <Button onClick={handleSubmit} label="Sign up" />
                  </ContentFlex>
                </form>
              )}
            </Formik>
          )}
        </RegisterComponent>
      </Wrap>
    </Layout>
  );
};
