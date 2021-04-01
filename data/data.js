const fs = require("fs"),
      d3 = require("d3");

fs.readFile("sub.geojson", "utf8", function(error, data) {
  if (error) throw error;
  data = JSON.parse(data)
    .features
    .filter(function(d) {
      return d.properties.STE_CODE16 == "8"
        && d.properties.AREASQKM16 > 0
        && !d.properties.SSC_NAME16.includes("Remainder");
    })
    .map(function(d) {
      d.properties = {
        class: "suburb",
        name: d.properties.SSC_NAME16.replace(" (ACT)", "")
      };
      return d;
    });
  data = {
    type: "FeatureCollection",
    features: data
  };
  fs.writeFile("./suburbs.geojson", JSON.stringify(data), function(error) {
    console.log("suburbs.geojson written");
  });
});
