import React, {Component} from "react";
import FileUpload from "./FileUpload";

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
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  getDefaultPreops() {
    return {
      onRemove: () => {}
    };
  }

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
    const type = () => {
      if (data.type.match("text")) {
        ("text");
      } else if (data.type.match("image")) {
        ("image");
      } else {
        data.type;
      }
    };
    reader.onload = e => {
      const src = e.target.result;
      this.setState({
        src,
        type,
        loading: false
      });
    };
    if (type === "text") {
      reader.readAsText(data);
    } else if (type === "image") {
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
    const loading = () => {
      if (this.state.loading) {
        ("loading data...");
      } else {
        null;
      }
    };
    const uploading = () => {
      if (this.props.data.loading) {
        <Loader />;
      } else {
        null;
      }
    };
    const preview = () => {
      if (!this.state.loading && !this.props.data.loading) {
        if (this.state.type === "text") {
          <pre className="preview">{this.state.src}</pre>;
        } else if (this.state.type === "image") {
          <img alt="preview" src={this.state.src} className="image-preview" />;
        } else {
          <pre className="preview"> no preview </pre>;
        }
      } else
        null;
    };
    const classes = ["preview-itme", this.preops.data.loading ? "disabled" : ""]
      .join(" ")
      .trim();

    return (
      <div className={classes}>
        {uploading}
        {loading}
        {preview}
        <div className="file-name-stretch">
          {this.props.data.name}
        </div>
        <button className="button" onClick={this.props.onRemove}>Remove</button>
        <button className="button" onClick={this.props.onUpload}>
          Upload
        </button>
      </div>
    );
  }
}

export default FilePreview;