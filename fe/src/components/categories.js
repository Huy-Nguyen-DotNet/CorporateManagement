import React from 'react';

const categories = () => {
  const categories = [
    { name: "Lifestyle", count: 5 },
    { name: "Inspiration", count: 2 },
    { name: "Fashion", count: 4 },
    { name: "Politic", count: 1 },
    { name: "Trending", count: 7 },
    { name: "Culture", count: 3 },
  ];

  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title">Explore Topics</h3>
        <img src="/images/wave.svg" className="wave" alt="wave" />
      </div>
      <div className="widget-content">
        <ul className="list">
          {categories.map((category, index) => (
            <li key={index}>
              <a href="#">{category.name}</a>
              <span>({category.count})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
