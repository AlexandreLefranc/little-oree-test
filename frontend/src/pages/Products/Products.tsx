import { useEffect, useState } from "react";

//Style import
import "./Products.scss";

// Components imports
import { CTAButton } from "../../components/CTAButton/CTAButton";
import { Layout } from "../../components/Layout/Layout";

// Services imports
import { useDisconnectApp } from "../../services/useDisconnectApp";
import { useAxiosGet } from "../../services/useAxiosGet";
import { IProduct } from "../../interfaces/interfaces";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import styled from "styled-components";

const ProductList = styled.div`
  width: 100%;
  gap: 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const { disconnectApp } = useDisconnectApp();
  const { axiosGetRequest, isLoading, errorMessage } = useAxiosGet();

  useEffect(() => {
    axiosGetRequest<IProduct[]>(`${process.env.REACT_APP_SERVER_URL}/products`)
      .then((response) => {
        if (response) {
          console.log({response: response.data});
          setProducts(response.data)
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Should not mute warnings. 

  const productCards = products.map((product) => {
    return <ProductCard key={product.id} product={product}></ProductCard>
  });

  return (
    <Layout>
      <div className="Products">
        <div className="Products__left">
          <div>email from redux</div>
          <h1>Mon projet de rénovation</h1>
        </div>
        <CTAButton name="Se déconnecter" onClick={disconnectApp} size="M" />
      </div>
      {isLoading && <p>Loading</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <ProductList>
        {productCards}
      </ProductList>
    </Layout>
  );
};
