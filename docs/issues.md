# Issues

Currently `storybook` cannot be run due to NUMEROUS issues with TypeScript.

Many of these issues are `styled-components` related. Below is a link to a partial solution when using `styled-components` and `styled-system` together.

<u>personal fork:</u>
https://codesandbox.io/embed/typesstyled-system-colorprops-typing-wuy5f

<u>original:</u>
https://codesandbox.io/s/2x2jl9xz2n?from-embed

Major issue loading CSS Files
The fix: https://github.com/zeit/next-plugins/issues/392#issuecomment-475845330

Formik InputProps
From: https://stackoverflow.com/questions/52869318/react-formik-field-onchange-event-handle

## `messages` route ".id" undefined error

It looks like the authentication logic isn't running here at all. It can't sense an id for fetched data because the user isn't signed in, so I think it's failing the `Me` query at the beginning of the page mounting.
The solution is to do whatever I did for `/hello` and other routes to have it forward to the login page.
