import { Field, Formik } from "formik";
import React from "react";
import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { LoginComponent, MeQuery } from "../generated/apolloComponents";
import { Router } from "../server/routes";
import { meQuery } from "../graphql/user/mutations/Me";

export default () => {
  return (
    <Layout title="Login page">
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

                myErrors.forEach((errorThing: any) => {
                  displayErrors[errorThing.path[0]] = errorThing.message;
                });
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
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <button type="submit">submit</button>
              </form>
            )}
          </Formik>
        )}
      </LoginComponent>
    </Layout>
  );
};
