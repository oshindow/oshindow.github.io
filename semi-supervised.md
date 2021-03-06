---
layout: page
title: Semi-Supervised Learning For Automatic Speech Recognition
permalink: /semi-supervised/
---


### blog
**Facebook AI Research** [wav2vec-U](
https://ai.facebook.com/blog/wav2vec-unsupervised-speech-recognition-without-supervision)

wav2vec Unsupervised (wav2vec-U) is a way to build speech recognition systems that require no transcribed data at all. It rivals the performance of the best supervised models from only a few years ago, which were trained on nearly 1,000 hours of transcribed speech.

### Papers
**Facebook AI Research**
[Self-training and Pre-training are Complementary for Speech Recognition (Xu et al., 2020/10/20).](https://arxiv.org/pdf/2010.11430.pdf)

**Abstract**

Self-training and unsupervised pre-training have emerged as effective approaches
to improve speech recognition systems using unlabeled data. However, it is not
clear whether they learn similar patterns or if they can be effectively combined.
In this paper, we show that pseudo-labeling and pre-training with wav2vec 2.0
are complementary in a variety of labeled data setups. Using just 10 minutes of
labeled data from Libri-light as well as 53k hours of unlabeled data from LibriVox
achieves WERs of 3.0%/5.2% on the clean and other test sets of Librispeech –
rivaling the best published systems trained on 960 hours of labeled data only a year
ago. Training on all labeled data of Librispeech achieves WERs of 1.5%/3.1%.

**2.2 Self-training Approach**


...This first trains an initial acoustic model on the available labeled data and then labels the unlabeled data with the initial model as well as a language model in a step we call pseudo-labeling. Finally, a new acoustic model is trained on the pseudo-labeled data as well as the original labeled data.

**Google Research, Brain Team**
[Pushing the Limits of Semi-Supervised Learning for Automatic Speech Recognition (Zhang et al., 2020/10/22).](https://arxiv.org/pdf/2010.10504.pdf)

**Abstract**

We employ a combination of recent developments in semi-supervised learning
for automatic speech recognition to obtain state-of-the-art results on LibriSpeech
utilizing the unlabeled audio of the Libri-Light dataset. More precisely, we carry
out noisy student training with SpecAugment using giant Conformer models pretrained using wav2vec 2.0 pre-training. By doing so, we are able to achieve
word-error-rates (WERs) 1.4%/2.6% on the LibriSpeech test/test-other sets against
the current state-of-the-art WERs 1.7%/3.3%.

**2.3 Noisy Student Training with SpecAugment**

We use the noisy student training pipeline for ASR studied for training the models pre-trained with wav2vec 2.0. In NST for ASR, a teacher model, obtained by shallow-fusing an ASR model with a language model (LM), is used to generate transcripts for the unlabeled data via inference on un-augmented audio. The teacher-labeled data, after filtering and balancing, are then used to train the next generation ASR model. The input data to the student model is augmented using adaptive SpecAugment. For obtaining the main result, we find that it is most effective to use the entirety of the teacher-generated data, rather than filtering and balancing them.

**Method Summarize**

To summarize, with the labeled LibriSpeech dataset S, the unlabeled Libri-Light dataset U and an
LM trained on the LibriSpeech LM corpus, the following procedure is used to train a series of models:
1. Fine-tune pre-trained model M0 on S with SpecAugment. Set M = M0.
2. Fuse M with LM and measure performance.
3. Generate labeled dataset M(U) with fused model.
4. Mix dataset M(U) and S.
5. Fine-tune new pre-trained model M0 with SpecAugment on mixed dataset.
6. Set M = M0
and go to 2.

### Required

- A large unlabeled dataset for pre-training:
[Libri-Light](https://github.com/facebookresearch/libri-light/blob/master/data_preparation/README.md)

| Type     | Size |
| :-----------: | :-----------: |
| small.tar    | 577 hours, 35 GB |
| medium.tar   | 5193 hours, 321 GB |
| large.tar    | 51934 hours, 3.05 TB |

- A labeled dataset for fine-tuning: 960 hours LibriSpeech
- A text data for building language models: LibriSpeech transcripts.
- A wav2vec 2.0 pre-trained model.

### Steps
1. Get a pre-trained encoder from wav2vec 2.0.
2. Fine-tune the pre-trained encoder use the labeled dataset LibriSpeech with SpecAugment.
3. Shallow fused the fine-tuned encoder with a LM to generate the label of Libri-Light, then mix them with LibriSpeech.
4. repeat the step 2.

### Details

- **Facebook AI Research**
[wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations (Alexei Baevski et.al., 2020/06/20)](
https://arxiv.org/pdf/2006.11477.pdf)
- **SpecAugment** [SpecAugment: A Simple Data Augmentation Method for Automatic Speech Recognition](https://arxiv.org/pdf/1904.08779.pdf)

- **Shallow fusion**

Given a set of acoustic observations $\boldsymbol{x} = (x_1, \cdots, x_T)$, E2E models provide posterior probabilities for a set of label $\boldsymbol{y} = (y_1, \cdots, y_L)$ given these observations, that is, $P(\boldsymbol{y}\|\boldsymbol{x})$. Shallow fusion interpolates the score from the E2E model with an external contextual LM during beam-search decoding

$$
\hat{\boldsymbol{y}} = \arg\max_\boldsymbol{y} \log P(\boldsymbol{y}|\boldsymbol{x}) + \lambda \log P(\boldsymbol{y})
$$

Here, $P(\boldsymbol{y})$ is the score from the LM and $\lambda$ is
a tunable hyperparameter controlling how much the contextual LM influences the overall model score during beam search.