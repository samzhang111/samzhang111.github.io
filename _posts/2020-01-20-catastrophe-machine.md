---
layout: post
title: A catastrophe machine
date: 2020-01-20 12:00:00
tag: geometry
scripts:
    - "/scripts/mathbox-bundle.min.js"
    - "/scripts/jsxgraphcore-0.99.7.js"
    - "/scripts/catastrophe.js"
styles:
    - "/css/jsxgraph-0.99.7.css"
    - "/css/mathbox.css"
---

[Catastrophe theory](https://en.wikipedia.org/wiki/Catastrophe_theory) is concerned with the way that a small change in a _continuous_ parameter can introduce a _discontinuous_ jump in observed phenomena.

To explore how this works, I've created an interactive "catastrophe machine". Imagine a wedge shaped like a parabola balancing on a table (see thick blue outline in left figure below). The parameter that we will alter continuously is its center of mass (green dot in figure; drag it around!), and the discontinuity comes in the wedge's equilibrium resting position. 

Can you discover the catastrophe from playing with the figure? 

Note that in the visualization, the line representing the _ground_ moves when the center of mass moves, rather than the parabola itself. The right hand figure is also interactive.

<div style="display: flex; width: 600px; margin: 3px auto; justify-content:space-between">
<div id="control" style="flex:0 1 auto;width:280px;height:300px;border: 3px solid black"></div>
<div id="catastrophe-surface" style="flex:0 1 auto;width:280px;height:300px;border: none;"></div>
</div>

[Full screen version](/html/fullscreen/catastrophe). 

The orange line in the left figure is the potential energy function for each x-axis point on the parabola, for that given center of mass. I did not truncate the potential energy function past the boundaries of the parabola, but of course those values are not meaningful to us. Also its y-axis is unitless -- the purpose is more to illustrate the topological aspect of the sublevel sets of the potential energy function. Notice the emergence of multiple local minima in the potential energy function once the center of mass enters this dotted cusp-shaped region at the top of the parabola (the cusp itself is called the _bifurcation set_ or _discriminant set_ of the derivative of the potential energy function, since it separates regions with different numbers of roots). Then, once the center of mass crosses the y-axis,
one of these local minima overtakes the other in being the global minimum, causing a dramatic shift in the parabola's resting state.

Let us consider the global structure of this potential energy function instead. For each possible center of gravity $(x, y)$ in the parabola, we associate to it the critical points of the energy function, in other words, the zeros of the derivative of the potential energy function. In other words, since the derivative of the potential energy function turns out to be a cubic polynomial in $x$ and $y$, we visualize it as an algebraic variety (right figure). This representation is known as the _catastrophe surface_.

As the center of mass moves, a vertical green line moves in the $(x, y)$ plane, intersecting the catastrophe surface at each of the roots of the derivative of the potential energy function. Notice that as the center of mass crosses the bifurcation set, the number of intersections that this vertical green line has with the catastrophe surface changes.

Two accessible introductions to the subject for anyone who has taken multivariable calculus are [Curves and Singularities](https://www.amazon.com/Curves-Singularities-Geometrical-Introduction-Singularity/dp/0521429994) by J.W. Bruce and P.J. Giblin; [Catastrophe Theory and its Applications](https://store.doverpublications.com/048669271x.html) by Tim Poston and Ian Stewart. Bruce and Giblin analyze this particular catastrophe in detail in Chapter 1, which they call the Poston catastrophe machine.
