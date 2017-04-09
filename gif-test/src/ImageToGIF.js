import React, {Component} from "react";

class ImageToGIF extends Component {
  createImageToGIF() {
    gifshot.createGIF(
      {
        images: [
          "http://i.imgur.com/2OO33vX.jpg",
          "http://i.imgur.com/qOwVaSN.png",
          "http://i.imgur.com/Vo5mFZJ.gif"
        ]
      },
      function(obj) {
        if (!obj.error) {
          var image = obj.image, animatedImage = document.createElement("img");
          animatedImage.src = image;
          document.body.appendChild(animatedImage);
        }
      }
    );
  }
  render() {
    return (
      <div>
        Image
      </div>
    );
  }
}
