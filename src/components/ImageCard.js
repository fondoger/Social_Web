import React, { Component } from 'react';
import Lightbox from 'react-images';

const MARGIN = 3;
const SIZE = 120;

export default class ImageCard extends Component {
    state = { isLightboxOpen: false, currentImage: 0 };
    render() {
        const { isLightboxOpen, currentImage } = this.state;
        return (
            <div>
                <NineSquares 
                    images={ this.props.images } 
                    onImageClick={ this.handleImageOnClick }/>
                <Lightbox
                    images={ this.props.images.map(image => ({
                        src: image.bigUri, 
                        thumbnail: image.uri
                    })) }
                    isOpen={ isLightboxOpen }
                    currentImage={ currentImage }
                    backdropClosesModal
                    showThumbnails
                    onClickPrev={ ()=>this.setState({currentImage: currentImage - 1}) }
                    onClickNext={ ()=>this.setState({currentImage: currentImage + 1}) }
                    onClose={ ()=>this.setState({isLightboxOpen: false}) }
                />
            </div>
        );
    }
    handleImageOnClick = (index) => {
        this.setState({ isLightboxOpen: true, currentImage: index });
    }
}

const NineSquares = ({images, onImageClick}) => {
    let imageRows = [];
    const nums = [-1, 1, 2, 3, 4, 3, 3, 4, 4, 3];
    const num = nums[images.length];
    const width = SIZE * num + 2 * MARGIN * num ;
    return (
    <div style={{marginLeft: 82, marginTop: 0, marginBottom: 12}}>
      <div style={{display: "flex", flexWrap: "wrap", width: width, margin: -MARGIN}}>
        { images.map((image, index) =>(
            <div 
                key={index.toString()} 
                style={{width: SIZE, height: SIZE, backgroundColor: '#ddd', 
                    borderWidth: 1, borderColor: "#f6f6f6", margin: MARGIN,
                    borderStyle: "solid",
                    backgroundImage:`url(${image ? image.uri: null}`,
                    backgroundSize: "cover"}}
                onClick={() => onImageClick(index)}>
            </div>
        ))}
      </div>

    </div>

    )
}