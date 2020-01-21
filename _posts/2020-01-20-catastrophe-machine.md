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

[Catastrophe theory](https://en.wikipedia.org/wiki/Catastrophe_theory) is a branch of bifurcation theory concerned with the way that a small change in a _continuous_ parameter of a potential function can introduce a _discontinuous_ jump in observed phenomena.

To explore how this works, I've created an interactive "catastrophe machine". Imagine a wedge shaped like a parabola balancing on a table (see thick blue outline in left figure below). The parameter that we will alter continuously is its center of mass (green dot in figure; drag it around!), and the discontinuity comes in the wedge's equilibrium resting position. 

Move the center of mass to the center-top of the parabola, within the dotted cusp (called the _bifurcation set_). Notice that two local minima emerge on the potential function. As the center of mass crosses the bifurcation set, one of the local minima disappear. If that was the one that the parabola was resting in, then the parabola undergoes a dramatic change in behavior: a "catastrophe" as it's been termed.

Note that in the visualization, the line representing the _ground_ moves when the center of mass moves, rather than the parabola itself. I only drew the point corresponding to the global minimum - perhaps it would have been more accurate to include both. Also note that the right hand figure is interactive.

<div style="display: flex; width: 600px; margin: 3px auto; justify-content:space-between">
<div id="control" style="flex:0 1 auto;width:280px;height:300px;border: 3px solid black"></div>
<div id="catastrophe-surface" style="flex:0 1 auto;width:280px;height:300px;border: none;"></div>
</div>

[Full screen version](/html/fullscreen/catastrophe). 

The right hand figure is the so-called _catastrophe surface_ for this machine. For each possible center of gravity $(x, y)$ in the parabola, we give it z-coordinates for the critical points of the energy function, in other words, the zeros of the derivative of the potential energy function. That turns out to be a cubic polynomial in this case. The roots of a cubic polynomial vary continuously with the coefficients, and there can be one, two, or three roots. The catastrophe occurs when
the point must "jump" across the fold on the catastrophe surface.

Two accessible introductions to the subject for anyone who has taken multivariable calculus are [Curves and Singularities](https://www.amazon.com/Curves-Singularities-Geometrical-Introduction-Singularity/dp/0521429994) by J.W. Bruce and P.J. Giblin; [Catastrophe Theory and its Applications](https://store.doverpublications.com/048669271x.html) by Tim Poston and Ian Stewart. Bruce and Giblin analyze this particular catastrophe in detail in Chapter 1, which they call the Poston catastrophe machine. Catastrophe theory also serves as an interesting example of the difficulties of mathematical modeling of complex systems: see [this critique](http://faculty.washington.edu/etsb/402W12/materials/Zahler_Sussman_claims_and_accomplishments_of_applied_catastrophe_nature_77.pdf) for some of the historical debate around catastrophe theory's (over-)application to scientific questions. One of the general lessons here is that for applied mathematics to be useful for science, the practitioner must prioritize the scientific problem at hand, over any particular mathematical technique one is itching to apply. Nevertheless these models can be fascinating and with a critical eye, they are worth visiting -- many of them are discussed (and some criticized) in Poston and Stewart's book.
