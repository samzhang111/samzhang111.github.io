---
layout: post
title: Math/CS books I read in 2017
date: 2017-12-29 13:00:00
tag: books
---

Since I made [this post](2017-03-17-programming-books.md) for programming books I read last year, another year has passed. I've expanded this year's title to be "Math/CS" books, since I think I read more math books than programming ones this year. This is meant to be a fun recap (for me), and perhaps a helpful introduction to good books, if you, like me, are a "book learner".

Books are my main way of learning, and I often pick up books that I don't finish, especially with technical topics. So this collection is kind of a best-of list, and I'm leaving off all the non-starts and "too hards" that I attempted and wasn't ready for.

I find that what I value most in a technical book is its ability to carry me. I'll read a kid's book (and I do) if it means I am led along with clear exposition and find new analogies for exploring things. I feel that learning should be fun in general, and I hope this list reflects that.

---

## Who is Fourier?

[link](https://www.goodreads.com/book/show/706622.Who_Is_Fourier_a_Mathematical_Adventure)

How to explain how amazing this is.....

1. It is filled with cartoons.
2. It is written in a way that a 12 year old kid would understand. For example, it explains what sine and cosine are using a circle, and it explains integration with cut-out paper strips.
3. It teaches you about the Fourier series, Fourier transform, and fast Fourier transform.

**Who is Fourier?**  was written by a group named the Transnational College of Lex, or rather a sub-group named the  Hippo Family Club, who practice this approach toward learning new languages by constantly keeping ambient tapes going of those languages. The students are encouraged to babble the words they don't understand, and they claim astonishing success with this method. Their criticisms of how languages are taught in schools resonates with me -- starting with the grammar and working out toward conversation also strikes me as profoundly backward. 

They take this philosophy and apply it to learning about the Fourier series and transform. Each chapter was written by the person in their group who understood that material least to start. The margins are filled with cute doodles, with a cartoon depiction of the chapter's author popping in from time to time to encourage the reader through hard parts.

My kind of math book!

---

## Field Expedient SDR series

[link](http://www.fieldxp.com/home/)

I worked through all three of these volumes with my new RTL-SDR dongle. When I first bought it, I found myself overwhelmed by all the different Internet tutorials, and struggling to filter them by quality. It's much nicer for me to be led through the material by a single, solid teacher. It leaves you at a place where you're familiar with all the concepts used in SDR, and especially GNU Radio Companion, that you can keep learning on your own.

The only criticism I have of the book is that the Python code, of which there is only a little, is unidiomatic and awkward.

---

## Statistical Rethinking

[link](http://xcelab.net/rm/statistical-rethinking/)

Richard McElreath is able to take statistical ideas and turn them into these wonderful analogies, so it's still the book I would recommend the most since I read it half a year ago. Statistical models become "golems" from Jewish mythology, multiplication/counting problems become Borges's Garden of Forking Paths, and the problems with "classical" significance testing lead naturally toward Bayesian modeling. The book simultaneously un-traumatized me from statistics while inoculating me to R. Incidentally, learning to draw diagnostic plots using base R has improved my matplotlib skills as well.

The book doesn't quite deposit you at the end at a place where you can just pick up Stan and start modeling, and if that's your purpose, you may be beyond most of this material. But it solidifies the groundwork and is wonderful as a tutorial in itself.


## R for Data Science

[link](http://r4ds.had.co.nz/)

I have to confess that I've resisted jumping on the Hadley train for as long as possible, for no reason other than that other people are often *too* excited about the Tidyverse, but I'm going to drop a brand new insight for you all that you definitely have never heard before: the tidyverse is amazing.

I've found myself exporting data from Python just to load it in R to use ggplot. I've never felt plotting to be so "at the speed of thought" before. For example, the boxplot I drew for [this article](https://sam.zhang.fyi/projects/2017-12-28-newspaper-frontpages/) could have been done in seaborn, but I didn't know ahead of time that it would be a boxplot:

<img src="/images/paper-fonts.png?raw=true" alt="Boxplot of font sizes by each paper" width="140%" />.

First I tried a line graph, grouped by newspaper:
 
<img src="/images/r-plot-1.png?raw=true" alt="Line graph of daily font sizes over time by each paper" width="140%" />

That was too messy, even though you can see the general differences between the Daily News, the Chicago Sun-Times, and the other newspapers right away. So I was able to immediately change that into a histogram, before recognizing that what I wanted was a boxplot:
 
<img src="/images/r-plot-2.png?raw=true" alt="Histogram of daily font sizes by each paper" />

---

##  Introduction to Empirical Bayes: Examples from Baseball Statistics

[link](http://varianceexplained.org/r/empirical-bayes-book/)

This book got me to read **R for Data Science** since I was unfamiliar with the dplyr syntax, and he glossed over how to generate the graphs. There wasn't much covered in this book that wasn't also covered in **Statistical Rethinking** in more depth, except it introduced the empirical Bayes framework as a way to approximate/generate a prior from the data, if you have enough data (which you often do in A/B testing).

Until I read this book, I read several explanations of Empirical Bayes without being able to understand what the term meant. But a few pages in, it was clear to me: it's a family of Bayesian methods where the prior is approximated from the data itself.

---

## Seven More Languages in Seven Weeks 

[link](https://pragprog.com/book/7lang/seven-more-languages-in-seven-weeks)

I'm not done reading this book yet, but it's already worth its weight in chocolate (especially since I picked it up randomly at the library -- yay libraries!). It introduces programming languages at just the right level for the practicing programmer: you don't want detailed instructions about how to install it, you just want an introduction to "why should I learn this?" and "what are the fun parts?".

I'm a bit of a breadth-first-search learner so this type of "many mini deep dives" approach is totally up my alley. It's like skimming 7 great books!

Here's my favorite of the languages so far: [Factor](http://factorcode.org/).

Factor is a concatenative language. This means instead of your typical *applicative* functions (`f(g(x))`), or even lisp-style functions (`(g (f x))`), you use *postfix* notation to write `x f g`.

In other words, `x` places the value `x` onto the stack, `f`, being a unary function, reads a value off the stack and operates on it, and writes the return value *back onto the stack*. Then `g` reads the value off the stack and places it back after operating on it.

This strikes me as a foundation for beautiful, easily tested code, and opens up space for tooling that can interact with you in novel ways, like telling you exactly what to expect on the stack at any given point.

I enjoyed Factor so much that I find myself wishing that concatenative languages had taken off in a bigger scale. And I read the chapters on Lua and MiniKanren at fortunate times with particular problems I was working on at OpenCounter.

---

## Love and Math

[link](https://www.amazon.com/Love-Math-Heart-Hidden-Reality/dp/0465050743)

This book demystified concepts that I didn't even know were mystified to me. Namely, "higher-level" math like topology and abstract algebra. Edward Frenkel manages to situate those subjects at the center of our world, even for a lay reader, by showing how they arise out of the concept of symmetry (and quantum physics).

The sense of love that Frenkel has for math is palpable too, and drives the book forward. 

It led me down the path of looking up:

* [books about symmetry](https://www.amazon.com/Symmetries-Things-John-H-Conway-ebook/dp/B01DVTEUW0/ref=sr_1_6?ie=UTF8&qid=1513615298&sr=8-6&keywords=symmetry#reader_B01DVTEUW0)
* [books about topology](https://www.amazon.com/Introduction-Topology-Third-Dover-Mathematics/dp/0486663523)
* [books](https://www.amazon.com/Mathematics-Generic-Programming-Alexander-Stepanov/dp/0321942043/ref=pd_sim_14_33?_encoding=UTF8&pd_rd_i=0321942043&pd_rd_r=C0M0V251N07W7MQ2G0CV&pd_rd_w=RUQXx&pd_rd_wg=mobGk&psc=1&refRID=C0M0V251N07W7MQ2G0CV) [about](https://www.amazon.com/Elements-Programming-Alexander-Stepanov/dp/032163537X) [how higher-level math concepts can be applied to programming](https://www.amazon.com/Categories-Computer-Science-Cambridge-Texts/dp/0521422264/ref=pd_sim_14_60?_encoding=UTF8&pd_rd_i=0521422264&pd_rd_r=C0M0V251N07W7MQ2G0CV&pd_rd_w=RUQXx&pd_rd_wg=mobGk&psc=1&refRID=C0M0V251N07W7MQ2G0CV#reader_0521422264)

---

## The Key to Chinese Cooking

[link](https://www.amazon.com/Key-Chinese-Cooking-Irene-Kuo/dp/0394496388)

Enough said.
