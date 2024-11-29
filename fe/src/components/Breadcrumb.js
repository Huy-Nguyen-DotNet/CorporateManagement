import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ categories }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === categories.length - 1 ? "active" : ""
            }`}
            aria-current={index === categories.length - 1 ? "page" : undefined}
          >
            {index === categories.length - 1 ? (
              category.name
            ) : (
              <Link to={category.link}>{category.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
