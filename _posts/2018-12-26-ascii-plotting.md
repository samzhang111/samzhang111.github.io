---
layout: post
title: An ascii implicit function plotter
date: 2018-12-26 12:00:00
tag: weird
description: Plot an elliptic curve (or any implicit function) using ASCII art!
thumbnail: asciiplot.png
scripts:
    - "/scripts/mathjs-5.4.0-min.js"
    - "/scripts/lodash-4.17.11-min.js"
    - "/scripts/asciiplot2.js"
source: https://github.com/samzhang111/marchingcubes-ascii
---


<div id="container">
<div id="space"></div>
<span id="measure"></span>
</div>
<div>
<div class="input-field text-darken-2">
<input id="equation" type="text" placeholder="y^2 - x*(x - 1)*(x + 1)">
<label for="equation">0 = f(x, y) = </label>
</div>
<span id="error"></span>
</div>

Type in a mathematical expression in $x$ and $y$ into the input box above to plot it in ascii. The program expects an expression equal to zero, so if you want to plot $y = \sin(x)$, you would instead move everything to the left hand side, and enter $y - \sin(x)$ into the prompt.

What can you put in? The expression is parsed using [math.js](http://mathjs.org), so it can take most of these [math.js functions](http://mathjs.org/docs/reference/functions.html), such as the trigonometric functions, `log`, `exp`, as well as interesting things like `gcd` and `sign`. There are some quirks with their language, so if you run into any trouble, it is best to be explicit. I can type $y - 2x$ and it would understand I want to multiply $2$ by $x$, but I can't type
$y - x(x-1)$ because the parentheses makes it think that I am trying to invoke a (nonexistent) function named $x$, and instead I have to put in $x\*(x -1)$.

Under the hood, I rolled my own [marching squares](https://en.wikipedia.org/wiki/Marching_cubes) algorithm in javascript.

One interesting thing about doing this in ascii is that it's such low-resolution that any rough edges in the code become really obvious. For instance, if you plot $x^2 + y^2 - 1$, the circle is lumpy for some reason.

Another fun glitch caused by the low resolution is that you can see aliasing. Plot $y - \sin(2x)$, then increase the factor of $2$. Around $5$ it starts to look weird, and at $y - \sin(8x)$ it is totally borked.

For bonus points, since the lines are drawn as "o"s, imagine a ghost vocalizing anything that you plot. How spooky -- it is the ghost of algebraic geometry!

Source code is [here](https://github.com/samzhang111/marchingcubes-ascii).

<style>
    #container {
		margin: 1em 0;
        font-family: monospace;
        font-size: 15px;
        background-color: white;
    }
    #space {
        min-height: 600px;
        min-width: 600px;
        white-space: pre;
        border: solid 1px black;
        border-radius: 5px;
    }
    #measure {
        position: absolute;
        white-space: pre-line;
        visibility: hidden;
        height: auto;
        width: auto;
        padding: 0;
        margin: 0;
    }

    #error{
        color: red;
    }

    input::placeholder {
        color: black !important;
    }
</style>

