---
layout: page
title: Attention mechanism
permalink: /attention/
---
People treat different things different. In compute process, we could introduce the weight for the input and we name it attention score.
We pay more attention to the position which has a higher attention score.

In an Encoder-Decoder asr model, the attention mechanism usually used in the Decoder part. It can deal with two problems, one is align the input feature sequence of length $T$ to the out put label sequence of length $U$.

$$ 
e_{t} = w^{T}\text{Tanh}(Wh_t + b)
$$
$$
\alpha_{t} = \frac{e_{t}}{\sum_{t}^{T}e_{t}}
$$
$$
c_{u} = \sum_{t}^{T}\alpha_{t}h_t
$$