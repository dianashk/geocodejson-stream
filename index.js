var jsonstream = require('jsonstream');

var collection = '{"type":"FeatureCollection",';
var features = '"features":[';
var endFeatures = ']';
var endCollection = '}';

/**
 * Initialize a through stream that will take in
 * geojson formatted text and produce a stream containing
 * the geocoding object from the main scope of the input.
 *
 * @returns {Stream}
 */
module.exports.parseGeocoding = function() {
  return jsonstream.parse('geocoding');
};

/**
 * Initialize a through stream that will take in
 * geojson formatted text and produce a stream containing
 * the feature ojects in the features array from the main
 * scope of the input.
 *
 * @returns {Stream}
 */
module.exports.parse = function() {
  return jsonstream.parse('features.*');
};

/**
 * Initialize a through stream that will take in geojson objects
 * and produce a text stream of geojson format.
 * The object provided in the geocoderInfo parameter will be
 * added to the main scope of the resulting geojson.
 *
 * @param {object} geocoderInfo
 * @returns {Stream}
 */
module.exports.stringify = function(geocoderInfo) {
  return jsonstream.stringify(openTemplate(geocoderInfo), '\n,\n', closeTemplate());
};

/**
 *  |||                     |||
 *  VVV   Helper functions  VVV
 */


function openTemplate(geocoderInfo) {
  var res = collection;
  if (geocoderInfo) {
    res += '"geocoding":' + JSON.stringify(geocoderInfo) + ',';
  }
  res += features;
  return res;
}

function closeTemplate() {
  return endFeatures + endCollection;
}