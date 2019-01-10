---
layout: post
title: Voronoi this page!
date: 2019-01-09 12:00:00
tag: weird
scripts:
    - "https://unpkg.com/d3-delaunay@4.1.5/dist/d3-delaunay.js"
    - "/scripts/voronoi.js"
---

Press this button to overlay a [Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) over this page, using the links and input tags on this page as points.

<input type="button" onClick="drawVoronoi()" value="Voronoi me!"/>
<input type="button" onClick="eraseVoronoi()" value="Erase"/>

Little red dots are drawn over the points, which are the centers of the bounding boxes of the links and inputs. If your screen is resized small enough, then the link text may wrap, causing the center to appear to exist off of any particular point. The diagram is recalculated on resize.

Originally I wanted to do this on all HTML elements, not just links, but since most elements like divs are block display by default, their centers are often far from the actual content of the element.


