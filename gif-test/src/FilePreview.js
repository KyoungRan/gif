import React, {Component} from "react";
import gifshot from "../demo/js/dependencies/gifshot";

/*const uploadFileToServer = file => {
  const delay = file.size / 100;
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve();
      },
      delay
    );
  });
};

const getExtFromType = type => {
  const parts = type.split("/");
  return parts[parts.length - 1];
};
const getExtFromName = name => {
  const parts = name.split(".");
  return parts[parts.length - 1];
};*/

const Loader = () => {
  return (
    <div className="loader">
      <span className="loader-item" />
      <span className="loader-item" />
      <span className="loader-item" />
    </div>
  );
};

class FilePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  static defaultProps = {
    onRemove: () => {}
  };

  componentWillMount() {
    this.loadData();
  }

  componentWillReceiveProps(newProps) {
    this.loadData(newProps.data);
  }

  loadData(data = this.props.data) {
    if (!data) {
      return;
    }
    const reader = new FileReader();
    const type = data.type.match("image") ? "image" : data.type;
    reader.onload = e => {
      const src = e.target.result;
      this.setState({
        src,
        type,
        loading: false
      });
    };
    if (type === "image") {
      reader.readAsDataURL(data);
    } else {
      this.setState({
        src: false,
        type,
        loading: false
      });
    }
  }

  render() {
    const loading = this.state.loading ? "loading data..." : null;
    const uploading = this.props.data.loading ? <Loader /> : null;
    const preview = !this.state.loading && !this.props.data.loading
      ? this.state.type === "image"
          ? <img
              alt="preview"
              src={this.state.src}
              className="image-preview"
              id={`fileUploaded${this.props.i}`}
            />
          : <pre className="preview">no preview</pre>
      : null;
    const classes = ["preview-item", this.props.data.loading ? "disabled" : ""]
      .join(" ")
      .trim();

    return (
      <div className={classes}>
        {uploading}
        {loading}
        {preview}
        <div className="file-name spacer">{this.props.data.name}</div>
        <button className="button" onClick={this.props.onRemove}>
          remove
        </button>
        {/*<button className="button" onClick={this.props.onUpload}>
          upload
        </button>*/}
      </div>
    );
  }
}

export default FilePreview;
