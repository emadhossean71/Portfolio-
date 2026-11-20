import type { ResearchItem, ResearchStatistic, Skill } from '@/types/portfolio';

// Content transcribed from the supplied Figma layers.
export const skills: readonly Skill[] = [
  [
    "Quantum Error Correction",
    "Matching-based decoding, detector error models, and hardware noise estimation"
  ],
  [
    "Reinforcement Learning",
    "PPO-based optimization of decoder weights"
  ],
  [
    "Scientific Python",
    "Reproducible decoding pipelines with Python, Stim, PyMatching, and NumPy"
  ],
  [
    "Statistical Validation",
    "Held-out evaluation, paired significance tests, and hardware drift analysis"
  ],
  [
    "Quantum Optics",
    "MSc in quantum optics, University of Isfahan"
  ]
];

export const research: readonly ResearchItem[] = [
  {
    "title": "Independent research: decoding Riverlane’s Ankaa-2 stability experiments",
    "description": "Applied the procedure, with every setting fixed in advance, to the with-resets experiment: below Riverlane’s best published decoder in all 16 runs of both experiments. Graded every result on held-out shots, with exact paired (McNemar) tests and Holm correction.",
    "lead": true
  },
  {
    "title": "Independent research: decoding Riverlane’s Ankaa-2 stability experiments",
    "description": "Applied the procedure, with every setting fixed in advance, to the with-resets experiment: below Riverlane’s best published decoder in all 16 runs of both experiments. Graded every result on held-out shots, with exact paired (McNemar) tests and Holm correction.",
    "lead": true
  },
  {
    "title": "Reproducing hardware data",
    "description": "Rebuilt detection events from the raw HDF5 readouts and validated every step against published numbers: all 100 per-round defect rates of the 26-round run reproduced exactly, and the FPGA decoder’s logical error rate exactly in 8 of 11 runs.",
    "lead": false
  },
  {
    "title": "Repairing noise estimation",
    "description": "Found why the standard pairwise-correlation (pij) noise estimator fails on this device in all 11 runs: detection events stay correlated for more than ten rounds, driving boundary-edge probabilities negative. Fixed it by blending the estimates with the device noise model.",
    "lead": false
  },
  {
    "title": "Soft readout decoding",
    "description": "Turned IQ readout into per-shot soft information by fitting Gaussian readout clouds, and fed it into minimum-weight perfect matching.",
    "lead": false
  },
  {
    "title": "Reinforcement learning for decoder weights",
    "description": "Built a proximal policy optimisation (PPO) tuner in NumPy, after Sivak et al. (PRL 2024), to tune 44 tied decoder weights in parallel across CPU cores: logical error rate at 25 rounds from 20.1% to 15.9%, 23% fewer failures than Riverlane’s real-time FPGA decoder.",
    "lead": false
  },
  {
    "title": "Statistical validation across experiments",
    "description": "Applied the procedure, with every setting fixed in advance, to the with-resets experiment: below Riverlane’s best published decoder in all 16 runs of both experiments. Graded every result on held-out shots, with exact paired (McNemar) tests and Holm correction.",
    "lead": false
  },
  {
    "title": "Mid-circuit resets and time-like distance",
    "description": "Showed with Stim that mid-circuit resets double the time-like distance (N/2 → N), and by simulation that the device realises only a small part of the gain the noise model predicts, pointing to long-lived errors such as leakage.",
    "lead": false
  },
  {
    "title": "Measuring hardware drift",
    "description": "Tested for hardware drift (ANOVA, chi-square and Spearman tests with shuffle controls): firing rates drift by 2–5.5% within a run but cost decoding nothing measurable.",
    "lead": false
  },
  {
    "title": "Reproducible scientific software",
    "description": "Documented the work in a 49-page reproducible guide, and refactored the code around one shared module (1,858 → 1,311 lines), verified to reproduce every original result exactly.",
    "lead": false
  }
];

export const biography = "Physicist trained in quantum optics (MSc, University of Isfahan) who independently re-analysed Riverlane’s published Ankaa-2 stability experiments from the raw readouts. Built the full decoding pipeline in Python with Stim and PyMatching, found why a standard noise-estimation method fails on real hardware and fixed it, and combined soft readout information with a reinforcement-learning search (PPO) to decode below Riverlane’s best published decoder in all 16 runs. Developed with an AI coding assistant (Claude), checking every number against an independent reference before relying on it.";

export const statistics: readonly ResearchStatistic[] = [
  {
    "label": "Exact reproduction",
    "value": "100 / 100",
    "description": "Per-round defect rates matched Riverlane’s raw data exactly."
  },
  {
    "label": "Logical error rate",
    "value": "15.9%",
    "description": "At 25 rounds of the Ankaa-2 experiment.",
    "comparison": "Published best: 17.6%"
  },
  {
    "label": "Runs improved",
    "value": "16 / 16",
    "description": "Decoded below Riverlane’s best published decoder in every run."
  }
];

