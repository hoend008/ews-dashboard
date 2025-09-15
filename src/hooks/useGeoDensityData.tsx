const createMapData = (geodata: any, densityData: any) => {
  // loop over geodata.features
  for (const key in geodata.features) {
    // get code3 from geodata features
    let iso_a3 = geodata.features[key].properties.iso_a3.toLowerCase();

    // find corresponding match in densityData and get index
    let countryIndex = densityData
      .map((country: any) => country["iso_a3"])
      .indexOf(iso_a3);

    // if an index if found, update geodata.features
    if (countryIndex > 0) {
      geodata.features[key].properties.density =
        densityData[countryIndex].density;
    } else {
      geodata.features[key].properties.density = null;
    }
  }

  return geodata;
};

export default createMapData;
