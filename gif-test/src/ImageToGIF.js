import React, {Component} from "react";
import FileUpload from "./FileUpload";

class ImageToGif extends Component {
  render() {
    return (
      <FileUpload
        multiple={true}
        name="example-upload"
        maxSize={300000}
        label="Upload Files"
      />
    );
  }
}

export default ImageToGif;
