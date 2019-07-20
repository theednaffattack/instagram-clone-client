import React, { Component } from "react";
import { Flex } from "./StyledRebass";
import { Image } from "rebass";

interface IImagePreviewProps {
  files: string[];
  imageFiles: string[];
}

export default class ImagePreview extends Component<
  IImagePreviewProps,
  object
> {
  render() {
    const { files, imageFiles } = this.props;
    return (
      <>
        {imageFiles
          ? imageFiles.map((imageFile: any, index: number) => {
              return (
                <Image
                  height="auto"
                  width={[1 / 2, 1 / 2, 1 / 2]}
                  key={index}
                  src={imageFile.blobUrl}
                />
              );
            })
          : ""}
      </>
    );
  }
}
