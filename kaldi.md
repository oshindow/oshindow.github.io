---
layout: page
permalink: /kaldi/
---

```
feat/feature-fbank.h
FbankOptions(): mel_opts(23),
                 // defaults the #mel-banks to 23 for the FBANK computations.
                 // this seems to be common for 16khz-sampled data,
                 // but for 8khz-sampled data, 15 may be better.
                 use_energy(false),
                 energy_floor(0.0),
                 raw_energy(true),
                 htk_compat(false),
                 use_log_fbank(true),
                 use_power(true) {}
```
The default `use energy` is false and `use power` is true. Kaldi calculate the log-mel filter banks default and use the raw energy.
```
feat/feature-fbank.cc
void FbankComputer::Compute(BaseFloat signal_raw_log_energy,
                            BaseFloat vtln_warp,
                            VectorBase<BaseFloat> *signal_frame,
                            VectorBase<BaseFloat> *feature) {

  const MelBanks &mel_banks = *(GetMelBanks(vtln_warp));

  KALDI_ASSERT(signal_frame->Dim() == opts_.frame_opts.PaddedWindowSize() &&
               feature->Dim() == this->Dim());


  // Compute energy after window function (not the raw one). 
  // NOT GOING
  if (opts_.use_energy && !opts_.raw_energy)
    signal_raw_log_energy = Log(std::max<BaseFloat>(VecVec(*signal_frame, *signal_frame),
                                     std::numeric_limits<float>::epsilon()));

  if (srfft_ != NULL)  // Compute FFT using split-radix algorithm.
    srfft_->Compute(signal_frame->Data(), true);
  else  // An alternative algorithm that works for non-powers-of-two.
    RealFft(signal_frame, true);

  // Convert the FFT into a power spectrum.
  ComputePowerSpectrum(signal_frame);
  SubVector<BaseFloat> power_spectrum(*signal_frame, 0,
                                      signal_frame->Dim() / 2 + 1);

  // Use magnitude instead of power if requested.
  // NOT GOING
  if (!opts_.use_power)
    power_spectrum.ApplyPow(0.5);

  int32 mel_offset = ((opts_.use_energy && !opts_.htk_compat) ? 1 : 0);
  SubVector<BaseFloat> mel_energies(*feature,
                                    mel_offset,
                                    opts_.mel_opts.num_bins);

  // Sum with mel fiterbanks over the power spectrum
  mel_banks.Compute(power_spectrum, &mel_energies);
  if (opts_.use_log_fbank) {
    // Avoid log of zero (which should be prevented anyway by dithering).
    mel_energies.ApplyFloor(std::numeric_limits<float>::epsilon());
    mel_energies.ApplyLog();  // take the log.
  }

  // Copy energy as first value (or the last, if htk_compat == true).
  // NOT GOING
  if (opts_.use_energy) {
    if (opts_.energy_floor > 0.0 && signal_raw_log_energy < log_energy_floor_) {
      signal_raw_log_energy = log_energy_floor_;
    }
    int32 energy_index = opts_.htk_compat ? opts_.mel_opts.num_bins : 0;
    (*feature)(energy_index) = signal_raw_log_energy;
  }
}
```
The framed signal data type is float. 
- Compute FFT using split-radix algorithm
- Convert the FFT into a power spectrum.
- Compute the log mel filer banks.

### Signal Amplitude, Magnitude and Power
In engineering, amplitude and magnitude mean two different things. The amplitude of a variable is the measure of how far, and in what direction, while the magnitude is the measure of how far, regardless of direction. Thus, signal amplitudes can be either positive or negative and the magnitudes are always positive values. The power of a signal is proportional to its amplitude (magnitude) squared. And the proportionality can be assume to constant one.

$$
x_{mag}(n) = |x(n)|
$$

$$
x_{pow}(n) = x(n) ^ 2
$$

`power spectrum`

$$
x_{powspec} = \frac{1}{NFFT * x_{pow}}
$$

`log power spectrum`

$$
x_{logpowspec} = 10 * log10(x_{powspec})
$$

### Log Mel Filer Banks
```python
jameslyons/python_speech_features/python_speech_features/base.py

def get_filterbanks(nfilt=20,nfft=512,samplerate=16000,lowfreq=0,highfreq=None):
    """Compute a Mel-filterbank. The filters are stored in the rows, the columns correspond
    to fft bins. The filters are returned as an array of size nfilt * (nfft/2 + 1)
    :param nfilt: the number of filters in the filterbank, default 20.
    :param nfft: the FFT size. Default is 512.
    :param samplerate: the sample rate of the signal we are working with, in Hz. Affects mel spacing.
    :param lowfreq: lowest band edge of mel filters, default 0 Hz
    :param highfreq: highest band edge of mel filters, default samplerate/2
    :returns: A numpy array of size nfilt * (nfft/2 + 1) containing filterbank. Each row holds 1 filter.
    """
    highfreq= highfreq or samplerate/2
    assert highfreq <= samplerate/2, "highfreq is greater than samplerate/2"

    # compute points evenly spaced in mels
    lowmel = hz2mel(lowfreq)
    highmel = hz2mel(highfreq)
    melpoints = numpy.linspace(lowmel,highmel,nfilt+2)
    # our points are in Hz, but we use fft bins, so we have to convert
    #  from Hz to fft bin number
    bin = numpy.floor((nfft+1)*mel2hz(melpoints)/samplerate)

    fbank = numpy.zeros([nfilt,nfft//2+1])
    for j in range(0,nfilt):
        for i in range(int(bin[j]), int(bin[j+1])):
            fbank[j,i] = (i - bin[j]) / (bin[j+1]-bin[j])
        for i in range(int(bin[j+1]), int(bin[j+2])):
            fbank[j,i] = (bin[j+2]-i) / (bin[j+2]-bin[j+1])
    return fbank
```
We assume the dimension of FFT in one frame is 257 and the number of mel-filter is 40. Then the output dimension of mel-filter in one frame will be 40.
- Convert the hz frequency to mel frequency.
- Evenly set mel-filter + 2 mel-points from low mel-freq to high mel-freq.
- Convert hz to fft bins.
- Initial fbanks all zero.
- j is from 0 to 40, i is the int index at every fft bin. A small bin will not make sense.
