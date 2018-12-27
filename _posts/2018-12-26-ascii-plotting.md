---
layout: post
title: An ascii implicit function plotter
date: 2018-12-26 12:00:00
tag: weird
scripts:
    - "/scripts/mathjs-5.4.0-min.js"
    - "/scripts/lodash-4.17.11-min.js"
    - "/scripts/asciiplot2.js"
---


<div id="container">
<div id="space"></div>
<span id="measure"></span>
</div>
<div>
<input id="equation" type="text" placeholder="y^2 - x*(x - 1)*(x + 1)">
<span id="error"></span>
</div>

This is an implementation of [marching squares](https://en.wikipedia.org/wiki/Marching_cubes) in javascript for plotting functions using three ascii characters (" ", "+", and "o"). One interesting thing about doing this in ascii is you can see very clearly some numerical (or implementation..) errors. For example, if you plug in $y^2 + x^2 - 1$ to plot a circle, the circle certainly does not look symmetric about the x-axis. Also I wonder if the x-axis is actually centered correctly, since it
seems to be a little off on the placeholder equation.

I've spent enough time thinking about this for now, though.  For parsing the expression, I am using [math.js](http://mathjs.org/). Source code is [here](https://github.com/samzhang111/marchingcubes-ascii).

<style>
    #container {
		margin: 1em 0;
        font-family: monospace;
        font-size: 15px;
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
</style>

