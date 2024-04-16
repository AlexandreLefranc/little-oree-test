import styled from "styled-components";
import { IProduct } from "../../interfaces/interfaces";
import { DSColors } from "../../styles/variables";
import { productImageDictionnary } from "../../services/productImageDictionnary";
import { productNameDictionnary } from "../../services/productNameDictionnary";
import { productFamilyDictionnary } from "../../services/productFamilyDictionnary";

interface ProductCardProps {
    product: IProduct
}

const Wrapper = styled.div`
    text-align: left;
    width: 286px;
    height: 408px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${DSColors.ABLight06};
    border: 2px solid ${DSColors.AssuranceBlue};
    border-radius: 8px;
    padding: 20px;
    gap: 25px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TitleWrapper = styled.div`
    font-family: "Pulp Display", sans-serif;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const FamilyText = styled.p`
    font-size: 10px;
    line-height: 10px;
    text-transform: uppercase;
    color: ${DSColors.SGLight01};
`;

const NameText = styled.p`
    font-size: 18px;
    line-height: 18px;
    color: ${DSColors.OffBlack};
`;

const CharacteristicsWrapper = styled.div`
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 18.23px;
    color: ${DSColors.OffBlack};
`;

const PriceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Pulp Display", sans-serif;
    font-weight: 700;
    color: ${DSColors.OffBlack};
    gap: 8px;
`

const PriceText = styled.p`
    font-size: 24px;
    line-height: 24px;
`;

const HelpText = styled.p`
    font-size: 16px;
    line-height: 16px;
`;

export function ProductCard({ product }: ProductCardProps) {
    const characteristicsArray = product.characteristics
        ? Object.entries(product.characteristics).map(e => <p key={e[0]}>{e[0]} : {e[1]}</p>)
        : null;

    const helpValue = product.helps
        ? Object.entries(product.helps).reduce((acc, curr) => acc + curr[1], 0)
        : null;

    return <Wrapper>
        <ImageWrapper>
            <img
                width="195px"
                height="170px"
                src={productImageDictionnary({ product_type: product.category })}
                alt={product.category}
            />
        </ImageWrapper>

        <TitleWrapper>
            <FamilyText>{productFamilyDictionnary({ product_type: product.category })}</FamilyText>
            <NameText>{productNameDictionnary({ product_type: product.category })}</NameText>
        </TitleWrapper>

        <CharacteristicsWrapper>
            {characteristicsArray}
        </CharacteristicsWrapper>

        <PriceWrapper>
            <PriceText>{product.price} €</PriceText>
            {helpValue && <HelpText>Aide : { helpValue } €</HelpText>}
        </PriceWrapper>

    </Wrapper>;
}