---
layout: post
title: Cats on ladders
date: 2018-12-18 12:00:00
tag: geometry
description: Test your geometric intuition with the following problem. A cat is sitting on a ladder leaning against the wall, and the ladder slips. What shape does the cat draw through the air?
thumbnail: cats.png
source: https://github.com/samzhang111/linesandcurves
scripts:
    - "https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js"
    - "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"
    - "/scripts/cat.js"
styles:
    - "https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css"
---

**Problem 1**. Suppose a ladder is leaning vertically against a wall, and a cat is sitting on the midpoint of the ladder. If the base of the ladder begins to slide away from the wall with the top of the ladder maintaining contact with the wall, what shape is traced by the path of the cat?


It goes without saying that you should try to formulate an answer before playing with the widget. Drag the "Ladder" slider to cause the ladder to move.

<div id="solocat" class="jxgbox" style="width:500px; height:500px; margin-left:auto; margin-right:auto;">
</div>

Maybe the presence of the "Cat" slider gives away this second problem:

**Problem 2**. Suppose the cat is again on the ladder, but this time, not at the midpoint. What path does it trace now? (Use the "Cat" slider to move the cat around.)

Here is a reflected version of the same visualization, in case you want to see four ladders going all at once.

<div id="multicat" class="jxgbox" style="width:500px; height:500px; margin-left:auto; margin-right:auto;"> </div>

It's an ellipse! Lastly, what shape does the ladder itself trace? Try it:

<div id="ladderastroid" class="jxgbox" style="width:500px; height:500px; margin-left:auto; margin-right:auto;"> </div>

That shape is an [astroid](https://en.wikipedia.org/wiki/Asteroid). To see more about astroids, see the next blog post on [hypocycloids]({% post_url 2018-12-19-hypocycloids %}).
 

Those are the first two problems in this wonderful little geometry book:

<div style="text-align:center;">
<a href="https://www.springer.com/la/book/9780817641610"><img src="/images/linesandcurves.jpg?raw=true" alt="Cover of Lines and Curves"></a>
</div>

It was translated from Russian, and originally used in the Gelfand Correspondence School. The perspective of the book is to explore basic geometry from the perspective of "motion": ladders sliding with cats sitting on them, little rings attached to circles being pulled on strings, etc.

That perspective lends itself very nicely to interactive computer exploration, and I am tempted to digitize more of these problems for fun...

I used the library [JSXGraph](https://jsxgraph.org/). For my source code, see [here](https://github.com/samzhang111/linesandcurves).
