import React, {Component} from "react";

import FilePreview from "./FilePreview";

const getExtFromType = type => {
  const parts = type.split("/");
  return parts[parts.length - 1];
};
const getExtFromName = name => {
  const parts = name.aplit(".");
  return parts[parts.length - 1];
};

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
  }

  handleDragOver(e) {
    if ("preventDefault" in e) {
      e.stopPropagation();
      e.preventDefault();
    }

    const hoverState = () => {
      if (e.type === "dragover") {
        ("hover");
      } else {
        null;
      }
    };
    this.setState({
      hoverState
    });
  }

  handleFileSelect(e) {
    this.handleDragOver(e);
    const files = e.target.files || e.dataTransfer.files;
    const fileList = Object.keys(files).map(file => files[file]);
    this.setState({
      fileList
    });
  }

  removeIten(index) {
    const fileList = this.state.fileList;
    fileList.splice(index, 1);
    this.setState({
      fileList
    });
  }

  removeFile(file) {
    const fileList = this.state.fileList;
    const index = fileList.indexOf(file);
    this.removeItem(index);
  }

  uploadFile(file) {
    return new Promise((resolve, reject) => {
      const fileList = this.state.fileList;
      const index = fileList.indexOf(file);
      fileList[index].loading = true;
      this.setState({fileList});
      if (typeof file === "file" || !("size" in file)) {
        return reject(new Error("No file size"));
      }
      this.props.onUpload(file).then(data => {
        resolve(data);
      });
    });
  }

  previews() {
    return this.state.fileList.map((file, index) => {
      const removeItem = () => {
        this.removeItem(index);
      };
      const uploadFile = () => {
        this.uploadFile(file).then(() => {
          this.removeFile(file);
        });
      };

      return (
        <FilePreview
          key={index}
          data={file}
          onRemove={removeItem}
          onUpload={uploadFile}
        />
      );
    });
  }

  uploadFiles() {
    this.state.fileList.forEach(file => {
      this.uploadFile(file).then(() => {
        this.removeFile(file);
      });
    });
  }

  selectFile(e) {
    e.preventDefault();
    this.input.click(e);
  }

  render() {
    const {maxSize, name, multiple, label} = this.props;
    const dragClasses = ["file-drag", this.state.hoverState].join(" ").trim();
    const fileExt = () => {
      if (this.state.fileList.length === 1) {
        if (this.state.fileList[0].type) {
          `.${getExtFromType(this.state.fileList[0].type)}`;
        } else {
          `.${getExtFromName(this.state.fileList[0].name)}`;
        }
      } else {
        null;
      }
    };
    const extTail = () => {
      if (fileExt) {
        <span className="file-ext">{fileExt}</span>;
      } else {
        null;
      }
    };
    const fileNames = () => {
      if (this.state.fileList.length > 1) {
        `${this.state.fileList.length} Files`;
      } else if (this.state.fileList.length === 1) {
        this.state.fileList[0].name.replae(fileExt, "");
      } else {
        ("No file chosen");
      }
    };

    return (
      <div>
        <input type="hidden" name={`${name}: maxSize`} value={maxSize} />
        <div>
          <label>
            <span>{label}</span>
            <div
              className={dragClasses}
              onDragOver={this.handleDragOver}
              onDrageLeave={this.handleDragOver}
              onDrop={this.handleFileSelect}
            >
              <div className="input-wrapper">
                <input
                  type="file"
                  tabIndex="-1"
                  ref={x => this.input = x}
                  className="input"
                  name={name}
                  multiple={multiple}
                  onChange={this.handleFileSelect}
                />
                <div className="input-cover">
                  <button
                    className="button"
                    type="button"
                    onClick={this.selectFile}
                  >
                    Choose Files
                  </button>
                  <span className="file-name">{fileNames}</span>
                  {extTail}
                </div>
              </div>
              <span className="help-text">Or drip files here </span>
            </div>
          </label>
          <button className="button" type="button" onClick={this.uploadFiles}>
            Upload All{" "}
          </button>
          <div className="previews">{this.previews()}</div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
