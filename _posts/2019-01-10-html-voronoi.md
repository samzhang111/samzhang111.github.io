---
layout: post
title: Voronoi this page!
date: 2019-01-09 12:00:00
tag: weird
scripts:
    - "https://unpkg.com/d3-delaunay@4.1.5/dist/d3-delaunay.js"
    - "/scripts/voronoi.js"
---

What you are looking at is a [Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) constructed on a canvas laid over this page, using the centers of link and input elements as points. 

<input type="button" onClick="toggleVoronoi()" value="Toggle Voronoi"/>

<input type="button" onClick="eraseVoronoi()" value="Disable"/>

I did this as a whimsical project to interpret DOM elements geometrically, but then I realized it could have some interesting uses for accessibility. So I added the feature where the link text or input value of the currently active Voronoi cell is shown in the upper-right corner, and clicking a cell clicks the corresponding input/link.

You can toggle the outlines of the Voronoi cells themselves using "Toggle Visibility" button (to get a sense for how this would feel deployed as an accessibility tool). Or you can disable it altogether using the "Disable" button.

Little red dots are drawn over the points, which are the centers of the bounding boxes of the links and inputs (these are what go into the Voronoi algorithm). After playing with this for a few minutes, it appears that the long links are hard to click in this model, since the center does not expand with the size of the link. What may be better is to use the known extension of the Voronoi algorithm over _line segments_, and to model each input as a segment instead.

The source code is on Github [here](https://github.com/samzhang111/html-voronoi).  There is nothing actually specific about this code for my website, so I will soon make this into a bookmarklet!
