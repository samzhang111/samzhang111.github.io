---
layout: post
title: Hypocycloids
date: 2018-12-18 12:00:00
tag: geometry
scripts:
    - "/scripts/jsxgraphcore-0.99.7.js"
    - "/scripts/copernicus.js"
styles:
    - "/css/jsxgraph-0.99.7.css"
    - "https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css"
---

Suppose you have a stationary circle, and inside that circle is a second circle whose radius is half of the larger circle, and that touches the larger circle from within. Pick an arbitrary point on the inner circle, call it $K$. Now imagine pushing the inner circle against the outer circle, so that the inner circle revolves around its own center, as it moves inside the larger circle. What path does $K$ describe?

<div id="copernicus" class="jxgbox" style="width:600px; height:600px; margin-left:auto; margin-right:auto;"> </div>

Here is a more detailed version, emphasizing that the angles $\alpha = \beta$ at all times.

<div id="copernicusdetail" class="jxgbox" style="width:600px; height:600px; margin-left:auto; margin-right:auto;"> </div>

The fact that the path described is a straight line is sometimes called Copernicus's theorem. However, mechanical devices exploiting this fact have been made long before Copernicus: see [Tusi couple](https://en.wikipedia.org/wiki/Tusi_couple).

Now what happens if the radius of the inner circle is allowed to vary? For instance, what if is a quarter of the size of the larger circle? 

<div id="copernicusradius" class="jxgbox" style="width:600px; height:600px; margin-left:auto; margin-right:auto;"> </div>

This shape (when $\text{Radius} = 0.25$) is called an astroid. Try setting $\text{Radius}=0.33$ in the slider to see what happens when it is a third as well, though the rounding error becomes quite visible.

In general, shapes traced by small circles rolling inside of larger ones are called [hypocycloids](https://en.wikipedia.org/wiki/Hypocycloid). For a nice exposition of this, as well as some related phenomena (some quite a bit deeper), see [this post on John Baez's blog](http://www.math.ucr.edu/home/baez/rolling/rolling_3.html). I came across this in the book [Lines and Curves](https://www.springer.com/la/book/9780817641610).

I used the library [JSXGraph](https://jsxgraph.org/). For my source code, see [here](https://github.com/samzhang111/linesandcurves).
