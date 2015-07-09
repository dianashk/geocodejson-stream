# geocodejson-stream

Stream-based utility for consuming and generating GEOJSON files specifically for 
geocoding needs. see proposed [geocodejson spec](https://github.com/yohanboniface/geocodejson-spec)

### install

`npm install geocodejson-stream`

### usage

##### `stringify(geocoding)`

> geojson feature objects --> geocodejson-stream.stringify(geocoding) --> text

```javascript
var fs = require('fs');
var geocodejson = require('geocodejson-stream');

// provide geocoding properties as the first parameter to stringify
var geoStream = GeocodeJsonStream.stringify({ version: '0.0.3', license: 'ODbL' });

geoStream.pipe(fs.createWriteStream('results.geojson');

geoStream.write({ type: 'Feature', properties: { name: 'USA' }, geometry: {...} });
geoStream.write({ type: 'Feature', properties: { name: 'Canada' }, geometry: {...} });

geoStream.end();
```

will result in...

```javascript
{
  "type": "FeatureCollection",
  "geocoding": {
    "version": "0.0.3",
    "license": "ODbL"
  },
  "features": [
    { "type": "Feature", "properties": { "name": "USA" }, "geometry": {...} },
    { "type": "Feature", "properties": { "name": "Canada" }, "geometry": {...} }
  ]
}
```

#### `parse`

> text --> geocodejson-stream.parse --> geojson feature objects

```javascript
var fs = require('fs');
var through = require('through2');
var geocodejson = require('geocodejson-stream');

fs.createReadStream('results.geojson') // file contents described in stringify documentation
  .pipe(GeocodeJsonStream.parseGeocoding())
  .pipe(through.obj(function (data, enc, next) {
    console.log(data.properties);
    next();
  }));
```

will result in...

```javascript
{ "type": "Feature", "properties": { "name": "USA" }, "geometry": {...} },
{ "type": "Feature", "properties": { "name": "Canada" }, "geometry": {...} }
```

#### `parseGeocoding`

> text --> geocodejson-stream.parseGeocoding --> geocoding object

```javascript
var fs = require('fs');
var through = require('through2');
var geocodejson = require('geocodejson-stream');

fs.createReadStream('results.geojson') // file contents described in stringify documentation
  .pipe(GeocodeJsonStream.parseGeocoding())
  .pipe(through.obj(function (data, enc, next) {
    console.log(data);
    next();
  }));
```

will result in...

```javascript
{
  "version": "0.0.3",
  "license": "ODbL"
}
```

### contribute

- [x] yes please

### license

MIT (see [LICENSE.md](LICENSE.md))

