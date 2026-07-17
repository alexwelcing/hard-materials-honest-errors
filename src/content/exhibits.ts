// GENERATED from report exhibit tables (Ch1/3/13/15/18/20).
export interface ExhibitTable { headers: string[]; rows: string[][] }
export interface ChainCard { id: number; title: string; readiness: string; sentence: string; unlock: string; discover: string; build: string; impacts: string[]; solved: string; horizon: string; defenseHtml: string }
export interface Exhibits { taxonomy: ExhibitTable; scoreboard: ExhibitTable; matrix: ExhibitTable; quadrant: ExhibitTable; chains: ChainCard[]; chainSummary: ExhibitTable; gates: ExhibitTable; phases: ExhibitTable; skeptics: ExhibitTable; nineNumbers: ExhibitTable }

export const exhibits: Exhibits = {
 "taxonomy": {
  "headers": [
   "#",
   "Error mode",
   "Physics origin",
   "Typical magnitude (emblem)",
   "Classes hit hardest"
  ],
  "rows": [
   [
    "1",
    "Strong correlation / self-interaction",
    "Semilocal XC over-delocalizes localized d/f states",
    "La_2CuO_4 metallic, non-magnetic in plain DFT vs ~2 eV AFM insulator experiment [41][79]",
    "Superconductors, correlated oxides, cathodes"
   ],
   [
    "2",
    "Excited states / band gaps",
    "Error cancellation; missing spin–orbit coupling",
    "~1 eV SOC gap reduction in Pb-halide perovskites; QSGW +15% [18][17]",
    "Semiconductors, perovskite PV, topological materials"
   ],
   [
    "3",
    "Magnetism",
    "Mean-field decoupling of spin correlations; SIE on 4f",
    "Curie-temperature errors 15–35% with non-systematic sign [13][80]",
    "Permanent magnets, spintronics"
   ],
   [
    "4",
    "Barrier / transition-state error",
    "Near-equilibrium training bias softens PES curvature",
    "Migration-barrier MAE 0.310–0.349 eV vs ~60 meV DFT-NEB floor [1][2]",
    "Batteries, solid electrolytes, catalysis"
   ],
   [
    "5",
    "Finite-temperature / anharmonicity",
    "Harmonic labels; softened vibrational curvature",
    "Phonon softening ~15%; \\omega_{max} MAE 17–61 K [81][82]",
    "Hydride superconductors, thermoelectrics, perovskite phases"
   ],
   [
    "6",
    "Dispersion (van der Waals)",
    "Nonlocal correlation absent from semilocal XC",
    "Semi-empirical corrections 0.77–3.04\\times the RPA interlayer energy [16]",
    "2D/layered materials, MOFs, zeolites"
   ],
   [
    "7",
    "Disorder / composition space",
    "Local-environment diversity explodes with element count",
    "HEA energy errors 4–5\\times the 2.5 meV/atom usability threshold [4]",
    "HEAs, superalloys, high-entropy catalysts"
   ],
   [
    "8",
    "Long-range physics / transfer",
    "Finite cutoffs; unseen bond topologies",
    "CHA→MFI zeolite transfer inflates energy error ≥10\\times [4]",
    "Zeolites, MOFs, electrolytes, interfaces"
   ],
   [
    "9",
    "Rare events / timescales",
    "ps-scale MD vs device service lives",
    "Best cascade MLIP: 240 ps vs a 5-year service life (more than 15 orders of magnitude) [15]",
    "Fusion materials, dendrites, SEI degradation"
   ]
  ]
 },
 "scoreboard": {
  "headers": [
   "Row",
   "Failure mode",
   "Current state (verified)",
   "Demonstrated fix",
   "\"Solved\" target",
   "Readiness"
  ],
  "rows": [
   [
    "1",
    "Equilibrium-only pretraining bias",
    "Cleavage-energy median APE 14.7% (eSEN-MPTrj); 24.6% (MACE-MP) [19]",
    "Non-equilibrium OMat24 pretraining: 2.9% (eSEN, 5\\times); 3.7% vs 62.7% (EquiformerV2, 17\\times) [19]",
    "≤3–5% OOD property error across tasks",
    "H"
   ],
   [
    "2",
    "Systematic PES softening",
    "Parity slopes ~0.6; force MAE 337 meV/Å (vanilla CHGNet, WS_2) [87]",
    "One DFT structure halves error; ~100 frames → DFT-level [21][87]; PFT curvature fine-tuning −55% phonon-property error [88]",
    "Slope ≥0.95; \\kappaSRME ≤0.3",
    "H"
   ],
   [
    "3",
    "Wrong fidelity (PBE vs SCAN/HSE)",
    "r2SCAN reference data ~5\\times costlier than PBE [89]",
    "90% GGA + 10% SCAN ≈ model trained on 8\\times the SCAN data (Ko & Ong) [20]",
    "meta-GGA/hybrid fidelity at GGA data cost",
    "M"
   ],
   [
    "4",
    "Missing long-range physics",
    "Short-ranged MLIPs give unphysical water–vapor interfaces, polar dimers [90]",
    "Latent Ewald (LES) at ~2\\times cost; charges inferred from energies+forces alone [90][91]",
    "LR module default in foundation MLIPs",
    "M"
   ],
   [
    "5",
    "No in-simulation trust signal",
    "\"Failures occur without clear warning indicators\" [92]",
    "Misspecification-aware UQ bounds MACE-MPA-0 errors across Materials Project [93]; committee QbC [94]; heterogeneous ensembles [95]",
    "Calibrated error bars on every MD observable",
    "M"
   ],
   [
    "6",
    "Benchmark–reality gap",
    "Universal-MLFF density error 5.2% vs 2.5% for their own DFT labels; shear-modulus error 188.6% (calcite) [92]; pressures \"poorly described\" from DFT stress labels [96]",
    "Observable-first benchmarks exist: MS25 [4], Matbench Discovery (F1 0.931 SOTA) [97], UniFFBench [92], Dyna-Mat [96]",
    "Density MAPE ≤2–3%; elastic MAPE ≤10%; verified stress labels",
    "M"
   ],
   [
    "7",
    "Rare events / barriers",
    "MS25: 0.74 eV CH_4/Pt barrier recovered only within ±0.06 eV despite ~0.2 meV/atom energy errors [4]; migration-barrier MAE 0.310–0.349 eV over 574 paths [1][2]",
    "Non-equilibrium data + single-structure fixes partially help [19][21]; no barrier-targeted recipe yet",
    "Barrier MAE ≤40 meV (~1 kcal/mol)",
    "L"
   ],
   [
    "8",
    "Extreme conditions",
    "uMLIP accuracy \"deteriorates considerably\" from 0→150 GPa [98]",
    "Targeted high-pressure fine-tuning restores robustness [98]; MatterSim covers 0–5000 K, ≤1000 GPa with uncertainty-aware active learning [99]",
    "Uniform accuracy across the P–T envelope",
    "M"
   ],
   [
    "9",
    "Missing electronic degrees of freedom",
    "Standard MLIPs blind to spin and charge state",
    "SpinGNN++ sub-meV spin-lattice accuracy [100]; LES infers charges [91]; UMA takes spin+charge inputs [101]",
    "Spin/charge-aware universal models",
    "L"
   ],
   [
    "10",
    "Reference-functional ceiling",
    "MLIP inherits DFT error: adsorption ±0.2 eV [12][73]; voltages 0.7–1 V raw GGA [75]; OC20 plateau ~2 yr [3]",
    "NeuralXC [102]; DM21 (fails transition metals [103]) [104]; Skala 2.8 kcal/mol on GMTKN55 at semi-local cost [104]; experiment-anchored linear correction MAD 0.096 eV/atom [89]",
    "XC error < chemical accuracy on solids too",
    "L"
   ]
  ]
 },
 "matrix": {
  "headers": [
   "Class (Ch · chain)",
   "Dominant error mode(s)",
   "Headline quantified error",
   "CN priority",
   "US priority",
   "Fix readiness + named lever",
   "Impact domain"
  ],
  "rows": [
   [
    "Batteries (7 · 1)",
    "Mode 4 barriers; Row 10 voltage floor",
    "Barrier MAE 0.310–0.349 eV across 574 DFT-NEB paths vs ~60 meV floor; 73–78% of barriers underestimated [1][2]",
    "New-type storage 136 GW/351 GWh end-2025; >180 GW by 2027 [53][207]",
    "$500M battery-materials NOFO [374]",
    "H — non-equilibrium pretraining + micro-dose fine-tuning (Rows 1–2) [19][21]",
    "500 Wh/kg-class solid-state; EV cost, grid storage"
   ],
   [
    "Magnets (9 · 2)",
    "Mode 3 magnetism; Rows 9–10 spin/4f",
    "T_c errors 15–35% with non-systematic sign (Fe_2B +35%; Co_2B ×1.5 low) [13][80]; coercivity overestimated ~5× (Brown's paradox) [14]",
    "Rare-earth functional materials in 15FYP upgrade tier [22]; April 2025 HREE export licenses in force [69]",
    "USGS 60-mineral critical list [39]; ARPA-E MAGNITO 20M NOFO within a ~72M program (program total single-sourced) [57]",
    "L — spin-aware MLIPs (sub-meV demonstrated) + DLM/crystal-field references (Rows 9–10) [100]",
    "Motors and turbines immune to export controls"
   ],
   [
    "Catalysts (8 · 3)",
    "Row 10 reference-functional floor; Row 6 benchmark–reality gap",
    "GGA adsorption mean errors 0.2–0.4 eV vs experiment [12]; OC20 ML energy MAE plateaued ~0.2 eV for ~2 yr vs 0.1 eV target [3]",
    "2 Mt/yr renewable hydrogen by 2030 [236]",
    "Hydrogen Shot \"$1 for 1 kg in 1 decade\" [222]",
    "H — 90:10 GGA:SCAN Δ-learning (Row 3) + non-equilibrium data [20]",
    "Ir-free electrolyzers; green ammonia; sub-2/kg H_2$"
   ],
   [
    "HEAs & disorder (6 · 4)",
    "Mode 7 disorder/composition space",
    "MS25: five architectures 4–5× the 2.5 meV/atom threshold on a five-element alloy [4]; foundation model 617.9 meV/atom zero-shot (one benchmark suite) [5]",
    "Special steels/superalloys in 15FYP breakthrough tier; HEAs named in Guangzhou plan [22][32]",
    "ARPA-E ULTIMATE >1,300 °C (28M/20M/$23M phases) [50]",
    "M — per-family fine-tuning (Row 2 logic; 3.5 meV/atom recovered) [5]; MoE routing unvalidated",
    ">1,300 °C turbines; cryogenic-tough structures"
   ],
   [
    "Frameworks & 2D (11 · 5)",
    "Mode 6 dispersion; mode 8 transfer",
    "vdW corrections 0.77–3.04× RPA interlayer energies (one benchmark suite) [16]; CHA→MFI transfer inflates energy error ≥10× [4]",
    "15FYP 17% carbon-intensity cut; CCUS named key technology [63]",
    "Carbon Negative Shot <100/t by 2032 (1.27B pilots) [64]",
    "M — latent-Ewald long-range module (~2× cost, Row 4) [90]; stability labels still L",
    "Sub-$100/t carbon removal; separations"
   ],
   [
    "Semiconductors · perovskites · thermoelectrics (12 · 6, 11)",
    "Mode 2 excited states; mode 5 finite temperature",
    "LDA gap underestimate ~50% (472-material benchmark) [17]; Materials Project labels low ×~1.6 [352]; ~1 eV SOC cancellation in Pb-halide perovskites [18]",
    "15FYP \"decisive breakthroughs\" in semiconductors [348]",
    "CHIPS: 750M Wolfspeed SiC; 1.5B GlobalFoundries incl. GaN [67][347]",
    "M — cancellation-free GW stack + phonon fine-tuning; Row 5 UQ audit",
    "35%+ tandem solar; WBG power electronics; waste-heat recovery"
   ],
   [
    "Fusion materials (10 · 7)",
    "Mode 9 rare events/timescales; Row 7 binding",
    "Best cascade MLIP: 240 ps vs a 5-year service life (>15 orders of magnitude) [15]; RAFM data to ~20 dpa vs 50-dpa blanket need [7]",
    "Fusion among 15FYP \"new economic growth points\" [22]",
    "First DOE Office of Fusion (2025-11-20) [60]; 46M milestone + >350M private [297][298]",
    "L — validated cascade→OKMC qualification chain with calibrated UQ (Row 7)",
    "50-dpa-qualified blankets; tritium self-sufficiency"
   ],
   [
    "Superconductors (4 · 8)",
    "Mode 1 correlation; mode 5 anharmonicity",
    "No ab initio T_c for unconventional families — \"far from being predictive\" [9]; harmonic \\lambda 2.64 vs 1.84 anharmonic (~43% high) [8]; hydride T_c overshoot +10–15% [126][123]",
    "Superconductors in 15FYP frontier tier; fusion magnet manufacturing a named breakthrough [22][47]",
    "Milestone program 46M of 415M authorized [48]",
    "M hydrides / L cuprates — anharmonicity-aware MLIPs (Rows 2+8); ML-DMFT (Rows 9–10)",
    "Compact fusion magnets; lossless transmission"
   ],
   [
    "Correlated oxides (5 · 9)",
    "Mode 1 strong correlation/self-interaction",
    "Semilocal DFT returns NiO and CoO as metals [10][151]; ZnO O-vacancy energy split ~1 eV between HSE and DMC [11]; best-case exchange J 13% RMS [157]",
    "Quantum technology atop 15FYP future industries [181]",
    "National Quantum Initiative reauthorized ~$2.7B FY2025–29 [49]",
    "L — ML-DMFT solvers + experiment-anchored U (Rows 9–10)",
    "Neuromorphic and quantum hardware; ~100× efficient AI compute"
   ]
  ]
 },
 "quadrant": {
  "headers": [
   "",
   "Strategic value: industrial demand now",
   "Strategic value: program-gated frontier"
  ],
  "rows": [
   [
    "Fix readiness H/M — demonstrated data levers",
    "Near-term wedge: batteries (1), catalysts (3), HEAs (4). Semiconductors (6) share the cell but are incumbent-owned; the open niche is the error audit only",
    "Frameworks (5): procurement-grade funnels ahead of the carbon-removal market"
   ],
   [
    "Fix readiness L — physics missing, not data",
    "Chokepoint: magnets (2) — current demand, dated external gate (2026-11-10), hardest electronic-layer errors",
    "Option value: superconductors (8), correlated oxides (9), fusion (7)"
   ]
  ]
 },
 "chains": [
  {
   "id": 1,
   "title": "batteries: barrier-accurate MLIPs",
   "readiness": "H",
   "sentence": "Because we have unlocked barrier-accurate machine-learned interatomic potentials, we will discover solid electrolytes and cathode coatings with verified ionic transport, with verified-transport electrolytes we will be able to build 500 Wh/kg-class solid-state batteries. This impacts people in three ways to improve their world: cheaper, mineral-secure electric vehicles for drivers; affordable power for grid customers when the wind drops; first electricity, delivered as storage, for off-grid communities.",
   "unlock": "barrier-accurate machine-learned interatomic potentials",
   "discover": "solid electrolytes and cathode coatings with verified ionic transport",
   "build": "500 Wh/kg-class solid-state batteries",
   "impacts": [
    "cheaper, mineral-secure electric vehicles for drivers",
    "affordable power for grid customers when the wind drops",
    "first electricity, delivered as storage, for off-grid communities"
   ],
   "solved": "barrier MAE ≤ 40 meV (≈1 kcal/mol) across chemistries.",
   "horizon": "within reach of demonstration",
   "defenseHtml": "<p>The gap is the largest measured in this paper: foundation MLIPs miss migration barriers by 0.310–0.349 eV across 574 DFT-NEB paths — four to six times the ~60 meV reference floor — and two models <em>underestimate</em> 73–78% of barriers, a one-directional optimism no funnel averages out.<sup class=\"cite\" data-ref=\"1\">[1]</sup><sup class=\"cite\" data-ref=\"2\">[2]</sup> The unlock is the scoreboard's two H-rated data levers: non-equilibrium pretraining (5–17<span class=\"math\">$\\times$</span> out-of-distribution error cuts at identical architecture) and micro-dose fine-tuning (one DFT structure halves the systematic softening).<sup class=\"cite\" data-ref=\"19\">[19]</sup><sup class=\"cite\" data-ref=\"376\">[376]</sup> Solved means barrier MAE ≤ 40 meV (≈1 kcal/mol) across chemistries. Demand is already paid for — DOE's $500M battery-materials NOFO; nobody funds the barrier accuracy it is gated on.<sup class=\"cite\" data-ref=\"374\">[374]</sup> Horizon: within reach of demonstration.</p>\n"
  },
  {
   "id": 2,
   "title": "magnets: spin-aware multi-fidelity MLIPs",
   "readiness": "M",
   "sentence": "Because we have unlocked spin-aware, multi-fidelity magnetic simulation, we will discover NdFeB-class rare-earth-free magnets — Fe$_{16}$N$_2$, MnAlC, kinetically unlocked tetrataenite — with such magnets we will be able to build motors and turbines immune to export controls. This impacts people in three ways to improve their world: drivers and factory towns whose EVs and wind power stop pricing in a chokepoint; planners who quit scheduling around a foreign licensing decision; magnet workers competing on physics instead of quotas.",
   "unlock": "spin-aware, multi-fidelity magnetic simulation",
   "discover": "",
   "build": "motors and turbines immune to export controls",
   "impacts": [
    "drivers and factory towns whose EVs and wind power stop pricing in a chokepoint",
    "planners who quit scheduling around a foreign licensing decision",
    "magnet workers competing on physics instead of quotas"
   ],
   "solved": "ranking-faithful magnetocrystalline anisotropy energy and $T_c$, plus microstructure-aware coercivity bounds.",
   "horizon": "demonstrated fidelity stack first, certified coercivity after",
   "defenseHtml": "<p>The blockers are measured: mean-field decoupling misprices Curie temperatures by 15–35% with non-systematic sign (Fe<span class=\"math\">$_2$</span>B +35%, Co<span class=\"math\">$_2$</span>B <span class=\"math\">$\\times 1.5$</span> low), and continuum micromagnetics overestimates coercivity ~5<span class=\"math\">$\\times$</span> without grain-boundary chemistry (Brown's paradox).<sup class=\"cite\" data-ref=\"13\">[13]</sup><sup class=\"cite\" data-ref=\"14\">[14]</sup> The fix exists in principle: SpinGNN++ reaches sub-meV spin-lattice accuracy, and one study finds 90:10 GGA:SCAN Δ-learning matching 8<span class=\"math\">$\\times$</span> the high-fidelity data.<sup class=\"cite\" data-ref=\"100\">[100]</sup><sup class=\"cite\" data-ref=\"20\">[20]</sup> Solved means ranking-faithful magnetocrystalline anisotropy energy and <span class=\"math\">$T_c$</span>, plus microstructure-aware coercivity bounds. ARPA-E's MAGNITO program — a $20M NOFO within a ~$72M program-level effort, the larger figure single-sourced to one awardee announcement — funds exactly this chemistry-and-microstructure mandate,<sup class=\"cite\" data-ref=\"57\">[57]</sup> and the October 2025 export-rule suspension lapses 2026-11-10.<sup class=\"cite\" data-ref=\"68\">[68]</sup> Horizon: demonstrated fidelity stack first, certified coercivity after.</p>\n"
  },
  {
   "id": 3,
   "title": "catalysts: Δ-learned hybrid-accuracy screening with operando validation",
   "readiness": "M",
   "sentence": "Because we have unlocked hybrid-accuracy catalyst screening — Δ-learned labels with operando validation — we will discover iridium-free electrolyzer and ammonia catalysts, with such catalysts we will be able to build sub-\\$2/kg green hydrogen and decarbonized fertilizer and steel. This impacts people in three ways to improve their world: farmers whose fertilizer bill decides between harvest and hunger; steelworkers whose plants survive carbon pricing; energy importers whose costs stop depending on a few metal and gas suppliers.",
   "unlock": "",
   "discover": "iridium-free electrolyzer and ammonia catalysts",
   "build": "sub-\\$2/kg green hydrogen and decarbonized fertilizer and steel",
   "impacts": [
    "farmers whose fertilizer bill decides between harvest and hunger",
    "steelworkers whose plants survive carbon pricing",
    "energy importers whose costs stop depending on a few metal and gas suppliers"
   ],
   "solved": "adsorption within ~0.1 eV of experiment at screening cost.",
   "horizon": "within reach of demonstration",
   "defenseHtml": "<p>The floor is twice measured against experiment: GGA adsorption energies err by 0.2–0.4 eV, and even the random-phase approximation deviates ~0.2 eV.<sup class=\"cite\" data-ref=\"12\">[12]</sup><sup class=\"cite\" data-ref=\"73\">[73]</sup> Open Catalyst 2020's builders document the inheritance — ML errors plateaued at ~0.2 eV for two years against a 0.1 eV target — and Arrhenius does the damage: 0.06 eV (≈1 kcal/mol) is a factor of ten in rate at 300 K.<sup class=\"cite\" data-ref=\"3\">[3]</sup> The escalator is demonstrated in principle: one study finds 90:10 GGA:SCAN ≈ 8<span class=\"math\">$\\times$</span> the SCAN data; OCx24 shows the operando validation template.<sup class=\"cite\" data-ref=\"20\">[20]</sup><sup class=\"cite\" data-ref=\"231\">[231]</sup> Solved means adsorption within ~0.1 eV of experiment at screening cost. Demand is dated: China's 2 Mt/yr renewable-hydrogen target for 2030; the US Hydrogen Shot's $1/kg.<sup class=\"cite\" data-ref=\"236\">[236]</sup><sup class=\"cite\" data-ref=\"222\">[222]</sup> Horizon: within reach of demonstration.</p>\n"
  },
  {
   "id": 4,
   "title": "high-entropy alloys: disorder-native MLIPs",
   "readiness": "M",
   "sentence": "Because we have unlocked disorder-native machine-learned interatomic potentials — mixture-of-experts, short-range-order-aware — we will discover high-entropy alloys and superalloys with targeted properties, with such alloys we will be able to build turbines running above 1{,}300 °C and structures that stay tough at cryogenic temperature. This impacts people in three ways to improve their world: air travelers and the climate beneath them, through 5–7% turbine efficiency gains; LNG shippers and space programs whose tanks stop being the brittle link; defense planners who need alloys no supplier can embargo.",
   "unlock": "",
   "discover": "high-entropy alloys and superalloys with targeted properties",
   "build": "turbines running above 1{,}300 °C and structures that stay tough at cryogenic temperature",
   "impacts": [
    "air travelers and the climate beneath them, through 5–7% turbine efficiency gains",
    "LNG shippers and space programs whose tanks stop being the brittle link",
    "defense planners who need alloys no supplier can embargo"
   ],
   "solved": "≤2.5 meV/atom on a DFT-labeled, short-range-order-resolved multi-composition benchmark; element-wise mixture-of-experts routing is the candidate architecture, unvalidated on HEAs.[^196^] Both governments pay for the outcome — ARPA-E's ULTIMATE targets >1,300 °C operation; China's 15FYP names superalloys verbatim.[^50^][^22^] Horizon: the 3.5 meV/atom per-family datum says threshold accuracy is within reach of demonstration.",
   "horizon": "the 3.5 meV/atom per-family datum says threshold accuracy is within reach of demonstration",
   "defenseHtml": "<p>Composition space is this paper's one controlled failure: MS25's five-element alloy defeats five architectures at 4–5<span class=\"math\">$\\times$</span> the 2.5 meV/atom usability threshold, against a classical-potential ground truth — no label noise to blame.<sup class=\"cite\" data-ref=\"4\">[4]</sup> One benchmark suite finds a foundation model 617.9 meV/atom off a 25-element HEA zero-shot, recovered to 3.5 by fine-tuning: coverage, not capacity.<sup class=\"cite\" data-ref=\"5\">[5]</sup> Solved means ≤2.5 meV/atom on a DFT-labeled, short-range-order-resolved multi-composition benchmark; element-wise mixture-of-experts routing is the candidate architecture, unvalidated on HEAs.<sup class=\"cite\" data-ref=\"196\">[196]</sup> Both governments pay for the outcome — ARPA-E's ULTIMATE targets &gt;1,300 °C operation; China's 15FYP names superalloys verbatim.<sup class=\"cite\" data-ref=\"50\">[50]</sup><sup class=\"cite\" data-ref=\"22\">[22]</sup> Horizon: the 3.5 meV/atom per-family datum says threshold accuracy is within reach of demonstration.</p>\n"
  },
  {
   "id": 5,
   "title": "porous frameworks: dispersion-corrected MLIPs",
   "readiness": "M",
   "sentence": "Because we have unlocked dispersion-corrected machine-learned interatomic potentials, we will discover water-stable MOFs and COFs for direct air capture and low-energy separations, with such frameworks we will be able to build sub-\\$100-per-tonne carbon removal. This impacts people in three ways to improve their world: coastal and farming communities buying time against climate instability; industrial towns whose cement and steel stay local; the billions for whom clean water and cheap separations are one technology.",
   "unlock": "dispersion-corrected machine-learned interatomic potentials",
   "discover": "water-stable MOFs and COFs for direct air capture and low-energy separations",
   "build": "sub-\\$100-per-tonne carbon removal",
   "impacts": [
    "coastal and farming communities buying time against climate instability",
    "industrial towns whose cement and steel stay local",
    "the billions for whom clean water and cheap separations are one technology"
   ],
   "solved": "scheme-consistent enthalpies within ~4 kJ/mol plus thermodynamic water-stability classification.",
   "horizon": "the Kemira–CuspAI six-month funnel shows the procurement shape; the stability-label dataset is buildable at single-lab scale",
   "defenseHtml": "<p>Cohesion here is dispersion, and dispersion is a scheme lottery: one benchmark suite finds semi-empirical corrections at 0.77–3.04<span class=\"math\">$\\times$</span> the RPA interlayer energy.<sup class=\"cite\" data-ref=\"16\">[16]</sup> Framework energetics are worse — the same functional overbinds one framework by 9 kJ/mol and underbinds the next by 11, sign-flipping errors on a 30–40 kJ/mol quantity — and MLIPs trained on one zeolite degrade ≥10<span class=\"math\">$\\times$</span> on the next.<sup class=\"cite\" data-ref=\"333\">[333]</sup><sup class=\"cite\" data-ref=\"4\">[4]</sup> The underpriced axis is water: MOF-74's hydrolysis driving force exceeds ZIFs' by 200–250 kJ/mol per metal (≈2.1–2.6 eV; 96.485 kJ/mol = 1 eV).<sup class=\"cite\" data-ref=\"45\">[45]</sup> Solved means scheme-consistent enthalpies within ~4 kJ/mol plus thermodynamic water-stability classification. The buyer exists: the Carbon Negative Shot prices removal under $100/t by 2032 with $1.27B of pilots.<sup class=\"cite\" data-ref=\"64\">[64]</sup> Horizon: the Kemira–CuspAI six-month funnel shows the procurement shape; the stability-label dataset is buildable at single-lab scale.</p>\n"
  },
  {
   "id": 6,
   "title": "semiconductors and perovskites: an error-cancellation-free excited-state stack",
   "readiness": "M",
   "sentence": "Because we have unlocked an error-cancellation-free excited-state stack — QSGW-grade references absorbed by machine learning — we will discover stable perovskite tandems and wide-bandgap power devices, with them we will be able to build 35%-plus solar modules and Ga$_2$O$_3$/diamond-class power electronics. This impacts people in three ways to improve their world: households whose electricity gets cheaper per roof; grid operators whose inverters waste less as heat; communities whose air improves when the cheapest electron is also the cleanest.",
   "unlock": "",
   "discover": "stable perovskite tandems and wide-bandgap power devices",
   "build": "35%-plus solar modules and Ga$_2$O$_3$/diamond-class power electronics",
   "impacts": [
    "households whose electricity gets cheaper per roof",
    "grid operators whose inverters waste less as heat",
    "communities whose air improves when the cheapest electron is also the cleanest"
   ],
   "solved": "right gaps for the right reasons at screening cost — vertex-corrected QSGW, shown to flag dubious experiments, with ML absorbing the $\\mathcal{O}(N^4)$ price.[^17^] The policy pull is explicit: DOE SETO's PRIMES topic puts \\$3–20M per project into perovskite-tandem manufacturing.[^372^] Horizon: proven at benchmark cost; the screening-cost version is within reach of demonstration.",
   "horizon": "proven at benchmark cost; the screening-cost version is within reach of demonstration",
   "defenseHtml": "<p>The pathology is right answers for wrong reasons: LDA undershoots gaps ~50% across a 472-material all-electron benchmark, and scalar-relativistic DFT matches the MAPbI<span class=\"math\">$_3$</span> gap only because the GGA underestimate cancels a ~1 eV spin–orbit term — correct number, wrong band curvatures.<sup class=\"cite\" data-ref=\"17\">[17]</sup><sup class=\"cite\" data-ref=\"18\">[18]</sup> A tandem top cell wants ±0.05 eV compositional targeting; against these label floors that screen is unscreenable. Solved means right gaps for the right reasons at screening cost — vertex-corrected QSGW, shown to flag dubious experiments, with ML absorbing the <span class=\"math\">$\\mathcal{O}(N^4)$</span> price.<sup class=\"cite\" data-ref=\"17\">[17]</sup> The policy pull is explicit: DOE SETO's PRIMES topic puts $3–20M per project into perovskite-tandem manufacturing.<sup class=\"cite\" data-ref=\"372\">[372]</sup> Horizon: proven at benchmark cost; the screening-cost version is within reach of demonstration.</p>\n"
  },
  {
   "id": 7,
   "title": "fusion materials: rare-event-validated MLIPs with uncertainty quantification",
   "readiness": "L",
   "sentence": "Because we have unlocked rare-event-validated machine-learned interatomic potentials with calibrated uncertainty, we will discover 50-dpa-qualified reduced-activation steels, first-wall alloys, and breeding ceramics, with them we will be able to build commercial fusion blankets. This impacts people in three ways to improve their world: cities and industries needing firm clean power when sun and wind fail; ratepayers whose decarbonization stops requiring overbuild; publics whose fusion promise runs on a ~25 kg world tritium stock against 55.8 kg burned per gigawatt of fusion-thermal power per full-power year.[^311^][^312^]",
   "unlock": "rare-event-validated machine-learned interatomic potentials with calibrated uncertainty",
   "discover": "50-dpa-qualified reduced-activation steels, first-wall alloys, and breeding ceramics",
   "build": "commercial fusion blankets",
   "impacts": [
    "cities and industries needing firm clean power when sun and wind fail",
    "ratepayers whose decarbonization stops requiring overbuild",
    "publics whose fusion promise runs on a ~25 kg world tritium stock against 55.8 kg burned per gigawatt of fusion-thermal power per full-power year.[^311^][^312^]"
   ],
   "solved": "a cascade-to-rate-theory hand-off whose every source term carries a calibrated error bar, citable in a licensing case before IFMIF-DONES produces fusion-spectrum data around 2034.[^286^] The buyer has no alternative instrument: the milestone program has drawn >\\$350M of private follow-on, plus ~\\$220M in FIRE Collaboratives.[^298^] Horizon: set by the facility clock, not by promises.",
   "horizon": "set by the facility clock, not by promises",
   "defenseHtml": "<p>The gap is a timescale chasm with a validation wall behind it: the best cascade MLIP runs 8.1 million atoms for 240 ps — more than 15 orders of magnitude short of a five-year service life — and the fusion-relevant steel database ends near 20 dpa against a 50-dpa DEMO blanket (the &quot;20 dpa wall&quot; is one industry synthesis's framing; the embrittlement data beneath are peer-reviewed).<sup class=\"cite\" data-ref=\"15\">[15]</sup><sup class=\"cite\" data-ref=\"6\">[6]</sup><sup class=\"cite\" data-ref=\"7\">[7]</sup> Solved means a cascade-to-rate-theory hand-off whose every source term carries a calibrated error bar, citable in a licensing case before IFMIF-DONES produces fusion-spectrum data around 2034.<sup class=\"cite\" data-ref=\"286\">[286]</sup> The buyer has no alternative instrument: the milestone program has drawn &gt;$350M of private follow-on, plus ~$220M in FIRE Collaboratives.<sup class=\"cite\" data-ref=\"298\">[298]</sup> Horizon: set by the facility clock, not by promises.</p>\n"
  },
  {
   "id": 8,
   "title": "superconductors: anharmonicity-aware MLIPs plus ML-DMFT",
   "readiness": "L",
   "sentence": "Because we have unlocked anharmonicity-aware machine-learned interatomic potentials and ML-accelerated dynamical mean-field theory, we will discover optimized hydride and high-$T_c$ superconductors and the cuprate pairing mechanism, with them we will be able to build compact fusion magnets and lossless transmission. This impacts people in three ways to improve their world: fusion programs whose magnet cost decides whether they exist; grid users whose transmission losses become optional; patients and commuters whose MRIs and maglev lines inherit the conductor.",
   "unlock": "anharmonicity-aware machine-learned interatomic potentials and ML-accelerated dynamical mean-field theory",
   "discover": "optimized hydride and high-$T_c$ superconductors and the cuprate pairing mechanism",
   "build": "compact fusion magnets and lossless transmission",
   "impacts": [
    "fusion programs whose magnet cost decides whether they exist",
    "grid users whose transmission losses become optional",
    "patients and commuters whose MRIs and maglev lines inherit the conductor"
   ],
   "solved": "quantitative $\\lambda$ and $\\omega_{\\log}$ with uncertainty, plus superexchange $J$ trends at cluster-DMFT fidelity.",
   "horizon": "ingredient quantities within reach; headline temperatures never promised",
   "defenseHtml": "<p>I rank this chain last among the physics classes because the missing piece is physics, not accuracy. For hydrides the errors are bounded and priced: harmonic theory overestimates H<span class=\"math\">$_3$</span>S's electron-phonon coupling <span class=\"math\">$\\lambda$</span> by ~43% (2.64 versus the anharmonic 1.84), and 93% of one national-lab hydride screen's compute went to harmonic-level DFPT electron-phonon-coupling calculations — the block an anharmonic MLIP collapses.<sup class=\"cite\" data-ref=\"8\">[8]</sup><sup class=\"cite\" data-ref=\"129\">[129]</sup> For cuprates there is no equation to surrogate: &quot;ab-initio approaches are still far from being predictive.&quot;<sup class=\"cite\" data-ref=\"9\">[9]</sup> Solved means quantitative <span class=\"math\">$\\lambda$</span> and <span class=\"math\">$\\omega_{\\log}$</span> with uncertainty, plus superexchange <span class=\"math\">$J$</span> trends at cluster-DMFT fidelity. Both governments fund the destination — China's frontier tier, the Genesis Mission's $293M.<sup class=\"cite\" data-ref=\"22\">[22]</sup><sup class=\"cite\" data-ref=\"25\">[25]</sup> Horizon: ingredient quantities within reach; headline temperatures never promised.</p>\n"
  },
  {
   "id": 9,
   "title": "correlated oxides: correlation-aware MLIPs",
   "readiness": "L",
   "sentence": "Because we have unlocked correlation-aware machine-learned interatomic potentials — spin- and electronic-degrees-of-freedom models anchored to experiment — we will discover Mott and correlated-oxide device materials, with them we will be able to build neuromorphic and memory hardware. This impacts people in three ways to improve their world: data-center operators and the publics whose grids feed them, on the hardware path to roughly 100$\\times$ more efficient AI compute; quantum engineers whose qubits lose fewer photons to oxide defects; everyone whose AI bill is currently an electricity bill.",
   "unlock": "",
   "discover": "Mott and correlated-oxide device materials",
   "build": "neuromorphic and memory hardware",
   "impacts": [
    "data-center operators and the publics whose grids feed them, on the hardware path to roughly 100$\\times$ more efficient AI compute",
    "quantum engineers whose qubits lose fewer photons to oxide defects",
    "everyone whose AI bill is currently an electricity bill"
   ],
   "solved": "screening-capable correlated energetics with $J$ errors bounded against neutron data.",
   "horizon": "the longest in my portfolio — capability first, a named target only after prospective validation",
   "defenseHtml": "<p>The stack is blind at the ground state: scalar-equivariant potentials &quot;cannot deal with spin,&quot; and the numerically exact impurity solvers scale as <span class=\"math\">$O(T^{-3})$</span> with a fermionic sign problem — correct methods that cannot screen.<sup class=\"cite\" data-ref=\"100\">[100]</sup><sup class=\"cite\" data-ref=\"164\">[164]</sup> Best-practice correction still leaves 13% RMS on NiO's exchange integrals; two methods a practitioner would each call accurate — HSE and diffusion Monte Carlo — split ~1 eV on ZnO's oxygen vacancy.<sup class=\"cite\" data-ref=\"157\">[157]</sup><sup class=\"cite\" data-ref=\"11\">[11]</sup> Solved means screening-capable correlated energetics with <span class=\"math\">$J$</span> errors bounded against neutron data. The policy gate is dated: NSF's X-Labs Quantum Systems topic, built for independent research organizations, closes 2026-07-24 inside a ~$2.7B reauthorized National Quantum Initiative.<sup class=\"cite\" data-ref=\"184\">[184]</sup><sup class=\"cite\" data-ref=\"49\">[49]</sup> Horizon: the longest in my portfolio — capability first, a named target only after prospective validation.</p>\n"
  },
  {
   "id": 10,
   "title": "the stability meta-chain: a stability-first discovery loop",
   "readiness": "M",
   "sentence": "Because we have unlocked a stability-first discovery loop — synthesizability scoring with autonomous-lab validation — we will discover validated, makeable candidates at scale, with them we will be able to build the trusted AI-materials pipeline every other chain ships through. This impacts people in three ways to improve their world: the beneficiaries of chains 1–9, whose candidate survives contact with a furnace; experimentalists whose benches stop digesting hallucinated crystals; publics whose materials sovereignty rests on verified databases instead of press releases.",
   "unlock": "",
   "discover": "validated, makeable candidates at scale",
   "build": "the trusted AI-materials pipeline every other chain ships through",
   "impacts": [
    "the beneficiaries of chains 1–9, whose candidate survives contact with a furnace",
    "experimentalists whose benches stop digesting hallucinated crystals",
    "publics whose materials sovereignty rests on verified databases instead of press releases"
   ],
   "solved": "a published, third-party-reproduced record where the majority of delivered candidates survive synthesis.",
   "horizon": "within reach of demonstration — executed first, because it de-risks all the others",
   "defenseHtml": "<p>The underpriced axis is makeability, and the field's own meta-analysis says so: once adsorption-energy uncertainty is included, overpotential screening misclassifies a broad fraction of candidates, and the prescribed pivot is &quot;synthesizability, stability, lifetime or affordability.&quot;<sup class=\"cite\" data-ref=\"44\">[44]</sup> The denominator is brutal — over 100,000 synthesized MOFs have yielded a handful of products<sup class=\"cite\" data-ref=\"338\">[338]</sup> — and the credibility register runs from A-Lab's corrected novelty claims<sup class=\"cite\" data-ref=\"28\">[28]</sup> to the fabricated &quot;44% more materials&quot; statistic. The gates exist: Matbench Discovery ranks stability prediction publicly (F1 0.931 SOTA), and the Genesis Mission's autonomous-laboratories challenge is the funding pool.<sup class=\"cite\" data-ref=\"97\">[97]</sup><sup class=\"cite\" data-ref=\"149\">[149]</sup> Solved means a published, third-party-reproduced record where the majority of delivered candidates survive synthesis. Horizon: within reach of demonstration — executed first, because it de-risks all the others.</p>\n"
  },
  {
   "id": 11,
   "title": "thermoelectrics: anharmonicity-aware thermal-conductivity prediction",
   "readiness": "L",
   "sentence": "Because we have unlocked anharmonicity-aware thermal-conductivity prediction, we will discover earth-abundant, zT>2-class mid-temperature thermoelectrics, with them we will be able to build industrial and data-center waste-heat recovery. This impacts people in three ways to improve their world: factory towns whose process heat becomes electricity instead of emissions; data-center neighbors whose bills carry less of AI's waste; grid customers who receive the recovered megawatts as an efficiency dividend.",
   "unlock": "anharmonicity-aware thermal-conductivity prediction",
   "discover": "earth-abundant, zT>2-class mid-temperature thermoelectrics",
   "build": "industrial and data-center waste-heat recovery",
   "impacts": [
    "factory towns whose process heat becomes electricity instead of emissions",
    "data-center neighbors whose bills carry less of AI's waste",
    "grid customers who receive the recovered megawatts as an efficiency dividend"
   ],
   "solved": "quantitative lattice thermal conductivity with four-phonon and higher-order channels by default; curvature-targeted phonon fine-tuning (−55% phonon-property error, a single study reports) is the partial fix.[^88^] No program owns the $\\kappa$-label problem; demand is private — one market-analysis firm sizes thermoelectric generators at ~\\$1.05B (2025), waste-heat recovery 62.5%.[^377^] Horizon: frontier — the physics gap closes before the screening gap can.",
   "horizon": "frontier — the physics gap closes before the screening gap can",
   "defenseHtml": "<p>The anchor is the field's most honest unknown: three-phonon theory put boron arsenide at ~2,200 W/m·K, four-phonon physics cut it to ~1,400, and the best 2025 crystals measure ~2,100–2,200 — &quot;cannot be explained by existing theory.&quot;<sup class=\"cite\" data-ref=\"357\">[357]</sup><sup class=\"cite\" data-ref=\"358\">[358]</sup><sup class=\"cite\" data-ref=\"361\">[361]</sup> A <span class=\"math\">$\\kappa$</span> model trained on three-phonon labels inherits that unknown as ground truth, and universal MLIPs already soften phonon frequencies ~15%.<sup class=\"cite\" data-ref=\"363\">[363]</sup> Solved means quantitative lattice thermal conductivity with four-phonon and higher-order channels by default; curvature-targeted phonon fine-tuning (−55% phonon-property error, a single study reports) is the partial fix.<sup class=\"cite\" data-ref=\"88\">[88]</sup> No program owns the <span class=\"math\">$\\kappa$</span>-label problem; demand is private — one market-analysis firm sizes thermoelectric generators at ~$1.05B (2025), waste-heat recovery 62.5%.<sup class=\"cite\" data-ref=\"377\">[377]</sup> Horizon: frontier — the physics gap closes before the screening gap can.</p>\n"
  }
 ],
 "chainSummary": {
  "headers": [
   "Chain",
   "Class (chapter)",
   "Unlock — readiness",
   "Anchor error figure: current → solved",
   "Policy gate",
   "Horizon"
  ],
  "rows": [
   [
    "1",
    "Batteries (Ch. 7)",
    "Barrier-accurate MLIPs — H",
    "MAE 0.310–0.349 eV vs 60 meV floor → ≤40 meV [1]",
    "DOE \\$500M battery NOFO [374]",
    "Within reach of demonstration"
   ],
   [
    "2",
    "Magnets (Ch. 9)",
    "Spin-aware multi-fidelity MLIPs — M",
    "T_c 15–35%, sign-unstable [13]; coercivity ~5\\times [14] → ranking-faithful + coercivity bounds",
    "ARPA-E MAGNITO \\$20M NOFO in ~\\$72M program (single-sourced) [57]; rule lapse 2026-11-10 [68]",
    "Fidelity stack first"
   ],
   [
    "3",
    "Catalysts (Ch. 8)",
    "Δ-learned hybrid screening + operando — M",
    "Adsorption ±0.2 eV floor [12][73] → ~0.1 eV at screening cost",
    "China 2 Mt/yr H_2 2030 [236]; Hydrogen Shot \\$1/kg [222]",
    "Within reach of demonstration"
   ],
   [
    "4",
    "HEAs (Ch. 6)",
    "Disorder-native MLIPs — M",
    "MS25 4–5\\times threshold [4]; 617.9 → 3.5 meV/atom [5] → ≤2.5 meV/atom",
    "ARPA-E ULTIMATE [50]; 15FYP superalloys [22]",
    "Within reach of demonstration"
   ],
   [
    "5",
    "Frameworks (Ch. 11)",
    "Dispersion-corrected MLIPs — M",
    "vdW 0.77–3.04\\times [16]; cross-framework ≥10\\times [4] → ~4 kJ/mol + water stability",
    "Carbon Negative Shot <\\$100/t 2032 [64]",
    "Procurement shape proven"
   ],
   [
    "6",
    "WBG/perovskites (Ch. 12)",
    "Cancellation-free excited-state stack — M",
    "LDA ~50% [17]; ~1 eV SOC cancellation [5] → right gaps at screening cost",
    "SETO PRIMES \\$3–20M [372]",
    "Method proven at benchmark cost"
   ],
   [
    "7",
    "Fusion (Ch. 10)",
    "Rare-event MLIPs + UQ — L",
    "240 ps vs 5 yr [15]; 20 of 50 dpa [6][7] → calibrated cascade→rate-theory hand-off",
    "Milestone >\\$350M private; FIRE ~\\$220M [298]",
    "Gated by IFMIF-DONES ~2034 [286]"
   ],
   [
    "8",
    "Superconductors (Ch. 4)",
    "Anharmonic MLIPs + ML-DMFT — L",
    "Harmonic \\lambda +43% [8]; no ab initio T_c [9] → \\lambda/\\omega_{\\log} with uncertainty",
    "15FYP frontier tier [22]; Genesis \\$293M [25]",
    "Ingredients within reach"
   ],
   [
    "9",
    "Correlated oxides (Ch. 5)",
    "Spin/electronic-DOF MLIPs — L",
    "Spin-blind scalars [100]; DMFT O(T^{-3}) [164] → screening-capable correlated energetics",
    "NQI ~\\$2.7B [49]; X-Labs closes 2026-07-24 [184]",
    "Longest; capability first"
   ],
   [
    "10",
    "Stability (Ch. 14)",
    "Stability-first discovery loop — M",
    ">100,000 MOFs → handful of products [338] → majority-survival validated funnels",
    "Genesis autonomous labs [149]; Matbench Discovery gate [97]",
    "Execute first"
   ],
   [
    "11",
    "Thermoelectrics (Ch. 12)",
    "Anharmonic \\kappa prediction — L",
    "BAs 2,200 → 1,400 → ~2,100 W/m·K unexplained [361][358][357] → quantitative \\kappa_l, 4-phonon+ default",
    "None dedicated; waste heat 62.5% of TEG demand [377]",
    "Frontier: physics first"
   ]
  ]
 },
 "gates": {
  "headers": [
   "Date",
   "Event",
   "Consequence for this program"
  ],
  "rows": [
   [
    "2026-07-27",
    "First NSF SBIR full-proposal deadline (solicitation 26-510) [27]",
    "Start gun, not my gate: mandatory pitch review [27] puts my entry at 2026-11-04; the pitch submitted beforehand keeps November open."
   ],
   [
    "~Aug 2026",
    "ERCAP AY2027 window opens; closes early Oct [71]",
    "First allocation I can hold: request through the SBIR pool (100,800 CPU + 58,800 GPU node-h, AY2025 [431]) the day an award exists; a miss costs twelve months."
   ],
   [
    "~Nov 2026",
    "ALCC 2027–28 call expected [71]",
    "Conditional: submit only with federal funding and a named DOE sponsor — ALCC awards time, never dollars, to the already-funded [445]; otherwise skip a cycle."
   ],
   [
    "2026-11-10",
    "October 2025 rare-earth export-rule suspension lapses [68]",
    "Chain 2's repricing event and my China compliance gate: nothing in the plan depends on renewal; a lapse accelerates the magnets campaign and freezes any PRC-presence decision."
   ],
   [
    "end-2027",
    "BEST device completion; blanket-module tests [59]",
    "First burning-plasma tritium-breeding test bed; demand appears for the breeding-ceramic and RAFM validation data Chain 7 supplies."
   ],
   [
    "2027",
    "SPARC first plasma targeted; Q>1 goal [446]",
    "Private fusion starts engineering around the materials bottleneck; validated first-wall and cascade simulation gains its first commercial buyers (milestone cohort: >$350M private follow-on [298])."
   ],
   [
    "2028",
    "Helion–Microsoft PPA power due, with penalties [294]",
    "The first delivery obligation with financial teeth; licensing-grade uncertainty quantification becomes a procurement line item rather than a virtue."
   ],
   [
    "~2034",
    "IFMIF-DONES fully operational; first fusion-spectrum data [286]",
    "My qualification package must be citable before this date to shape what gets measured; afterward the 20-dpa wall starts falling and late entrants chase data."
   ],
   [
    "2039",
    "ITER deuterium–tritium operations (Baseline 2024) [291]",
    "The conservative backstop: if simulation-led qualification has not demonstrated value by ITER's DT phase, the long game has failed on its own terms."
   ],
   [
    "2026–2030",
    "15FYP window: fifteen named material classes funded whole-chain; codified on-ramps cluster 2026–27 [22]",
    "The decision window for any China research presence; the dual-alignment posture of Chapter 16 holds — engagement designed so nothing depends on the 2026-11-10 suspension being renewed."
   ]
  ]
 },
 "phases": {
  "headers": [
   "Phase",
   "Error-correction milestone (gap it closes)",
   "Validation milestone",
   "Discovery target (chain ID)",
   "Funding/compute gate",
   "Hard external gate"
  ],
  "rows": [
   [
    "1: months 0–24",
    "Replicate Rows 1–3 plus curvature-targeted phonon fine-tuning (PFT) on my classes: non-equilibrium augmentation (5–17× out-of-distribution error cuts at identical architecture [19]); 1→100-frame dose-response [21][87]; 90:10 Δ-learning (one study [20]); PFT (single study [88])",
    "MS25-style observable-first benchmark public (0.74 eV barrier recovered only ±0.06 eV at ~0.2 meV/atom energy error [4]); compliant Matbench Discovery submission (SOTA F1 0.931 [97]); OpenKIM deposit, passing checks [115]",
    "Chain 1 (barrier MAE 0.310–0.349 eV vs 60 meV floor [1]); Chain 4 (MS25 five-element alloy at 4–5× threshold [4]); Chain 10 loop stood up",
    "NSF SBIR pitch → 2026-11-04 window [27]; DOE SBIR summer 2026 (agency-signaled [423]); ACCESS + EuroHPC free tiers [441][442][443]; ERCAP SBIR pool [431]; NAIRR on first award [426]; Genesis Phase II as lab sub [25]",
    "2026-07-27 first NSF deadline (pitch mechanics [27]); ERCAP closes early Oct 2026 [71]; 2026-11-10 rare-earth rule lapse [68]"
   ],
   [
    "2: years 2–5",
    "Chain campaigns: barrier-targeted training toward ≤40 meV MAE; spin-aware multi-fidelity stack (T_c errors 15–35%, sign-unstable [13]; coercivity ~5× [14]); disorder-native/MoE potentials toward ≤2.5 meV/atom [5]; Δ-learned adsorption toward ~0.1 eV vs the 0.2–0.4 eV GGA floor [12][73]",
    "Prospective barriers against fresh DFT nudged-elastic-band (NEB) paths; coercivity bounds against experiment; Director's Discretionary scaling plots toward INCITE readiness [444]; first industrial JDA/framework agreement (Kemira shape [240])",
    "Chains 1, 2, 3, 4 primary; 5–6 secondary; 10 running",
    "ALCC ~Nov 2026 — funded applicants only [445][71]; Director's Discretionary benchmarking [444]; MAGNITO-class topicals [57]; Genesis follow-ons [25][183]",
    "end-2027 BEST completion [59]; 2027 SPARC first plasma [446]; 2028 Helion PPA [294]; 15FYP window closes 2030 [22]"
   ],
   [
    "3: years 5–10",
    "Rare-event hand-off: cascade→rate theory with calibrated UQ source terms (240 ps vs 5-yr service [15]); anharmonic MLIP collapsing the 93%-DFPT block [129]; correlation-capability build (Chain 9)",
    "Licensing-citable qualification package before DONES data; INCITE only at demonstrated ≥20%-of-machine readiness [444][447]; majority-survival autonomous-lab record [149][448]",
    "Chains 7, 8, 10; 9 and 11 as frontier options",
    "INCITE (up to 60% of Frontier/Aurora [70]); milestone/FIRE-class fusion R&D (>350M private; ~220M FIRE [298])",
    "~2034 IFMIF-DONES first fusion-spectrum data [286]; 2039 ITER DT operations [291]"
   ]
  ]
 },
 "skeptics": {
  "headers": [
   "Claim (as made)",
   "Venue / year",
   "Counter-evidence",
   "Resolution status as of 2026-07-17",
   "Lesson for this venture"
  ],
  "rows": [
   [
    "An autonomous laboratory \"realized 41 novel compounds from a set of 58 targets\" in 17 days [28]",
    "Nature 2023 (A-Lab)",
    "Automated Rietveld refinement and disorder-handling errors; \"no new materials have been discovered in that work\" (Leeman, Schoop, Palgrave et al.) [29]",
    "Author Correction of 19 January 2026 (Nature 650:E1) walks back the novelty claims — the corrected title drops \"novel\"; the robotics methodology stands [28][29]",
    "The weak link was automated characterization, not the AI: no compound leaves my lab claimed without an independent diffraction audit"
   ],
   [
    "2.2 million crystals, 381,000 \"newly discovered stable materials\" (GNoME)",
    "Nature 2023",
    "\"Scant evidence\" of compounds passing a novelty–credibility–utility trifecta (Cheetham & Seshadri) — their argument, widely reported as a single-digit-percent survival share [30]",
    "Contested: DeepMind \"stand[s] by all claims,\" citing 736 structures since synthesized in the literature [216]; no full-list third-party novelty audit exists",
    "Prediction volume is not discovery; the unit of account is one novel, credible, useful material"
   ],
   [
    "LK-99: room-temperature, ambient-pressure superconductivity",
    "arXiv + social media, 2023",
    "More than 15 failed replications; floating-zone single crystals are semiconducting; the resistivity drop traces to a Cu_2S impurity transition near 104 °C [143]",
    "Closed: artifact, not superconductivity — error, not fraud",
    "Replication velocity is now weeks; a cheap simulation-plus-characterization screen kills artifact claims before they consume attention"
   ],
   [
    "Room-temperature superconductivity, twice: CSH at 288 K (~155 GPa); N-doped lutetium hydride at 294 K near-ambient (Dias)",
    "Nature 2020; Nature 2023 [141]",
    "Failed replications; 8 of 11 co-authors requested retraction of the second paper; a university investigation found \"falsification, fabrication, and/or plagiarism of data, images, and text\" [114]",
    "Both papers retracted (2022; 2023); roughly five papers retracted in total, the senior author dismissed, a $17M startup with no reproducible result [114][142]",
    "Fabrication survives only where raw data is unauditable; my numbers ship with deposited data, not descriptions of data"
   ],
   [
    "\"AI-assisted researchers discover 44% more materials\" (+39% patent filings, +17% product innovation)",
    "MIT working paper (arXiv), 2024 [31]",
    "Fabricated: MIT declared \"no confidence in the provenance, reliability or validity of the data\"; the author departed [31]",
    "Disowned in May 2025 and to be \"withdrawn from public discourse\" — after citation by Nature, the Wall Street Journal, the US Congress, the ECB, and an EU Commissioner [31]",
    "Never quote a second-hand productivity statistic; every number in my pitch must be auditable to its source"
   ],
   [
    "Dozens of DFT-guided electrochemical N_2-reduction catalysts \"synthesize ammonia at ambient conditions\"",
    "Multiple journals, 2016–2019",
    "Contamination-driven false positives; a quantitative isotope protocol (Andersen et al.) exposed the class [234]",
    "Collapsed: the isotope protocol is now mandatory across the subfield; the earlier claims are disbelieved [234]",
    "A computed activity map is not an experiment; measurement protocols precede pipelines"
   ],
   [
    "ML classifiers can pick water-stable MOFs for capture duty (83%/71% test accuracy)",
    "Nat. Mach. Intell. 2020 (Batra); JACS 2024 (WS24) [339]",
    "Accuracy collapses under metal- and topology-grouped splits — an \"optimism gap\"; apparent cross-dataset transfer partly duplicate structures [341]; MOF-74's hydrolysis driving force exceeds ZIFs' by 200–250 kJ/mol per metal center (≈2.1–2.6 eV; 96.485 kJ/mol = 1 eV), so room-temperature persistence masquerades as stability [45]",
    "Open: classifiers demoted from prediction to triage; the field's flagship inventor says \"there's a lot of hype versus reality\"; one MOF (CALF-20) has reached industrial service [330]",
    "Predict survival in water, not uptake; own the thermodynamic stability labels before claiming the axis"
   ]
  ]
 },
 "nineNumbers": {
  "headers": [
   "Class",
   "Headline quantified error",
   "Corpus source",
   "Chain anchored"
  ],
  "rows": [
   [
    "Superconductors (Ch. 4)",
    "Harmonic electron–phonon \\lambda 2.64 vs 1.84 anharmonic on H_3S — ~43% high; no ab initio T_c exists for unconventional families",
    "dim01 [8][9]",
    "8"
   ],
   [
    "Correlated oxides & quantum (Ch. 5)",
    "Semilocal DFT returns NiO and CoO as metals; HSE and diffusion Monte Carlo split ~1 eV on ZnO's oxygen vacancy",
    "dim02 [10][11]",
    "9"
   ],
   [
    "High-entropy alloys & disorder (Ch. 6)",
    "Five architectures 4–5× the 2.5 meV/atom threshold on MS25's five-element alloy; one benchmark suite finds 617.9 meV/atom zero-shot",
    "dim03 [4][5]",
    "4"
   ],
   [
    "Batteries (Ch. 7)",
    "Migration-barrier MAE 0.310–0.349 eV across 574 DFT-NEB paths vs ~60 meV floor; 73–78% of barriers underestimated",
    "dim04 [1][2]",
    "1"
   ],
   [
    "Catalysts (Ch. 8)",
    "GGA adsorption mean errors 0.2–0.4 eV vs experiment; OC20 ML energy MAE plateaued ~0.2 eV for ~2 years",
    "dim05 [12][3]",
    "3"
   ],
   [
    "Magnets & REE-free (Ch. 9)",
    "Curie-temperature errors 15–35% with non-systematic sign (Fe_2B +35%, Co_2B ×1.5 low); micromagnetic coercivity ~5× high",
    "dim06 [13][14]",
    "2"
   ],
   [
    "Fusion & nuclear (Ch. 10)",
    "Best cascade MLIP spans 240 ps vs a five-year service life; RAFM validated ~20 of the 50 dpa required",
    "dim07 [15][6][7]",
    "7"
   ],
   [
    "Porous frameworks & 2D (Ch. 11)",
    "Semi-empirical van der Waals corrections 0.77–3.04× the RPA interlayer energy (one benchmark suite); cross-zeolite transfer inflates energy error ≥10×",
    "dim08 [16][4]",
    "5"
   ],
   [
    "WBG semiconductors · perovskites · thermoelectrics (Ch. 12)",
    "LDA gap underestimate ~50% across a 472-material benchmark; ~1 eV error cancellation inside Pb-halide perovskite gaps",
    "dim09 [17][18]",
    "6, 11"
   ]
  ]
 }
};
