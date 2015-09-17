
export function configure(aurelia) {
  const path = "converters/";
  //const pathUtils = "utils/";

  aurelia.globalResources(
    `${path}currency-format`,
    `${path}date-format`,
    `${path}markdown`,
    `${path}number-format`,
    `${path}object-to-array`,
    `${path}rgb-to-hex`,
    `${path}sort`,
    `${path}source`,
    `${path}take`,
    `${path}upper`  
    //`${pathUtils}blur-image`
  );

}
