---
layout: post
title: A word vector Kabbalistic tree of life
date: 2017-01-16 21:05:00
tag: project
---

In the first chapter of [Visual Complexity: Mapping Patterns of Information](https://www.amazon.com/Visual-Complexity-Mapping-Patterns-Information/dp/1568989369), Manuel Lima explores  the symbolism of the "tree" across history and mythologies. One of those examples was the Kabbalistic tree of life, and the 10 _Sephiroth_ and 22 paths that connect them:

![Kabbalistic tree of life](/images/sephirotic-tree.jpg?raw=true)

The interpretations of the Kabbalah are profound and esoteric, and here is a brief summary I found online:

> The Tree of Life can be thought of as a kind of spiritual electrical grid, fluid and dynamic, with each path a conduit for rays of Divine light, and each Sephira (emanation) a kind of “recharging station.” The current radiates simultaneously downward and upward, from God to man and vice versa. 

(via [this site](https://78revelationsaminute.wordpress.com/tag/sephiroth/))

Forgive me -- my first (and irresistable) thought was, of course, to check what the Kabbalistic tree would have looked like if instead it had been constructed by a sentient English-language Wikipedia that produced each node by summing the word vectors of each of its "parent" nodes. I didn't attempt to follow the definitions recursively, or to make a graphic out of it... also, the words are slightly different on the version of the graphic I saw, excerpted from the book, than the closest image I could find online.

```python
>>> w2v = gensim.models.Word2Vec.load('/home/sam/data/word2vec.bin') 
>>> w2v.most_similar(positive=['crown', 'understanding', 'wisdom'])
[('knowledge', 0.6604611873626709),
 ('understandings', 0.5606856346130371),
 ('compassion', 0.5548983216285706),
 ('humility', 0.5505481362342834),
 ('spirituality', 0.5481384992599487),
 ('intellect', 0.547366738319397),
 ('enlightened', 0.5395829081535339),
 ('insights', 0.5381983518600464),
 ('virtues', 0.5300473570823669),
 ('righteousness', 0.5270552635192871)]
>>> w2v.most_similar(positive=['wisdom', 'mercy'])
[('compassion', 0.6991716623306274),
 ('god', 0.6622496247291565),
 ('divine', 0.6501489877700806),
 ('goodness', 0.6394760608673096),
 ('humility', 0.6371676325798035),
 ('kindness', 0.6344395875930786),
 ('merciful', 0.6176332235336304),
 ('blessed', 0.5986860990524292),
 ('virtues', 0.5865875482559204),
 ('righteousness', 0.5852228999137878)]
>>> w2v.most_similar(positive=['understanding', 'wisdom', 'power', 'mercy'])
[('compassion', 0.6683579087257385),
 ('knowledge', 0.6467682123184204),
 ('goodness', 0.6005892753601074),
 ('humility', 0.5934966802597046),
 ('intellect', 0.5860059261322021),
 ('divine', 0.5844542980194092),
 ('god', 0.5809390544891357),
 ('spirituality', 0.5757241249084473),
 ('virtues', 0.5739660859107971),
 ('kindness', 0.5709549188613892)]
>>> w2v.most_similar(positive=['power', 'beauty'])
[('pageant', 0.5011138319969177),
 ('beautiful', 0.5001429319381714),
 ('magnificence', 0.4852966070175171),
 ('beauties', 0.4808778762817383),
 ('elegance', 0.4804859161376953),
 ('electricity', 0.480072945356369),
 ('charm', 0.46535760164260864),
 ('grandeur', 0.463988721370697),
 ('glamour', 0.46390610933303833),
 ('natural', 0.4628627896308899)]
>>> w2v.most_similar(positive=['mercy', 'beauty'])
[('beautiful', 0.5934549570083618),
 ('grace', 0.5787848234176636),
 ('compassion', 0.5566599369049072),
 ('blessed', 0.5549587607383728),
 ('goodness', 0.5435079336166382),
 ('kindness', 0.5386494398117065),
 ('beauties', 0.531730592250824),
 ('gracious', 0.5310201048851013),
 ('lovely', 0.5282090902328491),
 ('sorrow', 0.5231517553329468)]
>>> w2v.most_similar(positive=['beauty', 'glory', 'eternity'])
[('eternal', 0.6972339749336243),
 ('everlasting', 0.6580407619476318),
 ('heaven', 0.6451823711395264),
 ('beautiful', 0.6184502840042114),
 ('splendor', 0.5999501347541809),
 ('heavenly', 0.5985769033432007),
 ('greatness', 0.5912061929702759),
 ('god', 0.591046154499054),
 ('forever', 0.5900967121124268),
 ('sorrow', 0.5879574418067932)]
>>> w2v.most_similar(positive=['foundation', 'glory', 'eternity'])
[('eternal', 0.6702155470848083),
 ('everlasting', 0.6093697547912598),
 ('heaven', 0.5928328037261963),
 ('forever', 0.5868773460388184),
 ('greatness', 0.5695515275001526),
 ('god', 0.5680379271507263),
 ('immortality', 0.5462555885314941),
 ('spirit', 0.545385479927063),
 ('hope', 0.5385457873344421),
 ('splendor', 0.5371355414390564)]
```
