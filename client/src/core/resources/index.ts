
export function configure(aurelia) {
  const path = "converters/";
  //const pathUtils = "utils/";

  aurelia.globalResources(
    `${path}currency-format`,
    `${path}date-format`,
    `${path}markdown`,
    `${path}number-format`,
    `${path}file-size`,
    `${path}object-to-array`,
    `${path}rgb-to-hex`,
    `${path}sort`,
    `${path}source`,
    `${path}take`,
    `${path}upper`,
    `${path}date-timesince`,
    `${path}default-value`,
    `${path}numeric-filesizeformat`,
    `${path}object-keys`,
    `${path}sort-array`,
    `${path}string-capitalize`,
    `${path}string-cut`
    //`${pathUtils}blur-image`
  );

}
