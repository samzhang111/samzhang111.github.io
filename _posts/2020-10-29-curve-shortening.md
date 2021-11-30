---
layout: post
title: Curve shortening
date: 2020-10-29 01:44:00
tag: geometry
description: Deform a curve with a discrete curve shortening flow.
thumbnail: shortening.png
fullscreen: /html/fullscreen/curve-shortening.html
scripts:
    - "/scripts/mathbox-bundle.min.js"
    - "/scripts/jsxgraphcore-0.99.7.js"
    - "/scripts/chroma.min.js"
    - "/scripts/curve-shortening.bundle.js"
styles:
    - "/css/jsxgraph-0.99.7.css"
    - "/css/mathbox.css"
source: https://github.com/samzhang111/curve-shortening
---


<div style="display: flex; width: 1020px; margin: 2em 0; justify-content:space-between; border: 3px solid black; border-radius: 30px">
<div id="control" style="flex:0 1 auto;width: 500px;height:500px;border-right: 3px solid black"></div>
<div id="curve-2d" style="flex:0 1 auto;width: 500px;height:500px;border: none;"></div>
</div>

[Full screen version](/html/fullscreen/curve-shortening). 

Suppose you had a smooth curve $C(s, t)$ parameterized by arclength and time, and you decided to continuously deform $C$ through time analogously to the heat equation. That is, parts of the curve with high curvature are very "hot" and would like to flow toward the "cold" parts that have negative curvature. We set

\\[\frac{\partial C}{\partial t} = \frac{\partial^2 C}{\partial^2 s} = \kappa n\\]

where $\kappa$ is the curvature and $n$ is the unit normal vector to the curve, so that the curve is shortened, and parts of the curve with larger curvature are shortened more. This is called [curve shortening](https://en.wikipedia.org/wiki/Curve-shortening_flow), and it leads to deep areas of geometric analysis. One major result is the [Gage-Hamilton-Grayson theorem](https://en.wikipedia.org/wiki/Curve-shortening_flow#Gage%E2%80%93Hamilton%E2%80%93Grayson_theorem), which states that under the curve shortening flow, simple closed curves remain smoothly embedded without self-intersections until they become convex, after which they stay convex, before converging to a circle as the curve shrinks to a point. 

But how do we implement curve shortening on a computer? Many discretizations have been proposed, and here we implement a particular algorithm proposed by [Chow and Glickenstein (2007)](https://www.jstor.org/stable/27642194?seq=1#metadata_info_tab_contents). The procedure is analogous to the continuous case, except since we have a polygon instead of a smooth curve, we do not have a "curvature" at any point. Instead, we approximate the normal vector for the vertex $x_{i, t}$ by setting 

\\[n_{i, t} = (x_{i+1, t} - x_i) + (x_{i-1, t} - x_{i, t})\\]

and performing the discrete update step 

\\[x_{i, t+1} = x_{i, t} + \delta n_{i, t}\\]

for some step size $\delta > 0$.

Do we have the equivalent of the Gage-Hamilton-Grayson theorem for this discrete curve shortening flow? Not in its entirety. Some results are known, such as that the curve shortens to a point, and it is asympototically an affine transformation of a regular polygon. But a key piece still unknown is whether a curve that starts without self-intersections will remain without self-intersections for each time step, for sufficiently small $\delta$.

In the visualization above, there are parameters to control $\delta$, the number of iterations, and the number of points on the polygon. I did not worry at all about numerical issues, as you might discover! The points on the polygon can of course be moved. The visualization on the right is actually an interactive three-dimensional figure shown with a top-down view. The temporal aspect of the curve-shortening flow is portrayed in color, but also in height, since one can consider the flow as slices in time of a higher dimensional object. I reparameterized the height to be spaced out in the earlier steps since the beginning steps of the algorithm are some of the more interesting. As for all the 3D stuff on this blog, the [full screen version](/html/fullscreen/curve-shortening) is much more satisfying than the tiny figures above.

I was tempted into making this thanks to the beautiful pictures in [Discrete and Computational Geometry, by Satyan Devadoss and Joseph O'Rourke](https://press.princeton.edu/books/hardcover/9780691145532/discrete-and-computational-geometry).
