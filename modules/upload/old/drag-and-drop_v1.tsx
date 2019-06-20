import React, { Component } from "react";

interface IDragAndDropState {
  dragging: boolean;
}

interface IDragAndDropProps {
  handleDrop: any;
}

class DragAndDrop extends Component<IDragAndDropProps, IDragAndDropState> {
  constructor(props) {
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragIn = this.handleDragIn.bind(this);
    this.handleDragOut = this.handleDragOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);

    this.state = {
      dragging: false
    };
  }

  dropRef = React.createRef<HTMLDivElement>();

  handleDragIn(event: any) {
    event.preventDefault();
    event.stopPropagation();

    // this counter is implemented to determine
    // which item is being dragged in the case
    // of children
    this.dragCounter++;
    // If the dragging element has files, we're interested,
    // and we set the active dragging behavior in state.
    // Otherwise do nothing with state
    if (event.dataTransfer && event.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  }

  handleDragOut(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) return;
    // turn off dragging no matter what
    this.setState({ dragging: false });
  }

  handleDrag(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  componentDidMount() {
    this.dragCounter = 0;
    let div = this.dropRef.current;
    if (div) {
      div.addEventListener("dragenter", this.handleDragIn);
      div.addEventListener("dragleave", this.handleDragOut);
      div.addEventListener("dragover", this.handleDrag);
      div.addEventListener("drop", this.handleDrop);
    }
  }
  componentWillUnmount() {
    let div = this.dropRef.current;
    if (div) {
      div.removeEventListener("dragenter", this.handleDragIn);
      div.removeEventListener("dragleave", this.handleDragOut);
      div.removeEventListener("dragover", this.handleDrag);
      div.removeEventListener("drop", this.handleDrop);
    }
  }
  render() {
    return (
      <div
        style={{ display: "inline-block", position: "relative" }}
        ref={this.dropRef}
      >
        {this.state.dragging && (
          <div
            style={{
              border: "dashed grey 4px",
              backgroundColor: "rgba(255,255,255,.8)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                left: 0,
                textAlign: "center",
                color: "grey",
                fontSize: 36
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}
export default DragAndDrop;
