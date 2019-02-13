---
layout: post
title: A moduli space for triangles
date: 2019-02-12 12:00:00
tag: geometry
scripts:
    - "/scripts/mathbox-bundle.min.js"
    - "/scripts/jsxgraphcore-0.99.7.js"
    - "/scripts/math-5.4.2.min.js"
    - "/scripts/triangles-moduli.js"
styles:
    - "/css/jsxgraph-0.99.7.css"
    - "/css/mathbox.css"
---

This is a demonstration of the way that n-gons are naturally parameterized by the Grassmanian of 2-planes in $\mathbb{R}^n$. Since we are most comfortable with $\mathbb{R}^3$, this demo below uses triangles. 

In short, there is a way to send any n-gon with a fixed perimeter to a unique pair of orthonormal vectors in $\mathbb{R^n}$ up to translation. The space of all pairs of orthonormal vectors is a [Stiefel manifold](https://en.wikipedia.org/wiki/Stiefel_manifold), and that is the space we would operate in if we cared about the orientation (as in rotations) of the polygon. But what if we don't care about the orientation? It turns out we get lucky and rotating the polygon sends these pairs of orthonormal vectors to the same spanning
plane. Hence why the Grassmannian of 2-planes serves as the moduli space for polygons when we don't care about rotations.

Since we're in $\mathbb{R}^3$ here, we have an identification between the Grassmannian of 2-planes and the real projective plane $\mathbb{R}P^2$ (through the normal vector to the 2-planes). Recall that the real projective plane can be visualized as lines through a sphere: that is what you are looking at in the top pane.

<div id="triangles-overlay" style="width:600px;height:600px;margin:auto;border:3px solid black"></div>

<div style="display: flex; width: 600px; margin: 3px auto; justify-content:space-between">
<div id="triangle1" style="flex:0 1 auto;width:280px;height:300px;border: 3px solid black"></div>
<div id="triangle2" style="flex:0 1 auto;width:280px;height:300px;border: 3px solid black;"></div>
</div>
<div id="triangles-grassman" style="width:600px;height:600px;border:3px solid black;margin:auto"></div>

[Full screen version](/html/fullscreen/triangles-moduli). 

The top pane (the sphere) is the moduli space, with both the yellow and green triangles from the middle panes displayed on it as yellow and green lines. The moduli space is eight-fold covered by the sphere, hence why there are eight lines of both colors. All of the lines of the same color are quotiented together. For appearance's sake, I highlighted one of cosets in blue and thickened the representative vectors through that sector.

The yellow line connecting the two distinguished representatives is a geodesic. Thus in some sense, it represents an optimal way to transform the green triangle into the yellow one, or vice versa. That transformation is what you see in the bottom pane.

You can move the vertices of the triangles around in the middle two panes and watch it move in the moduli space. I normalize the perimeters and make some arbitrary choices when it comes to orientation.

I heard about this from [Rob Hines](http://math.colorado.edu/~rohi1040), and you should read [his writeup](http://math.colorado.edu/~rohi1040/expository/poly_grass.pdf) for further details. There is some interesting historical backstory to this moduli space. Lewis Carroll posed the question: what is the probability that a random triangle is obtuse? It is not so easy to answer that question without a probability space from which to draw a random triangle. This moduli space helps answer that question handily.
