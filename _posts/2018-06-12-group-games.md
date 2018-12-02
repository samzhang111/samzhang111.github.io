---
layout: post
title: Games based on group theory!
date: 2018-06-12 12:00:00
tag: algebra
---

Although [many](https://en.wikipedia.org/wiki/Rubik%27s_Cube_group) [games](https://en.wikipedia.org/wiki/Mathematics_of_Sudoku#Sudokus_from_group_tables) have underlying group-theoretic interpretations, I wanted to design a game that:

1) was not based on any particular group, and

2) can give the player an intuitive sense of the group, without understanding group theory.

So here's what I came up with.

When you load up the game, you pick a particular group (in this case, the group S3 or D3, sometimes called D6):

```
Loading game with group D3

		0	1	2	3	4	

0		c	c	d	.	d	

1		b	.	d	d	c	

2		b	d	c	a	.	

3		d	f	a	b	f	

4		b	d	b	b	d	

Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 
```

The table you see is the board. The goal of the game is to make as many squares on the board the identity (represented as ".") as possible.

On each move, you pick two adjacent squares to play.

I haven't decided what the best gameplay is beyond that is, but the two variations I've played with are as follows:

In the first, and the first square is left multiplied against the second square, and the second square's value is replaced by the result of that multiplication. For instance, in the above game, knowing that `a` is a rotation, and `b` is its inverse rotation, you could make the move `3 2 3 3` and see the following:

```
Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 3 2 3 3

		0	1	2	3	4	

0		c	c	d	.	d	

1		b	.	d	d	c	

2		b	d	c	a	.	

3		d	f	a*	.*	f	

4		b	d	b	b	d	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 
```

Clearly, you can never completely empty the board of non-identity elements unless you started with only non-identity elements, since we don't allow elements to multiply themselves.

In the second mode of game play, the same multiplication happens, but the reverse one does as well -- the second element is right multiplied against the first one, and the first one is replaced by that output. In the case of an abelian operation like multiplying an element by its inverse, you see something like the following (starting from the same initial position as earlier, with the same move):

```
Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 3 2 3 3

		0	1	2	3	4	

0		c	c	d	.	d	

1		b	.	d	d	c	

2		b	d	c	a	.	

3		d	f	.*	.*	f	

4		b	d	b	b	d	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 
```
In this version, you can always end with an empty board if your group is abelian.

---

Here is a play-through using the first method (one-way multiplication) and the cyclic group Z4:

```
Loading game with group Z4

		0	1	2	

0		.	.	a	

1		c	b	.	

2		a	a	a	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 2 1 2 2

		0	1	2	

0		.	.	a	

1		c	b	.	

2		a	a*	b*	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r

		0	1	2	

0		.	.	a	

1		c	b	.	

2		a	a*	c*	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r 

		0	1	2	

0		.	.	a	

1		c	b	.	

2		a	a*	.*	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 2 0 1 0

		0	1	2	

0		.	.	a	

1		.*	b	.	

2		a*	a	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 2 1 2 0

		0	1	2	

0		.	.	a	

1		.	b	.	

2		b*	a*	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r

		0	1	2	

0		.	.	a	

1		.	b	.	

2		c*	a*	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r

		0	1	2	

0		.	.	a	

1		.	b	.	

2		.*	a*	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 1 1 2 1

		0	1	2	

0		.	.	a	

1		.	b*	.	

2		.	c*	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r

		0	1	2	

0		.	.	a	

1		.	b*	.	

2		.	a*	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r

		0	1	2	

0		.	.	a	

1		.	b*	.	

2		.	c*	.	

(Multiplying "a" and "c" by "b" only loops it around a coset. Oops!)

Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 2 1 1 1

		0	1	2	

0		.	.	a	

1		.	a*	.	

2		.	c*	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r

		0	1	2	

0		.	.	a	

1		.	.*	.	

2		.	c*	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 0 2 1 2

		0	1	2	

0		.	.	a*	

1		.	.	a*	

2		.	c	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 1 2 2 2

		0	1	2	

0		.	.	a	

1		.	.	a*	

2		.	c	a*	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 2 2 2 1

		0	1	2	

0		.	.	a	

1		.	.	a	

2		.	.*	a*	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 1 2 2 2

		0	1	2	

0		.	.	a	

1		.	.	a*	

2		.	.	b*	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r

		0	1	2	

0		.	.	a	

1		.	.	a*	

2		.	.	c*	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r

		0	1	2	

0		.	.	a	

1		.	.	a*	

2		.	.	.*	

Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: 0 2 1 2

		0	1	2	

0		.	.	a*	

1		.	.	b*	

2		.	.	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r

		0	1	2	

0		.	.	a*	

1		.	.	c*	

2		.	.	.	


Your move (x1 y1 x2 y2), (r)epeat last move, (u)ndo or (q)uit: r
You win!

```

---

Okay, so that was pretty easy. Maybe one way to make the game fun is to have established starting positions, and then the aim of the game would be to achieve a given end state _in the smallest number of moves_. Hm...

Another desirable outcome would be if a way can be found to turn this into an exploration of emergent phenomena, like Conway's game of life. But I am having a hard time thinking of rules to perform the multiplications over and over again without imposing too many arbitrary restrictions. For instance, if the user were to select a single point, and the multiplications would "percolate" out, how would we decide which squares get precedence if there was a conflict?

Also, I wrote my own really bad Group class to handle this game. Adding in SymPy would let us play with much bigger groups much (much) more quickly. 

---

To play what is currently available, see here: [https://github.com/samzhang111/groups-game](https://github.com/samzhang111/groups-game)
