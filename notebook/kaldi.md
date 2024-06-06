Generating the exact commands for your specific case without knowing the details of your setup, such as the path to your model, the structure of your data, and the version of Kaldi you're using, is challenging. However, I can provide a generic sequence of commands that illustrate the process. You'll need to adapt these commands to fit your particular environment and paths.

### Step 1: Feature Extraction

```bash
# Navigate to your Kaldi experiment directory
cd /path/to/your/kaldi/egs/your_experiment

# Extract MFCC features from the WAV file
steps/make_mfcc.sh --nj 1 --cmd "run.pl" data/test exp/make_mfcc/test mfcc
```

### Step 2: Compute CMVN Statistics

```bash
# Compute CMVN statistics
steps/compute_cmvn_stats.sh data/test exp/make_mfcc/test mfcc
```

### Step 3: Decode with the Chain Model

Assuming you have a graph directory prepared (usually during the model training process):

```bash
# Decode using the chain model
steps/nnet3/decode.sh --nj 1 --cmd "run.pl" --acwt 1.0 --post-decode-acwt 10.0 \
  exp/chain/tdnn_1a_sp/graph data/test exp/chain/tdnn_1a_sp/decode_test
```

### Step 4: Convert Lattices to CTM Format

```bash
# Lattice to CTM
lattice-best-path --word-symbol-table=exp/chain/tdnn_1a_sp/graph/words.txt \
  "ark:gunzip -c exp/chain/tdnn_1a_sp/decode_test/lat.1.gz |" ark,t:- | \
  utils/int2sym.pl -f 2- exp/chain/tdnn_1a_sp/graph/words.txt > exp/chain/tdnn_1a_sp/decode_test/1.ctm
```

### Step 5: Alignment Post-Processing

This step depends on what format you need your alignments in, but assuming you want to see the word alignments with their timings in the CTM format you've just generated:

```bash
# View the CTM alignments
cat exp/chain/tdnn_1a_sp/decode_test/1.ctm
```

The above commands are a simplification and might require adaptation, including paths to your models, data, and Kaldi scripts. Please ensure you have the necessary directories and files in place (`data/test`, `exp/make_mfcc/test`, etc.) and adjust the command paths as per your Kaldi setup.

Remember, Kaldi's directory structure and the specifics of using its tools can be complex, especially for newcomers. If you encounter difficulties, consulting the Kaldi documentation and seeking help from the Kaldi user community can be very helpful.