export const productFamilyDictionnary = ({
    product_type,
  }: {
    product_type: string;
  }) => {
    const productDictionnary: { [key: string]: string } = {
      PV: "Solaire",
      PACAIRO: "Chauffage",
      PACAIRAIR: "Chauffage",
      CET: "Eau Chaude",
      BALLON: "Eau Chaude",
      ITE: "Isolation",
      ISO: "Isolation",
      ISOA: "Isolation",
      ISOP: "Isolation",
      ZATTENTE: "Chauffage",
      VMC: "VMC",
      AUTRE: "Autre",
    };
  
    return productDictionnary?.[product_type] || product_type;
  };