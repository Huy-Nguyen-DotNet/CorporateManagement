import React from 'react';

const WidgetAdvertisement = ({ adImage, adLink }) => {
  return (
    <div className="widget no-container rounded text-md-center">
      <span className="ads-title">- Sponsored Ad -</span>
      <a href={adLink} className="widget-ads">
        <img src={adImage} alt="Advertisement" />
      </a>
    </div>
  );
};

export default WidgetAdvertisement;
