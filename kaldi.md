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
- Compute the log mel banks.

### Signal Amplitude, Magnitude and Power
In engineering, amplitude and magnitude mean two different things. The amplitude of a variable is the measure of how far, and in what direction, while the magnitude is the measure of how far, regardless of direction. Thus, signal amplitudes can be either positive or negative and the magnitudes are always positive values. The power of a signal is proportional to its amplitude(magnitude) squared. And the proportionality can be assume to constant one.

