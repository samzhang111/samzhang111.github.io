---
layout: post
title: A visualization of a geometric bound on convex hulls
date: 2018-06-12 12:00:00
tag: viz
scripts:
    - "https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js"
    - "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"
    - "/scripts/convexhullcircles.js"
styles:
    - "https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css"
---

This is an interactive visualization (in $\mathbb{R}^2$) of the main lemma in the paper [A geometric inequality and the complexity of computing volume](https://link.springer.com/article/10.1007/BF02187701) by György Elekes.

The lemma states that for any finite set $V \subset \mathbb{R}^n$, one has \\[\text{conv}(V) \subset \bigcup_{v \in V} B(v/2, \vert\vert v \vert\vert/2)\\]

where $B(x, r)$ is the ball of radius $r$ at $x$.

In the visualization, you can see how the convex hull of the points is contained in the yellow "balls" centered at the midpoint between each point and the origin (and you can drag the points around too). As a visual hint why this might be true, I drew out the perpendicular bisectors between the origin to the line segments of the hull, which coincides exactly with where the balls intersect.

**Warning**: the convex hull is not recalculated as the points move, so you can break the visualization very easily! Refresh the page to get a new set of points.

<div id="jxgbox" class="jxgbox" style="width:500px; height:500px">
</div>

The relative size of a ball of fixed radius inside a unit ball decreases exponentially with respect to the unit ball as dimensionality increases, so this provides an upper bound on the relative size of the convex hull of $n$ points in $N$ dimensions as well. This is the main theorem of the paper.

I came across this as Exercise 1.1 in Chapter 2 of [Mathematics++](https://www.ams.org/publications/authors/books/postpub/stml-75) by Ida Kantor, Jiří Matoušek, and Robert Šámal. The authors mention that better bounds are known.
