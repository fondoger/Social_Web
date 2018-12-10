import React, { Component } from 'react';

const MARGIN = 3;
const SIZE = 120;

export default class ImageCard extends Component {
    render() {
        return <NineSquares images={this.props.images}/>
    }
}

const NineSquares = ({images}) => {
    let imageRows = [];
    const nums = [-1, 1, 2, 3, 4, 3, 3, 4, 4, 3];
    const num = nums[images.length];
    const width = SIZE * num + 2 * MARGIN * num ;
    return (
    <div style={{marginLeft: 82, marginTop: 0, marginBottom: 12}}>
      <div style={{display: "flex", flexWrap: "wrap", width: width, margin: -MARGIN}}>
        { images.map((image, index) =>(
            <div key={index.toString()} style={{width: SIZE, height: SIZE, backgroundColor: '#ddd', 
                borderWidth: 1, borderColor: "#f6f6f6", margin: MARGIN,
                borderStyle: "solid",
                backgroundImage:`url(${image ? image.uri: null}`,
                backgroundSize: "cover"}}>
            </div>
        ))}
      </div>

    </div>

    )
}