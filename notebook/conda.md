mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm -rf ~/miniconda3/miniconda.sh
~/miniconda3/bin/conda init bash

# env
conda create -n k2 python=3.8
conda activate serve

# torch python <=3.10
pip install torch==1.13.1+cu117 torchvision==0.14.1+cu117 torchaudio==0.13.1+cu117 -f https://download.pytorch.org/whl/torch_stable.html

# k2
pip install k2==1.24.3.dev20230723+cuda11.7.torch1.13.1 -f https://k2-fsa.org/nightly/

# lhotse
pip install git+https://github.com/lhotse-speech/lhotse

# install FunASR
pip install -U modelscope
git clone https://github.com/alibaba/FunASR.git && cd FunASR
pip install -e ./

# fairseq
pip install fairseq
pip install transformers
# icefall
pip install -r requirements.txt