import React, { Component } from "react";

import Youtube from "youtube.com";
import ffmpeg from "fluent-ffmpeg"

const youtube = Youtube('http://www.youtube.com/watch?v=ategZqxHkz4');

class YoutubeGif extends Component {
    constructor() {
        super();
        this.state = {
            youtube: "Youtube('http://www.youtube.com/watch?v=ategZqxHkz4')"
        }
        this.Crop = this.Crop.bind(this);
        this.Gif = this.Gif.bind(this);
    }
    Crop(youtube) {
        youtube = this.state.youtube;
        youtube.crop('0:05', '0:25', './file.mp4').then(function () {
            console.log("Done");
        }).catch(function (err) {
            console.log("err : ", err)
        });
    }

    Gif(youtube) {
        youtube = this.state.youtube;
        youtube.gif('0:05', '0:35', './file.gif').then(function () {
            document.getElementById("video-result").src = "./file.gif";
            console.log("Done");
        }).catch(function (err) {
            console.log("err : ", err)
        });
    }

    render() {

        return (
            <div>
                <button className="button" onClick={this.Gif}>Create GIF</button>
                <div className="gif-container">
                    <img id="video-result" className="image-gif-preview" />
                </div>
            </div>
        )
    }
}

export default YoutubeGif;