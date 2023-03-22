import React from "react";
import CategoryItem from "../category-item/category-item";
import "./direcory.scss";

const Directory = ({categories}) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;