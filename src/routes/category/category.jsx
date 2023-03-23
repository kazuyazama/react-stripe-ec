import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CollectionsContext } from "../../context/collections";
import ProductCard from "../../components/product-card/product-card";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();

  const { collections } = useContext(CollectionsContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(collections[category]);
  }, [category, collections]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
