---
layout: post
title: A catastrophe machine
date: 2020-01-20 12:00:00
tag: geometry
description: Move the center of gravity of a wedge balancing on a table, and observe its corresponding catastrophe surface.
thumbnail: catastrophe.png
fullscreen: /html/fullscreen/catastrophe.html
scripts:
    - "/scripts/mathbox-bundle.min.js"
    - "/scripts/jsxgraphcore-0.99.7.js"
    - "/scripts/catastrophe.js"
styles:
    - "/css/jsxgraph-0.99.7.css"
    - "/css/mathbox.css"
---

[Catastrophe theory](https://en.wikipedia.org/wiki/Catastrophe_theory) was a popular branch of mathematics concerned with qualitative characterizations of ways that singularities relate to potential energy functions. The name "catastrophe theory" comes from how a continuous change in a parameter of a potential function can introduce a _discontinuous_ jump in observed phenomena, and this can be catastrophic in certain cases, like with a buckling beam. I say the field "was" popular, rather than "is", because it was a classic example of a field of applied mathematics that was overhyped, applied too widely without adequate attention toward scientific fundamentals, and the backlash all but killed it. However, there is some talk about it recently becoming popular again for chemical applications. (Hence why this blog post!)

Plus, the mathematics is indisputably elegant -- that was never in doubt, even during the controversy around it -- and one can develop a basic intuition for it using simple physical examples that are well-suited for a website like this. I've created an interactive "catastrophe machine" that exhibits the basic form of the "cusp" catastrophe. Imagine a wedge shaped like a parabola balancing on a table (see thick blue outline in left figure below). The parameter that we will alter continuously is its center of mass (green dot in figure; drag it around!), and the discontinuity comes in the wedge's equilibrium resting position. 

Move the center of mass to the center-top of the parabola, within the dotted cusp (called the _bifurcation set_). Notice that two local minima emerge on the potential function. As the center of mass crosses the bifurcation set, one of the local minima disappear. If that was the one that the parabola was resting in, then the parabola undergoes a dramatic change in behavior: a "catastrophe" as it's been termed.

Note that in the visualization, the line representing the _ground_ moves when the center of mass moves, rather than the parabola itself. I only drew the point corresponding to the global minimum - perhaps it would have been more accurate to include both. Also note that the right hand figure is interactive.

<div style="display: flex; flex-wrap: wrap; width: 100%; margin: 3px auto; justify-content:space-between; border: 3px solid black; border-radius: 10px; overflow: hidden">
<div id="catastrophe-control" style="flex:1 0 auto; width: 20em; height: 30em; border-right: 3px solid black"></div>
<div id="catastrophe-surface" style="flex:1 0 auto; width: 20em; height: 30em; border: none;"></div>
</div>

[Full screen version](/html/fullscreen/catastrophe). 

The right hand figure is the so-called _catastrophe surface_ for this machine. For each possible center of gravity $(x, y)$ in the parabola, we give it z-coordinates for the critical points of the energy function, in other words, the zeros of the derivative of the potential energy function. That turns out to be a cubic polynomial in this case. The roots of a cubic polynomial vary continuously with the coefficients, and there can be one, two, or three roots. The catastrophe occurs when
the point must "jump" across the fold on the catastrophe surface.

Two accessible introductions to the subject for anyone who has taken multivariable calculus are [Curves and Singularities](https://www.amazon.com/Curves-Singularities-Geometrical-Introduction-Singularity/dp/0521429994) by J.W. Bruce and P.J. Giblin; [Catastrophe Theory and its Applications](https://store.doverpublications.com/048669271x.html) by Tim Poston and Ian Stewart. Bruce and Giblin analyze this particular catastrophe in detail in Chapter 1, which they call the Poston catastrophe machine. [This critique](http://faculty.washington.edu/etsb/402W12/materials/Zahler_Sussman_claims_and_accomplishments_of_applied_catastrophe_nature_77.pdf) of catastrophe theory is among the more famous in mathematics. I think it still makes a great read, for the types of issues one encounters while doing modeling.
