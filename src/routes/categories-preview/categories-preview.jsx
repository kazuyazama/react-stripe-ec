import { useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview";
import { CollectionsContext } from "../../context/collections";

const CategoriesPreview = () => {
  const { collections } = useContext(CollectionsContext);
  return (
    <>
      {Object.keys(collections).map((title) => {
        const products = collections[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
