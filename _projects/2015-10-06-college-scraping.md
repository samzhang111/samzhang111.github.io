---
layout: post
title: college scraping
date: 2015-10-06 22:32
---

{{ page.title }}
===============
{{ page.date }}

One of my mom's favorite activities is come up with hypothetical startup
ideas. Most are really awful (or brilliant in a way that is just
beyond me), but one idea in particular has stuck with me. The idea is
to create a centralized database of college financial aid resources.

After having worked for a year on the [DARPA
Memex](http://www.scientificamerican.com/article/human-traffickers-caught-on-hidden-internet/)
project, which was all about creating databases and searchable resources
out of domain-specific content, the idea didn't seem that far off from
a fun data mining project.

My approach was: take a list of accredited US institutions,
including professional and trade schools, that I had on hand from the
[Open Syllabus Project](/projects/2015-09-27-osp.html). Scrape them all. Extract
pages that feasibly have interesting information (admissions and aid, in this case).
Then throw different content extraction tools at it but probably
extract the rest of the data by hand.

Since this project doesn't involve funding the next generation of
research-grade scraping and indexing tools, I felt pretty good about
using wget :). I also wanted to gather a lot of data quickly with as
little setup as possible. So, I fed my list of colleges to
[parallel wget](/bugposts/2015-10-05-xargs.html).

A neat hack I discovered for this project was that I could mount an S3
bucket to the filesystem, then direct wget to output into that bucket.
It has the added bonus of being read-write, so wget in recursive mode can
resume scrapes where it left off if it needs to restart. (Albeit, perhaps
in a way that is expensive in terms of GETs to the S3 bucket and time)

The scrape was going at a slow-enough pace that I wanted more parallelism.
I split the job across 20 ec2 micro instances running Ansible. I have
written more about the surprises I encountered with Ansible [here](/bugposts/2015-10-06-ansible.html).

When I wrestled in high school, we would do sprints every day, and during
that period of my life I hated running. Almost as soon as it was over,
though, I realized I could run at whatever pace I wanted _forever_
(very slowly), and nobody would yell at me to go faster. It still feels
incredible. I know it's ridiculous to compare running with web scraping,
but I almost feel the same way here, where taking on a subject in my
free time instead of in a high-pressure professional environment can
be a source of pleasure. I can do more to "stop and smell the roses"
(like blog, and go down rabbit holes, like the Ansible source code).

I have the idea in the back of my mind to bootstrap this dataset into
a company that sells various analytics about higher education, but I'm
finding it to be a risky gamble so far. The scrape cost me $360.52, mostly
in S3 PUT and GET requests, before I cut it off. The scrapers had slowed
down, I was experiencing memory leaks with my mounted S3 filesystems,
and perhaps most importantly, I didn't know how much more money I was willing to spend.
I didn't have a game plan, and I still don't really.

The question I have to answer now is: if I were to devote a total of $1000
to bringing this project to life, what should I do with it? How should
I be most efficient in bringing about an MVP analytical product to sell?
