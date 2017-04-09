import React, {Component} from "react";

import gifshot from "../demo/js/dependencies/gifshot";

class VideoToGif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: ""
    };
    this.createVideoToGif = this.createVideoToGif.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createVideoToGif(e) {
    e.preventDefault();
    const videoUrl = this.state.videoUrl;
    console.log(videoUrl);

    gifshot.createGIF(
      {
        video: videoUrl
      },
      function(obj) {
        if (!obj.error) {
          const image = obj.image,
            //var image = obj.image, animatedImage = document.createElement("img");
            //animatedImage.src = image;
            gifResult = document.getElementById("video-result");
          gifResult.src = image;
          //document.body.appendChild(animatedImage);
        }
      }
    );
  }

  handleChange(e) {
    this.setState({
      videoUrl: e.target.value
    });
  }

  render() {
    return (
      <div>
        <br />
        <hr />
        <form onSubmit={this.createVideoToGif}>
          <p> Youtube Video URL을 입력하세요. </p>
          <input
            className="video-input"
            type="text"
            placeholder="Youtube Video URL"
            value={this.state.videoUrl}
            onChange={this.handleChange}
            required
          />
          {/*<button className="button" type="submit" value="Submit">Submit</button>*/}
          <br /><br />
          <button className="button" type="submit">
            Create GIF
          </button>
          <br />
        </form>
        <div className="gif-container">
          <img id="video-result" className="image-gif-preview" />
        </div>
      </div>
    );
  }
}

export default VideoToGif;
