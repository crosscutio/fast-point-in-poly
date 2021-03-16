# fast-point-in-poly

Simple API for doing point and polygon checks on large sets of polygons. Most useful when doing MANY checks.

## Usage

```js
const FastPointInPoly = require('fast-point-in-poly');

const polygons = [...] // List of GeoJSON Polygon Features
const point { ... } // GeoJSON Point Feature

const index = new FastPointInPoly(polygons);

const poly = index.find(point);
```

## Speed

This libraray's speed comes from converting the input polygons to points and putting those points in a wicked fast [KDBush](https://github.com/mourner/kdbush) index. This index allows us to use [geokdbush](https://github.com/mourner/geokdbush) to sort the polygons points by their distance from the point passed to find. With this sorted list we then do a basic [turf.booleanPointInPolygon](http://turfjs.org/docs/#booleanPointInPolygon) check and return the first polygon which passes the check. How this index works may change in the future as we build up perf tests and find more robust ways to perform this check.

## API

### constructor(features)

Constructs an index of the provided features that can be searched.

- **features** is an array of [GeoJSON Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6) [Features](https://tools.ietf.org/html/rfc7946#section-3.2).

### find(point)

Returns the first polygon in the index which contains the passed point.

- **point** is a [GeoJSON Point](https://tools.ietf.org/html/rfc7946#section-3.1.2) [Feature](https://tools.ietf.org/html/rfc7946#section-3.2).
