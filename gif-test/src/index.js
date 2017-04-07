import React, {Component} from "react";
import ReactDOM from "react-dom";

import "./FileUploadStyle.css";
import FilePreview from "./FilePreview";

// const uploadFileToServer = file => {
//   const delay = file.size / 100;
//   return new Promise((resolve, reject) => {
//     setTimeout(
//       () => {
//         resolve();
//       },
//       delay
//     );
//   });
// };

// const getExtFromType = type => {
//   const parts = type.split("/");
//   return parts[parts.length - 1];
// };
// const getExtFromName = name => {
//   const parts = name.split(".");
//   return parts[parts.length - 1];
// };

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    };
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeFile = this.removeFile.bind(this);
    //this.uploadFile = this.uploadFile.bind(this);
    //this.uploadFiles = this.uploadFiles.bind(this);
    this.previews = this.previews.bind(this);
    this.selectFile = this.selectFile.bind(this);
  }

  handleDragOver(e) {
    if ("preventDefault" in e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const hoverState = e.type === "dragover" ? "hover" : null;
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

  removeItem(index) {
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

  // uploadFile(file) {
  //   return new Promise((resolve, reject) => {
  //     const fileList = this.state.fileList;
  //     const index = fileList.indexOf(file);
  //     fileList[index].loading = true;
  //     this.setState({fileList});
  //     if (typeof file === "file" || !("size" in file)) {
  //       return reject(new Error("No file size"));
  //     }
  //     this.props.onUpload(file).then(data => {
  //       resolve(data);
  //     });
  //   });
  // }

  previews() {
    return this.state.fileList.map((file, index) => {
      const removeItem = () => {
        this.removeItem(index);
      };
      // const uploadFile = () => {
      //   this.uploadFile(file).then(() => {
      //     this.removeFile(file);
      //   });
      // };
      return <FilePreview key={index} data={file} onRemove={removeItem} />;
    });
  }

  // uploadFiles() {
  //   this.state.fileList.forEach(file => {
  //     this.uploadFile(file).then(() => {
  //       this.removeFile(file);
  //     });
  //   });
  // }

  selectFile(e) {
    e.preventDefault();
    this.input.click(e);
  }

  render() {
    const {maxSize, name, multiple, label} = this.props;
    const dragClasses = ["file-drag", this.state.hoverState].join(" ").trim();
    // const fileExt = this.state.fileList.length === 1
    //   ? this.state.fileList[0].type
    //       ? `.${getExtFromType(this.state.fileList[0].type)}`
    //       : `.${getExtFromName(this.state.fileList[0].name)}`
    //   : null;
    // const extTail = fileExt
    //   ? <span className={styles.fileExt}>{fileExt}</span>
    //   : null;
    const fileNames = this.state.fileList.length >= 1
      ? `${this.state.fileList.length} Files`
      : "No file Chosen";

    return (
      <div>
        <input type="hidden" name={`${name}:maxSize`} value={maxSize} />
        <div>
          <label>
            <span>{label}</span>
            <div
              className={dragClasses}
              onDragOver={this.handleDragOver}
              onDragLeave={this.handleDragOver}
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
                  <span className="fileName">{fileNames}</span>
                  {/*{extTail}*/}
                </div>
              </div>
              <span className="help-text">or drop files here</span>
            </div>
          </label>
          <button className="button" type="button" onClick={this.uploadFiles}>
            Create GIF
          </button>
          <div className="previews">{this.previews()}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <FileUpload
    multiple={true}
    name="example-upload"
    maxSize={300000}
    label="Upload Files"
  />,
  document.getElementById("app")
);
