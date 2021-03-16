"use strict";

const KDBush = require("kdbush");
const geokdbush = require("geokdbush");
const pointInPoly = require("@turf/boolean-point-in-polygon").default;
const centerPoint = require("@turf/center-of-mass").default;

class FastPointInPoly {
  constructor(features) {
    this.features = features;
    this.points = features.map((f, idx) => {
      const cp = centerPoint(f);
      return {
        idx,
        lon: cp.geometry.coordinates[0],
        lat: cp.geometry.coordinates[1],
      };
    });

    this.index = new KDBush(
      this.points,
      (p) => p.lon,
      (p) => p.lat
    );
  }

  find(point) {
    const [x, y] = point.geometry.coordinates;
    const around = geokdbush.around(this.index, x, y);
    for (let i = 0; i < around.length; i++) {
      const poly = this.features[around[i].idx];
      if (pointInPoly(point, poly)) return poly;
    }
    return null;
  }
}

module.exports = FastPointInPoly;
