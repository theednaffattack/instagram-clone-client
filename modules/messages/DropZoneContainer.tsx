import React, { Component } from "react";
import { Card } from "rebass";
import DropZone from "./DropZone";

export default class DropZoneContainer extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Card border="lime">
        <DropZone onFilesAdded={console.log} />
      </Card>
    );
  }
}
