import React, {Component} from "react";

import FileUpload from "./FileUpload";
import VideoToGif from "./VideoToGif";

class App extends Component {
  render() {
    return (
      <div>
        <FileUpload
          multiple={true}
          name="example-upload"
          maxSize={300000}
          label="Create GIF from Image Files"
          accept="image/jpeg, image/png, image/gif"
        />
        <VideoToGif />
      </div>
    );
  }
}

export default App;
