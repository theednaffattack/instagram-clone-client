import React, { Component } from "react";
import { Flex } from "./StyledRebass";
import { Image } from "rebass";

interface IImagePreviewProps {
  files: string[];
}

export default class ImagePreview extends Component<
  IImagePreviewProps,
  object
> {
  render() {
    const { files } = this.props;
    return (
      <Flex width={[1]}>
        {files
          ? files.map((imageFile: any, index: number) => {
              return (
                <Image
                  width={["150px", "150px", "250px"]}
                  key={index}
                  src={imageFile}
                />
              );
            })
          : ""}
      </Flex>
    );
  }
}
