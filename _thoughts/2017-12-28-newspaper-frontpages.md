---
layout: post
title: The largest headlines for latter 2017
date: 2017-12-28 20:30:00
---

Thanks to the encouragement of [Jeremy Singer-Vine](https://www.jsvine.com/), I've published a brief article on Buzzfeed summarizing the "largest" headlines (based on font size) for ten major newspapers over a last half year of [daily scraping](https://github.com/samzhang111/frontpages).

Here are some more fun details about the data:

# 1. Only 64% of the papers contributed frontpages for more than half the days of the scrape
The collection from the Newseum includes a decent amount of weekly or otherwise not daily papers. Here is a plot of their distributions:

<img src="/images/paper-dists.png?raw=true" alt="Histogram of number of days each paper has records in scrape" width="100%" />

# 2. Newspapers have patterns with how they present their frontpages

One thing we noticed as we collected the front pages is that the difference between newspapers was huge. Tabloids tend to use dramatic, full-paged fonts, whereas the Wall Street Journal was so consistent with its headline font choice that after the four largest stories, the next 115 daily headlines all used the same font size (67.36pt Escrow Condensed Bold).

You can see that sense of spread in this graph:

<img src="/images/paper-fonts.png?raw=true" alt="Boxplot of font sizes by each paper" width="140%" />

Notice how the interquartile range for the WSJ is so condensed that it is essentially that single font size. Whereas the New York Daily News (NY\_DN on the far right of the graph) and the Chicago Sun-Times (IL\_CST) are generous (and less standardized) with the space they devote to the splash.

# 3. Tabloids use bigger fonts than broadsheets

So does it turn out that tabloids tend to use bigger fonts than broadsheets?

<img src="/images/paper-aspect-ratio-to-fonts.png" alt="Scatterplot of average biggest daily font size by aspect ratio" width="100%" />

If we approximate "tabloid-yness" using a rounded ratio of the page width to the height, it looks like it, though we don't have a lot of tabloids to make claims with. The two biggest font users in the graph are actually represented in our top 10 list: the New York Daily News, and the Chicago Sun-Times. The next three largest font users are also on the tabloid end.

To double-check that aspect ratio measures what we think it measures, here it is against the height. Notice how there is a degree of spread on the high-height/low-ratio end, where different broadsheets upload their PDFs in slightly different resolutions.

<img src="/images/paper-ratio.png" alt="Scatterplot of height by aspect ratio" width="100%" />

You can see the full source code for this analysis on the [Github repo](https://github.com/samzhang111/frontpages/blob/master/analysis/Biggest%20Headlines%20by%20Paper.ipynb).
