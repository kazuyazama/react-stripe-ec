import { createContext, useEffect, useState } from "react";

import {
  getCollectionsAndDocuments
} from "../firebase";

export const CollectionsContext = createContext({
  collections: [],
  setCollections: () => [],
});

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  // useEffect(() => {
  //   addCollectionAndDocuments("collections", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCollectionsMap = async () => {
      const collectionMap = await getCollectionsAndDocuments();
      console.log(collectionMap);
      setCollections(collectionMap)
    };
    getCollectionsMap()
  }, []);

  const value = { collections, setCollections };

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
};
