import react from "react";
import { withFormik } from "formik";
import * as yup from "yup";

const DiscoverSelect = (props: any) => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;
  return (
    <div
      style={{
        padding: "8px",

        width: "200px",
        borderBottom: "3px rgba(255,255,255,0.5) solid"
      }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="adventureCategory" style={{ display: "block" }}>
          Categories
        </label>
        <select
          name="adventureCategory"
          value={values.adventureCategory}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ display: "block" }}
        >
          <option value="" label="Select a category" />
          <option value="popular" label="Popular" />
          <option value="blue" label="blue" />
          <option value="green" label="green" />
        </select>
      </form>
    </div>
  );
};

const BasicSelect = withFormik({
  mapPropsToValues: () => ({ adventureCategory: "" }),
  validationSchema: yup.object().shape({
    adventureCategory: yup.string().required("Category is required!")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "BasicForm" // helps with React DevTools
})(DiscoverSelect);

export default BasicSelect;
