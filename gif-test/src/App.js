import React, {Component} from "react";

import FileUpload from "./FileUpload";

class App extends Component {
  render() {
    return (
      <div>
        <FileUpload
          multiple={true}
          name="example-upload"
          maxSize={300000}
          label="Upload Files"
        />
      </div>
    );
  }
}

export default App;
