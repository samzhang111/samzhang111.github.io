---
layout: post
title: Curve shortening
date: 2020-10-29 01:44:00
tag: geometry
scripts:
    - "/scripts/mathbox-bundle.min.js"
    - "/scripts/jsxgraphcore-0.99.7.js"
    - "/scripts/chroma.min.js"
    - "/scripts/curveshortening.js"
styles:
    - "/css/jsxgraph-0.99.7.css"
    - "/css/mathbox.css"
---


<div style="display: flex; width: 600px; margin: 3px auto; justify-content:space-between">
<div id="control" style="flex:0 1 auto;width:300px;height:300px;border: 3px solid black"></div>
<div id="curve-2d" style="flex:0 1 auto;width:300px;height:300px;border: none;"></div>
</div>

[Full screen version](/html/fullscreen/curve-shortening). 

[Curve shortening](https://en.wikipedia.org/wiki/Curve-shortening_flow) is a deep area of geometric analysis where a curve is continuously deformed "according to" the heat equation. Many discretizations have been proposed, and here we implement one particular algorithm proposed by [Chow and Glickenstein (2007)](https://www.jstor.org/stable/27642194?seq=1#metadata_info_tab_contents). In the continuous case, we have a [nice theorem](https://en.wikipedia.org/wiki/Curve-shortening_flow#Gage%E2%80%93Hamilton%E2%80%93Grayson_theorem) that says that under the curve shortening flow, simple closed curves remain smoothly embedded without self-intersections until they become convex, after which they stay convex, before converging to a circle as the curve shrinks to a point. The key part of the theorem we would like for our discretization is the first one: that for small enough step sizes ("delta" on the left hand figure), the intermediate polygons also remain without self-intersections if the original polygon has no self-intersections. This is not yet known for this particular algorithm, although some partial results are known. I'll have to come back and actually write out what this algorithm actually does for this to be a fully-fledged blog post, but it's 2 in the morning, and I wanted to put this visualization out there without worrying too much about the text.

As you will see if you play with the parameters, I didn't worry about numerical issues too much (at all).  Note that both figures are interactive, and in particular, the visualization on the right is actually three-dimensional. The temporal aspect of the curve-shortening flow is portrayed in color, but also in height, since one can consider the flow as slices in time of a higher dimensional object. I reparameterized the height to be spaced out further in the earlier steps since the first steps of the algorithm are some of the most interesting. As for all the 3D stuff on this blog, the [full screen version](/html/fullscreen/curve-shortening) is so much better.

I was tempted into making this thanks to the beautiful pictures in [Discrete and Computational Geometry, by Satyan Devadoss and Joseph O'Rourke](https://press.princeton.edu/books/hardcover/9780691145532/discrete-and-computational-geometry).
