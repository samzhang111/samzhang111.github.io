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

More kinematic geometric problems! You may want to refer to the diagram below as you read the instructions.

<div id="treasure" class="jxgbox" style="width:600px; height:600px; margin-left:auto; margin-right:auto;"></div>

Suppose you find an old treasure map containing instructions for how to find treasure on an island. On the island, there are two trees and a gallows. To find the treasure, the map states, first draw an imaginary line between the two trees. Then, starting at the gallows, walk toward one of the trees, measuring your steps (blue line on diagram). Once you hit the tree, make a right angled turn as if reflecting off the line connecting the two trees, then walk out the same number of steps in that direction (dotted line). Mark the spot you arrive at. Return to the gallows, and repeat that process for the other tree.

Draw a line segment connecting those two points you marked. The treasure will be at the midpoint of that segment. Taking those instructions, you go to the island. You find the two trees as expected, but the gallows is nowhere to be seen!

The problem is: is it possible to find the treasure anyway? If so, what procedure do you take?

The diagram above is interactive, so you can move the gallows around to see where the treasure would be given different gallows locations. But give it a moment's thought before playing with it, because the answer will be immediately obvious once you start to move the gallows around.

**Spoilers below as well.**

Although you can move the trees around on the diagram, without loss of generality, you can suppose the trees are aligned on the horizontal axis, centered at the origin, at $(-1, 0)$ and $(1, 0)$. You can think of the treasure map as taking place in the complex plane, and the position of the treasure as a function of the position of the gallows. Specifically, it is a function $\phi: \mathbb{C} \to \mathbb{C}, z \mapsto \frac{f(z) + g(z)}{2}$, where $f$ and $g$ give the positions of each "anchor point" from bouncing off the trees.

But a moment's thought shows that $f$ and $g$ are just complex rotations around $(-1, 0)$ and $(1, 0)$. That is $f(z) = i(z - 1), g(z) = -i(z + 1)$. So $\phi(z) = \frac{f(z) + g(z)}{2} = \frac{i(z - 1) - i(z + 1)}{2} = -1$. Hence no matter where you put the gallows, the treasure does not change.

This problem is from [The Kinematic Method in Geometrical Problems](https://periplusmathematicus.files.wordpress.com/2018/05/lyubich-shor-the-kinematic-method-in-geometrical-problems.pdf), by Yu. I. Lyubich and L.A. Shor (although they cite it from [Mathematical Methods of Operations Research](https://archive.org/details/MathematicalMethodsOfOperationsResearch) by Thomas Saaty).

I used the library [JSXGraph](https://jsxgraph.org/). I didn't put this source code on github yet, but you can view source and find the unminified source linked.
