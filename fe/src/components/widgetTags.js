import React from 'react';

const WidgetTags = () => {
  const tags = [
    '#T1VoDich',
    '#Faker',
    '#T1',
    '#BLG',
    '#ZOFGK',
  ];

  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title">Tag Clouds</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>
      <div className="widget-content">
        {tags.map((tag, index) => (
          <a key={index} href="#" className="tag">
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
