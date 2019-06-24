import React from "react";
import { Image } from "rebass";

interface IThumbProps {
  file: any;
}

interface IThumbState {
  loading: boolean;
  thumb: any;
}
export default class Thumb extends React.Component<IThumbProps, IThumbState> {
  constructor(props: IThumbProps) {
    super(props);
    this.state = {
      loading: false,
      thumb: undefined
    };
  }
  componentDidUpdate(prevProps: IThumbProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.file !== prevProps.file) {
      this.setState({ loading: true }, () => {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };

        reader.readAsDataURL(this.props.file);
      });
    }
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return <Image src={thumb} alt={file.name} />;
  }
}
