var stream = require('stream');
var should = require('should');
var GeocodeJsonStream = require('../');
var through = require('through2');

describe('geocodejson-stream.parse', function () {
  it('should parse geojson and stream features', function (done) {

    var collection  = {
      type: 'FeatureCollection',
      features: [
        {type: 'Feature', properties: {foo: 'one'}},
        {type: 'Feature', properties: {foo: 'two'}}
      ]
    };

    var count = 0;

    var inStream = makeReadableStream();
    inStream
      .pipe(GeocodeJsonStream.parse())
      .pipe(through.obj(function (data, enc, next) {
        data.properties.should.have.property('foo');
        count++;
        next();
      }))
      .on('finish', function () {
        count.should.eql(collection.features.length);
        done();
      });

    inStream.push(JSON.stringify(collection));
    inStream.push(null);
  });

  it('should parse geojson and stream geocoding properties', function (done) {

    var collection  = {
      type: 'FeatureCollection',
      geocoding: {
        version: '0.0.3',
        license: 'ODbL'
      },
      features: [
        {type: 'Feature', properties: {foo: 'one'}},
        {type: 'Feature', properties: {foo: 'two'}}
      ]
    };

    var inStream = makeReadableStream();
    inStream
      .pipe(GeocodeJsonStream.parseGeocoding())
      .pipe(through.obj(function (data, enc, next) {
        data.should.eql(collection.geocoding);
        next();
        done();
      }));

    inStream.push(JSON.stringify(collection));
    inStream.push(null);
  });

});

function makeReadableStream() {
  var inStream = new stream.Readable();
  inStream._read = function noop() {};
  return inStream;
}