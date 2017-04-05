import React, {Component} from "react";
//import logo from "./logo.svg"
import logo from "./images/sloing_gif.gif";
import FileUpload from "./FileUpload";
import styled from "styled-components";

const AppContainer = styled.div`
  text-align: center;
`;
const AppHead = styled.header`
  background-color: #222;
  height: 150px;
  padding: 100px;
  color: white;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  /*${({warn, danger}) => {
  if (warn) return `
      background: coral;
      color: black;
    `;
  if (danger) return `
      background: red;
      color: black;
    `;
  return `
      background: palevioletred;
      color: white;
    `;
}}*/

  background: palevioletred;
  color: white;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const ImgBox = styled.img`
  width: 300px;
  height: 300px;
  border: 1px solid #ffffff;
 `;

const Logo = styled.img`
  width: 150px;
`;

//const ImgPreview = styled.img`
//  width: 100px;
//`;

const uploadFileToServer = file => {
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

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppContainer>
        <AppHead>
          <Logo src={logo} alt="logo" />
          <h2> Welcome to GIF Maker </h2>
        </AppHead>
        <Button>
          Click this button and Choose your images
        </Button>
        <Wrapper>
          <ImgBox />
        </Wrapper>
        <FileUpload
          multiple={true}
          name="example-upload"
          maxSize={300000}
          onUpload={uploadFileToServer}
          label="Upload Files"
        />
      </AppContainer>
    );
  }
}

export default App;
