import { Component } from "react";
import * as mobilenet from '@tensorflow-models/mobilenet';

class tabbedImages extends Component {
    constructor(props) {
        super(props);

    }
render() {
  let predictions;
  const predictImage = async (image) => {
    console.log("Model loading...");
    const model = await mobilenet.load();
    console.log("Model is loaded!")
    predictions = await model.classify(image);
    console.log('Predictions: ', predictions);
    
   
      
  }
  let images = this.props.images;
  let taggedImages = [];
  
  images = images.forEach((image) => {
  
  await predictImage(image);
  taggedImages.push(
    <div>
      {image}
      <label> {predictions[0].className} </label>
    </div>
    ) 
  })


  return ({taggedImages})
}


}