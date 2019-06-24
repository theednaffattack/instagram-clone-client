import React from "react";
import { Formik, Field } from "formik";
import { Image, Button } from "rebass";

// import { FileUploadField } from "../../components/fields/FileUploadField";
import { InputField } from "../../components/fields/InputField";
import { Flex } from "./styled-components/rebass-extend";
import Thumb from "./thumb";
import DragAndDrop from "./drag-and-drop";
import { Label } from "./styled-components/label";

interface ICreatePostFormArgs {
  //   handleFormUpload: any;
  handleDrop: any;
  handlePost: any;
  me: any;
  fileInputKey: string;
  setPreviewImageRef: any;
}

function CreatePostForm({
  //   handleFormUpload,
  createPost,
  handleDrop,
  handlePost,
  me,
  fileInputKey,
  setPreviewImageRef
}: ICreatePostFormArgs) {
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handlePost}
      initialValues={{
        text: "",
        title: "",
        pic: null,
        user: me
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => {
        const picValue = values.pic;
        return (
          <Flex flexDirection="column">
            <Flex minHeight="300px" width="450px" border="crimson">
              <DragAndDrop handleDrop={handleDrop}>
                <Thumb file={values.pic} />

                {setPreviewImageRef ? (
                  <Image width="100%" ref={setPreviewImageRef} alt="" src="" />
                ) : (
                  ""
                )}
              </DragAndDrop>

              <Label>
                +
                <input
                  key={fileInputKey}
                  id="pic"
                  name="pic"
                  type="file"
                  placeholder=""
                  onChange={event => {
                    setFieldValue("pic", event.currentTarget.files[0]);
                  }}
                  style={{
                    position: "absolute",
                    height: "1px",
                    width: "1px",
                    overflow: "hidden",
                    clip: "rect(1px 1px 1px 1px)"
                  }}
                />
              </Label>
            </Flex>
            <form onSubmit={handleSubmit}>
              <Field
                id="title"
                name="title"
                placeholder="title this post"
                component={InputField}
              />
              <Field
                id="text"
                name="text"
                placeholder="say a few words"
                component={InputField}
              />
              <Field
                id="user"
                name="user"
                type="hidden"
                component={InputField}
              />

              <Label>
                +
                <input
                  key={fileInputKey}
                  id="pic"
                  name="pic"
                  type="file"
                  placeholder=""
                  onChange={event => {
                    setFieldValue("pic", event.currentTarget.files[0]);
                  }}
                  style={{
                    position: "absolute",
                    height: "1px",
                    width: "1px",
                    overflow: "hidden",
                    clip: "rect(1px 1px 1px 1px)"
                  }}
                />
              </Label>

              <Button type="submit">submit</Button>
            </form>
          </Flex>
        );
      }}
    </Formik>
  );
}

export default CreatePostForm;
