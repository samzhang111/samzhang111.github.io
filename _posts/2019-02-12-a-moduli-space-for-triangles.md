---
layout: post
title: A moduli space for triangles
description: A solution to a problem by Lewis Carroll using a clever moduli space. For fun, pick points on the moduli space, and watch triangles deform between them along geodesics.
thumbnail: moduli-triangles.png
fullscreen: /html/fullscreen/triangles-moduli.html
source: https://github.com/samzhang111/triangles-moduli
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

Charles Dodgson, [better known as Lewis Carroll](https://en.wikipedia.org/wiki/Lewis_Carroll), once posed the following mathematical question: what is the probability that a random triangle is obtuse?

The answer he gave was incorrect, and several subsequent attempts to correct the answer also fell short. In a [2017 paper from Jason Canterella, Tom Needham, Clayton Shonkwiler, and Gavin Stewart](https://arxiv.org/abs/1702.01027), a nice resolution is presented to this problem. 

The key issue with Dodgson's original solution was that in order to say what probability a random triangle is obtuse, he had to first come up with a space that triangles lived in, and find what part of that space corresponded to obtuse triangles. This turns out to be a subtle issue. Canterella et al. solve this by associating each n-gons with a so-called Grassmanian of 2-planes in $\mathbb{R}^n$. This blog post is a demonstration of their parameterization, omitting all of the details :), using triangles and $\mathbb{R}^3$. 

In short, there is a way to send any n-gon with a fixed perimeter to a pair of orthonormal vectors in $\mathbb{R^n}$ up to translation (technically, $2^n$ pairs, but they are all identified with each other). The space of all pairs of orthonormal vectors is a [Stiefel manifold](https://en.wikipedia.org/wiki/Stiefel_manifold), and that is the space we would operate in if we cared about the orientation (as in rotations) of the polygon. But what if we don't care about the orientation? It turns out we get lucky and rotating the polygon sends these pairs of orthonormal vectors to the same spanning
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

Hat tip to [Rob Hines](http://math.colorado.edu/~rohi1040), who first told me about this.
