The reason we do not call \( p(y | z, c) \) the **posterior** is because, in Bayesian terms, **posterior** refers specifically to the distribution of the unknown (latent) variable \( z \) after observing some data \( y \) and any known input \( c \).

### Here's a more detailed explanation:

### 1. **What is \( p(y | z, c) \)?**
\( p(y | z, c) \) is the **likelihood**. It expresses the probability of observing the output \( y \) (the data) given the latent variable \( z \) and the input \( c \).

- **Likelihood**: In Bayesian terms, the likelihood refers to how probable the observed data \( y \) is, given specific values of the latent variable \( z \) and any known inputs \( c \). The likelihood helps update our belief about the unknown variable \( z \), but it is not itself a "belief" about \( z \).
  
  \[
  p(y | z, c) = \text{likelihood of } y \text{ given } z \text{ and } c
  \]

  **Why it's not called the posterior**: The likelihood is conditional on the latent variable \( z \) and the input \( c \), but it does not provide any updated belief about \( z \). Instead, it's used to assess how well a particular \( z \) and \( c \) explain the data \( y \).

### 2. **What is the Posterior \( p(z | y, c) \)?**
The **posterior** \( p(z | y, c) \) is the probability distribution over the latent variable \( z \), given the observed data \( y \) and the known input \( c \).

- **Posterior**: This is the updated belief about \( z \) after observing both the data \( y \) and the input \( c \). It incorporates prior knowledge (through \( p(z | c) \), the prior) and the evidence (through the likelihood \( p(y | z, c) \)) using **Bayes' theorem**:

  \[
  p(z | y, c) = \frac{p(y | z, c) \cdot p(z | c)}{p(y | c)}
  \]

  The posterior gives us a revised or updated understanding of the latent variable \( z \) after considering the observed data \( y \).

### 3. **The Role of the Likelihood and Posterior in Bayesian Inference**
- The **likelihood** \( p(y | z, c) \) tells us how likely the observed data \( y \) is, given specific values of the latent variable \( z \) and the known input \( c \).
- The **posterior** \( p(z | y, c) \) is the result of updating our prior belief about \( z \) using the observed data \( y \) (via the likelihood) and the prior \( p(z | c) \).

### Why the Difference Matters:
- The **likelihood** \( p(y | z, c) \) is a function of the observed data \( y \) given the latent variable \( z \). It is used to compute the posterior but does not describe the distribution of \( z \).
- The **posterior** \( p(z | y, c) \) is the final distribution that tells us how our belief about \( z \) has changed after observing \( y \).

In short, \( p(y | z, c) \) is the **likelihood**, not the posterior, because it tells us how likely the data is, given \( z \) and \( c \). The posterior \( p(z | y, c) \) updates our knowledge about \( z \) based on both the prior \( p(z | c) \) and the likelihood \( p(y | z, c) \).
