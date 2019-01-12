---
layout: post
title: Voronoize this page!
date: 2019-01-10 12:00:00
tag: weird
scripts:
    - "/scripts/voronoi-bundle.js"
---

What you are looking at is a [Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) constructed on a canvas laid over this page, using the centers of link and input elements as points. 

<input id="toggle" type="button" onClick="(function() {
    voronoize.toggleVoronoi();
    if (voronoize.showVoronoi) {
        document.getElementById('toggle').value = 'Hide Voronoi lines'
    }
    else {
        document.getElementById('toggle').value = 'Show Voronoi lines'
    }
})()" value="Hide Voronoi lines"/>

<input type="button" onClick="voronoize.eraseVoronoi()" value="Disable"/>

I did this on a whim, but then I realized it could be interesting for accessibility. So I added the feature where the link text or input value of the currently active Voronoi cell is shown in the upper-right corner, and clicking a cell clicks the corresponding input/link.

(On mobile and tablet, touching a cell causes it to become focused, then touching it again activates the element.)

To get a sense for how this would feel as an actual accessibility tool, you can hide the outlines of the Voronoi cells by pressing the "Hide Voronoi lines" button. Or you can disable it altogether using the "Disable" button.

Little red dots are drawn over the points, which are the centers of the bounding boxes of the links and inputs (these are what go into the Voronoi algorithm). After playing with this for a few minutes, it appears that the long links are hard to click in this model, since the center does not expand with the size of the link. What may be better is to use the known extension of the Voronoi algorithm over _line segments_, and to model each input as a segment instead. I don't see any of
the popular Delaunay/Voronoi javascript libraries on github supporting line segments at the moment (although it is implemented in some libraries [in Python](https://github.com/aewallin/openvoronoi)), but a quick workaround could be to just add more points for each element based off its size. 

This uses the library [d3-delaunay](https://github.com/d3/d3-delaunay), which relies on the library [Delaunator](https://github.com/mapbox/delaunator). The source code is on Github [here](https://github.com/samzhang111/html-voronoi).  There is nothing actually specific about this code for my website, so I will soon make this into a bookmarklet!
