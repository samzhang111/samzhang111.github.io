---
layout: post
title: comparing wikipedia and simple wikipedia
date: 2017-04-25 21:15:00
---


When I discovered [Simple Wikipedia](https://simple.wikipedia.com) I realized that I could do a comparative analysis of the words that are most commonly used in "simple explanations" vs. those in the more formal English Wikipedia explanations[^1]. So I collected a list of subjects, then I downloaded all of the pages they had in common across the two sites. These are the (somewhat arbitrary, mostly determined by what overlaps existed) "categories" I looked at:

* Anthropology
* Archaeology
* Astronomy
* Biology
* Chemistry
* Economics
* Engineering
* Linguistics
* Mathematics
* Music
* Physics
* Psychology
* Sociology

For each subject, I only considered articles that had the same title across both English and Simple Wikipedia -- filtering down the number of articles to around 200 per subject. Then I joined together all of the articles in that subject, then found the term frequency of each word. I then considered the difference in term frequencies between them. Words with a high imbalance toward English Wikipedia are considered "jargon-y", and words with a high imbalance toward Simple Wikipedia are
frequently used in simple explanations.

I lower-cased and stemmed the words as a preprocessing step, so "wa" -> "was", and "species" -> "specie". To try out for yourself what stemming a word looks like, [see this interactive demo](http://9ol.es/porter_js_demo.html). I also filtered out stopwords.[^2]

The results:
{% highlight text %}
+---------------------------+----------------------------+
| Simplest (Anthropology)   | Jargoniest (Anthropology)   |
|---------------------------+----------------------------|
| 1. year                   | 1. meme                    |
| 2. human                  | 2. social                  |
| 3. homo                   | 3. society                 |
| 4. ago                    | 4. division                |
| 5. tool                   | 5. population              |
| 6. found                  | 6. anthropology            |
| 7. people                 | 7. cultural                |
| 8. made                   | 8. labour                  |
| 9. man                    | 9. ax                      |
| 10. specie                | 10. field                  |
+---------------------------+----------------------------+

+--------------------------+---------------------------+
| Simplest (Archaeology)   | Jargoniest (Archaeology)   |
|--------------------------+---------------------------|
| 1. people                | 1. century                |
| 2. year                  | 2. period                 |
| 3. found                 | 3. beaker                 |
| 4. made                  | 4. number                 |
| 5. ancient               | 5. according              |
| 6. tool                  | 6. germanic               |
| 7. ago                   | 7. dynasty                |
| 8. battle                | 8. however                |
| 9. site                  | 9. early                  |
| 10. age                  | 10. within                |
+--------------------------+---------------------------+

+------------------------+-------------------------+
| Simplest (Astronomy)   | Jargoniest (Astronomy)   |
|------------------------+-------------------------|
| 1. earth               | 1. magnitude            |
| 2. asteroid            | 2. due                  |
| 3. planet              | 3. observation          |
| 4. moon                | 4. velocity             |
| 5. star                | 5. observed             |
| 6. space               | 6. located              |
| 7. light               | 7. mission              |
| 8. galaxy              | 8. approximately        |
| 9. called              | 9. result               |
| 10. sun                | 10. spectral            |
+------------------------+-------------------------+

+----------------------+-----------------------+
| Simplest (Biology)   | Jargoniest (Biology)   |
|----------------------+-----------------------|
| 1. called            | 1. within             |
| 2. cell              | 2. due                |
| 3. animal            | 3. however            |
| 4. plant             | 4. level              |
| 5. make              | 5. including          |
| 6. year              | 6. result             |
| 7. organism          | 7. factor             |
| 8. like              | 8. rate               |
| 9. thing             | 9. potential          |
| 10. get              | 10. receptor          |
+----------------------+-----------------------+

+------------------------+-------------------------+
| Simplest (Chemistry)   | Jargoniest (Chemistry)   |
|------------------------+-------------------------|
| 1. chemical            | 1. production           |
| 2. make                | 2. application          |
| 3. made                | 3. due                  |
| 4. used                | 4. may                  |
| 5. compound            | 5. structure            |
| 6. also                | 6. produced             |
| 7. acid                | 7. process              |
| 8. ion                 | 8. concentration        |
| 9. formula             | 9. effect               |
| 10. water              | 10. material            |
+------------------------+-------------------------+

+------------------------+-------------------------+
| Simplest (Economics)   | Jargoniest (Economics)   |
|------------------------+-------------------------|
| 1. people              | 1. card                 |
| 2. money               | 2. social               |
| 3. company             | 3. model                |
| 4. person              | 4. transaction          |
| 5. country             | 5. new                  |
| 6. called              | 6. within               |
| 7. many                | 7. would                |
| 8. thing               | 8. fund                 |
| 9. make                | 9. rate                 |
| 10. good               | 10. billion             |
+------------------------+-------------------------+

+--------------------------+---------------------------+
| Simplest (Engineering)   | Jargoniest (Engineering)   |
|--------------------------+---------------------------|
| 1. energy                | 1. engine                 |
| 2. engineer              | 2. crane                  |
| 3. people                | 3. suspension             |
| 4. make                  | 4. arafat                 |
| 5. university            | 5. exchanger              |
| 6. de                    | 6. method                 |
| 7. work                  | 7. design                 |
| 8. engineering           | 8. hydraulic              |
| 9. compressor            | 9. pump                   |
| 10. year                 | 10. bearing               |
+--------------------------+---------------------------+

+--------------------------+---------------------------+
| Simplest (Linguistics)   | Jargoniest (Linguistics)   |
|--------------------------+---------------------------|
| 1. word                  | 1. speaker                |
| 2. language              | 2. system                 |
| 3. people                | 3. linguistic             |
| 4. linguistics           | 4. translation            |
| 5. text                  | 5. chomsky                |
| 6. study                 | 6. creole                 |
| 7. formula               | 7. theory                 |
| 8. english               | 8. community              |
| 9. part                  | 9. variety                |
| 10. readability          | 10. social                |
+--------------------------+---------------------------+

+--------------------------+---------------------------+
| Simplest (Mathematics)   | Jargoniest (Mathematics)   |
|--------------------------+---------------------------|
| 1. number                | 1. n                      |
| 2. example               | 2. space                  |
| 3. called                | 3. theory                 |
| 4. mathematics           | 4. p                      |
| 5. used                  | 5. r                      |
| 6. line                  | 6. set                    |
| 7. way                   | 7. defined                |
| 8. one                   | 8. thus                   |
| 9. thing                 | 9. k                      |
| 10. mean                 | 10. sequence              |
+--------------------------+---------------------------+

+--------------------+---------------------+
| Simplest (Music)   | Jargoniest (Music)   |
|--------------------+---------------------|
| 1. music           | 1. film             |
| 2. born            | 2. single           |
| 3. american        | 3. tour             |
| 4. singer          | 4. release          |
| 5. known           | 5. show             |
| 6. called          | 6. track            |
| 7. band            | 7. production       |
| 8. died            | 8. would            |
| 9. composer        | 9. number           |
| 10. many           | 10. following       |
+--------------------+---------------------+

+----------------------+-----------------------+
| Simplest (Physics)   | Jargoniest (Physics)   |
|----------------------+-----------------------|
| 1. energy            | 1. system             |
| 2. make              | 2. thus               |
| 3. light             | 3. may                |
| 4. called            | 4. state              |
| 5. electron          | 5. model              |
| 6. nuclear           | 6. phase              |
| 7. thing             | 7. within             |
| 8. atom              | 8. case               |
| 9. one               | 9. due                |
| 10. computer         | 10. result            |
+----------------------+-----------------------+

+-------------------------+--------------------------+
| Simplest (Psychology)   | Jargoniest (Psychology)   |
|-------------------------+--------------------------|
| 1. people               | 1. individual            |
| 2. person               | 2. research              |
| 3. thing                | 3. associated            |
| 4. behaviour            | 4. experience            |
| 5. child                | 5. participant           |
| 6. way                  | 6. state                 |
| 7. psychology           | 7. including             |
| 8. animal               | 8. found                 |
| 9. like                 | 9. social                |
| 10. help                | 10. thus                 |
+-------------------------+--------------------------+

+------------------------+-------------------------+
| Simplest (Sociology)   | Jargoniest (Sociology)   |
|------------------------+-------------------------|
| 1. people              | 1. according            |
| 2. king                | 2. hamas                |
| 3. battle              | 3. member               |
| 4. person              | 4. individual           |
| 5. war                 | 5. role                 |
| 6. english             | 6. including            |
| 7. conflict            | 7. irgun                |
| 8. called              | 8. theory               |
| 9. edward              | 9. within               |
| 10. army               | 10. social              |
+------------------------+-------------------------+
{% endhighlight %}

Notes:

[^1]: This is a much older project (last commit before I touched it up for this blog post: [April 29th, 2015](https://github.com/samzhang111/wikipedia-jargon)), but I've just gotten around to posting about it!

[^2]:

    At first, I didn't strip out stopwords because I figured that differences in stopword usage was itself interesting. For example, "is" is used much more frequently in Simple Wikipedia, which I thought could be interpreted as an insight about sentence structure of simple explanations. But the more I thought about it, the more I realized that Simple Wikipedia uses shorter sentences, so these high-frequency glue verbs will tend to be overrepresented for that alone. In addition, since those same
    stopwords showed up across every single subject, I deemed them uninteresting enough to be filtered out.

    But in case you're curious, here are the top "simple" outputs for Anthropology without filtering out stopwords: [wa, is, year, homo, were, are, about, tool, ago, they, specie, found, it] (I ran this at a different point in time than the above analysis, so the non-stopwords words may be different as well)
