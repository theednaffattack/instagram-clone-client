import { Field, Formik } from "formik";
import React from "react";
import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { ChangePasswordComponent } from "../generated/apolloComponents";
import { Router } from "../server/routes";
import { NextContext } from "next";

const ChangePassword = ({ token }: { token: string }) => {
  return (
    <Layout title="Change Password">
      <ChangePasswordComponent>
        {changePassword => (
          <Formik
            // validateOnBlur={false}
            // validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              try {
                const response = await changePassword({
                  variables: {
                    data: {
                      password: data.password,
                      token: ""
                    }
                  }
                });

                Router.push("/");
              } catch (error) {
                const displayErrors: { [key: string]: string } = {};

                let myErrors =
                  error.graphQLErrors[0].extensions.exception.validationErrors;

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
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="password"
                  type="password"
                  placeholder="change password"
                  component={InputField}
                />
                <button type="submit">change password</button>
              </form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  );
};

ChangePassword.getInitialProps = ({
  query: { token }
}: NextContext<{ token: string }>) => {
  return {
    token
  };
};

export default ChangePassword;
