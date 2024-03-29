    require([
      "esri/Map",
      "esri/layers/CSVLayer",
      "esri/views/MapView",
      "esri/config",
      "esri/core/urlUtils",
      "dojo/domReady!"
    ], function(
      Map,
      CSVLayer,
      MapView,
      esriConfig,
      urlUtils
    ) {

      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
     var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";
     esriConfig.request.corsEnabledServers.push('https://rawgit.com');

      // Paste the url into a browser's address bar to download and view the attributes
      // in the CSV file. These attributes include:
      // * mag - magnitude
      // * type - earthquake or other event such as nuclear test
      // * place - location of the event
      // * time - the time of the event

        const template = {
          title: "Saint Louis Crime",
          content: "Crime Number: {Crime}, Street: {ILEADSStreet}"
        };

        const csvLayer = new CSVLayer({
          url: url,
          copyright: "USGS Earthquakes",
          popupTemplate: template
        });

        var symbol = {
          type: "simple-marker", 
          color: "red",
          size:"5px"
        };

      csvLayer.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: symbol
      };

      var map = new Map({
        basemap: "hybrid",
        layers: [csvLayer]
      });

    var view = new MapView({
        container: "viewDiv",
        center: [-90.1994, 38.6270], // Longitude, Latitude for Saint Louis
        zoom: 12, // Adjust zoom level as needed
        map: map
    });

  });
