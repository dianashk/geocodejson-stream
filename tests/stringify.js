var should = require('should');
var MemoryStream = require('memorystream');
var GeocodeJsonStream = require('../');


describe('geocodejson-stream.stringify', function () {
  it('should wrap json with geojson FeaturesCollection', function (done) {

    var collection  = {
      type: 'FeatureCollection',
      features: [
        {type: 'Feature', properties: {foo: 'bar'}}
      ]
    };


    var geoStream = GeocodeJsonStream.stringify();
    var memStream = MemoryStream.createWriteStream();

    geoStream.pipe(memStream).on('finish', function () {
      memStream.toString().should.eql(JSON.stringify(collection));
      done();
    });

    geoStream.write(collection.features[0]);
    geoStream.end();
  });

  it('should inject geocoding info when provided', function (done) {

    var collection  = {
      type: 'FeatureCollection',
      geocoding: {
        version: '0.0.3',
        license: 'ODbL'
      },
      features: [
        {type: 'Feature', properties: {foo: 'bar'}}
      ]
    };

    var geoStream = GeocodeJsonStream.stringify(collection.geocoding);
    var memStream = MemoryStream.createWriteStream();

    geoStream.pipe(memStream).on('finish', function () {
      memStream.toString().should.eql(JSON.stringify(collection));
      done();
    });

    geoStream.write(collection.features[0]);
    geoStream.end();
  });
});