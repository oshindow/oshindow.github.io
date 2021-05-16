---
layout: page
title: Terminal.com Tutorial
permalink: /AsrWebServer/
---

At the first, I choose the ESPnet as the back-end and pass the predicted sequence by jinja2 language and FLASK framework to a simple web front-end. The fatal problem of this approach is the super slow process speed! You have to wait 10 seconds for an utterance recognized result. This is unbearable! I would build a faster web server.
- **Test WEnet**
  * pre-process: format data, extract feature, compute cmvn and make dataset.
  * wenet creates a `tools/compute_cmvn_stats.py` which can output global cmvn. 
  * It seems that there is no multi-thread decoding.