"use strict";

const FastPointInPoly = require("./index");
const testData = require("./test-data.json");

const polygons = testData.filter((f) => f.geometry.type === "Polygon");
const points = testData.filter((f) => f.geometry.type === "Point");

test("points connect to the expected polys", () => {
  const finder = new FastPointInPoly(polygons);
  for (const p of points) {
    const poly = finder.find(p);
    const pointG = p.properties.group || null;
    const polyG = poly === null ? null : poly.properties.group;
    expect(polyG).toEqual(pointG);
  }
});
