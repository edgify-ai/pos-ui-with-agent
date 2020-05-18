// @flow
import React from 'react';
import './scannedImage.scss';

type Props = {
  currentImage: string,
};

export default ({currentImage}: Props) => (
  <div>
    <div className="cameraPlaceholder">
      {currentImage
        ? <img
            className="scannedItemImage"
            src={`data:image/jpeg;base64,${currentImage}`}
            alt="scanned item"
          />
        : 'There is no image'}
    </div>
  </div>
);
