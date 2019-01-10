---
layout: post
title: Treasure hunting
date: 2019-01-09 12:00:00
tag: geometry
scripts:
    - "/scripts/jsxgraphcore-0.99.7.js"
    - "/scripts/treasure.js"
styles:
    - "/css/jsxgraph-0.99.7.css"
---

You are given instructions for finding treasure on an island. The island has two trees and a "gallows". To find the treasure, we first mark out two special points, $P$ and $Q$. To find $P$, start at the gallows, walk toward Tree 1, then make a right-angled left turn upon reaching the tree. Walk the same distance again: you have found $P$. To find $Q$, go back to the gallows, walk toward Tree 2, then turn _right_ at a right-angle, and walk the same distance. Mark the spot you are standing on as $Q$. (It may make more sense looking at the diagram below).

The treasure is at the midpoint of the segment connecting $P$ and $Q$.

The problem is: You show up on the island, and you see the two trees, but there is no gallows to be found. Can you find the treasure anyway?

<div id="treasure" class="jxgbox" style="width:600px; height:600px; margin-left:auto; margin-right:auto;"></div>

The diagram is interactive, and you can drag around the "gallows" to see different hypothetical locations. But playing with it will be a major spoiler, so try to formulate a guess first :).

(More spoilers) Although you can move the trees around on the diagram, without loss of generality, you can suppose the trees are aligned on the horizontal axis, centered at the origin, at $(-1, 0)$ and $(1, 0)$. Here is a proof using complex numbers. You can think of the treasure map as taking place in the complex plane, and the position of the treasure as a function of the position of the gallows. Specifically, it is a function $\phi: \mathbb{C} \to \mathbb{C}, z \mapsto \frac{i(z - 1) - i(z + 1)}{2} = -1$ (after all, $P$ and $Q$ are just complex rotations: $P(z) = -i(z + 1), Q(z) = i(z - 1)$). Hence no matter where you put the gallows, the treasure does not change.

Moreover, from the proof, you can see that if the instructions had you turn by an angle other than 90 degrees, the treasure would still remain independent of the position of the gallows.

This problem is from [The Kinematic Method in Geometrical Problems](https://periplusmathematicus.files.wordpress.com/2018/05/lyubich-shor-the-kinematic-method-in-geometrical-problems.pdf), by Yu. I. Lyubich and L.A. Shor (although they cite it from [Mathematical Methods of Operations Research](https://archive.org/details/MathematicalMethodsOfOperationsResearch) by Thomas Saaty). They demonstrate their "kinematic" approach by presenting a proof
where you consider the "velocity" of a particle reflecting off the two trees, and noticing how they cancel out.

I used the library [JSXGraph](https://jsxgraph.org/). Source code is [here](https://github.com/samzhang111/linesandcurves/blob/master/treasure.js).
