// GENERATED from hardmaterials_sec23.md.
export interface GlossaryTerm { term: string; definition: string }
export interface GlossaryGroup { group: string; terms: GlossaryTerm[] }
export interface GlossaryData { groups: GlossaryGroup[]; conversionBox: { title: string; text: string } | null }

export const glossaryData: GlossaryData = {
 "groups": [
  {
   "group": "Methods and simulation terms",
   "terms": [
    {
     "term": "DFT",
     "definition": "Density functional theory: the first-principles electronic-structure method labeling nearly all MLIP training data; its exchange–correlation functional sets the systematic error floor."
    },
    {
     "term": "MLIP / uMLIP",
     "definition": "Machine-learned interatomic potential: a regression of DFT energies and forces evaluated at near-classical cost; \"universal\" (uMLIP) means pretrained across the periodic table."
    },
    {
     "term": "NEB",
     "definition": "Nudged elastic band: a chain-of-images method finding the minimum-energy path between two states; the saddle point is the migration barrier."
    },
    {
     "term": "PES",
     "definition": "Potential-energy surface: energy as a function of all atomic coordinates — forces are its gradients, barriers its saddles."
    },
    {
     "term": "DMFT",
     "definition": "Dynamical mean-field theory: maps a correlated lattice onto a self-consistent impurity problem; the tractable route beyond plain DFT for strong correlation."
    },
    {
     "term": "GW / BSE",
     "definition": "Many-body perturbation methods: GW gives quasiparticle band structures; the Bethe–Salpeter equation adds excitons and optical spectra."
    },
    {
     "term": "QSGW",
     "definition": "Quasiparticle self-consistent GW: GW iterated until input and output band structures agree; accurate but overestimates gaps ~15% in the cases cited here."
    },
    {
     "term": "SSCHA",
     "definition": "Stochastic self-consistent harmonic approximation: variational finite-temperature phonons with anharmonic and quantum renormalization; standard for hydride superconductors."
    },
    {
     "term": "RPA",
     "definition": "Random-phase approximation: the best tractable many-body treatment of nonlocal correlation; reference here for adsorption and van der Waals interlayer energies."
    },
    {
     "term": "SOC",
     "definition": "Spin–orbit coupling: relativistic interaction of electron spin and orbital motion; removes ~1 eV from lead-halide gaps and underpins magnetic anisotropy."
    },
    {
     "term": "SQS",
     "definition": "Special quasirandom structure: a small ordered cell mimicking a random alloy's correlation functions, making disorder DFT-tractable."
    },
    {
     "term": "SRO",
     "definition": "Short-range order: deviation of neighbor-species preferences from random in an alloy; what SQS cells approximate away."
    },
    {
     "term": "EAM",
     "definition": "Embedded-atom method: a classical metal potential with a density-dependent embedding term; MS25's five MLIP architectures failed to learn one across a five-element space."
    },
    {
     "term": "MoE",
     "definition": "Mixture-of-experts: routes each input to a few specialist subnetworks, growing capacity without proportional compute."
    },
    {
     "term": "Δ-learning",
     "definition": "Training on the difference between cheap and expensive reference methods, so few high-fidelity labels upgrade many low-fidelity ones."
    },
    {
     "term": "UQ",
     "definition": "Uncertainty quantification: calibrated error bars on simulation outputs; this report's audit layer on every screening claim."
    },
    {
     "term": "MD",
     "definition": "Molecular dynamics: numerical time integration of atomic motion on a PES; reaches picoseconds to nanoseconds against service lives of years."
    },
    {
     "term": "operando",
     "definition": "Measured on a working device under service conditions — a cell while it cycles — rather than before or after."
    },
    {
     "term": "CALPHAD",
     "definition": "Calculation of phase diagrams: fitted thermodynamic databases predicting multicomponent phase equilibria; the incumbent alloy-design method."
    },
    {
     "term": "ZBL",
     "definition": "Ziegler–Biersack–Littmark: the universal screened repulsive potential for close atomic encounters, stitched into cascade MLIPs to keep collisions physical."
    },
    {
     "term": "dpa",
     "definition": "Displacements per atom: the radiation-damage dose unit; DEMO blankets target ~50 dpa against a validated database ending near 20."
    },
    {
     "term": "κSRME",
     "definition": "Symmetric relative mean error of lattice thermal conductivity $\\kappa$: a dimensionless phonon-benchmark metric, zero being perfect, symmetric in over- and underprediction."
    },
    {
     "term": "MAE",
     "definition": "Mean absolute error — the unmarked meaning throughout this report. Magnetocrystalline anisotropy energy, which shares the acronym, is always spelled out in body text (see $K_1$)."
    },
    {
     "term": "LOCO CV; random CV",
     "definition": "Leave-one-cluster-out cross-validation holds out entire materials families — the honest novelty test; random splits leak near-duplicates between train and test and flatter skill."
    },
    {
     "term": "Scoreboard *(this report)*",
     "definition": "Table 3.2: ten failure modes, each with a verified current state, a demonstrated fix, a \"solved\" target, and my readiness rating (H/M/L)."
    },
    {
     "term": "Correction stack *(this report)*",
     "definition": "Chapter 3's layered fixes — non-equilibrium data, fidelity escalation, micro-dose fine-tuning, uncertainty wrapping — taken as one program."
    },
    {
     "term": "Error floor *(this report)*",
     "definition": "The reference DFT method's systematic error, inherited and asymptoted at by MLIPs; broken by fidelity escalation, not bigger models."
    },
    {
     "term": "PES softening *(this report)*",
     "definition": "Equilibrium-trained MLIPs' documented underprediction of PES curvature — forces, phonon frequencies, and barriers come out soft."
    },
    {
     "term": "Identify axis *(this report)*",
     "definition": "Makeability — stability, synthesizability, persistence — the under-priced counterpart to performance screening (Chapter 14)."
    },
    {
     "term": "Discovery chain *(this report)*",
     "definition": "The report's value grammar: method fix → validated material → device → outcome, one sentence per chain (Chapters 13–15)."
    },
    {
     "term": "Wedge *(this report)*",
     "definition": "The narrow, defensible entry point a small lab attacks first; here, validation-first fidelity escalation on classes where experiment is scarce or slow."
    }
   ]
  },
  {
   "group": "Materials and physics terms",
   "terms": [
    {
     "term": "REBCO",
     "definition": "Rare-earth barium copper oxide (REBa$_2$Cu$_3$O$_{7-\\delta}$): coated-conductor tape carrying supercurrent above 20 T; the magnet material of compact fusion."
    },
    {
     "term": "RAFM",
     "definition": "Reduced-activation ferritic/martensitic steel (EUROFER, CLAM): the fusion structural-alloy family optimized for low long-lived activation."
    },
    {
     "term": "HEA",
     "definition": "High-entropy alloy: a near-equimolar multicomponent metal; the composition space where MLIP training coverage breaks first."
    },
    {
     "term": "SSE",
     "definition": "Solid-state electrolyte: a ceramic or glass ion conductor replacing the liquid electrolyte; Chapter 7's barrier-error test bed."
    },
    {
     "term": "SAC",
     "definition": "Single-atom catalyst: isolated metal atoms anchored on a support, with activity hypersensitive to the simulated adsorption site."
    },
    {
     "term": "MOF / COF",
     "definition": "Metal–organic / covalent organic framework: crystalline porous solids of metal nodes or covalent building blocks plus organic linkers."
    },
    {
     "term": "MXene",
     "definition": "Two-dimensional transition-metal carbide/nitride (Ti$_3$C$_2$T$_x$ class) from etched MAX phases; conductive, hydrophilic, oxidation-prone."
    },
    {
     "term": "WBG",
     "definition": "Wide-bandgap semiconductor — SiC, GaN, Ga$_2$O$_3$, diamond — for high-power, high-temperature electronics."
    },
    {
     "term": "Tandem PV",
     "definition": "Stacked photovoltaic absorbers with complementary band gaps (perovskite-on-silicon) exceeding the single-junction efficiency limit."
    },
    {
     "term": "DFPT",
     "definition": "Density-functional perturbation theory: linear-response DFT for phonons and electron–phonon coupling; 93% of compute in the JARVIS hydride workflow cited here."
    },
    {
     "term": "EPC",
     "definition": "Electron–phonon coupling: the electron–lattice interaction pairing electrons in conventional superconductors; quantified by $\\lambda$."
    },
    {
     "term": "Brown's paradox",
     "definition": "Realized coercivity runs at 15–30% of the anisotropy field because defects nucleate reversal; ranking $K_1$ alone cannot predict it."
    },
    {
     "term": "$H_{c2}$",
     "definition": "Upper critical field: the field that destroys superconductivity; sets the operating ceiling of superconducting magnets."
    },
    {
     "term": "$J$ (exchange)",
     "definition": "Heisenberg exchange coupling between neighbor spins; mean-field errors in $J$ drive the 15–35% $T_c$ errors of Chapter 9."
    },
    {
     "term": "$K_1$",
     "definition": "First magnetocrystalline anisotropy constant (MJ/m³): the energy cost of rotating magnetization off the easy axis; spelled out to avoid the MAE collision."
    },
    {
     "term": "$T_c$",
     "definition": "Critical temperature — the superconducting transition or the magnetic Curie point, by context."
    },
    {
     "term": "$\\omega_{\\log}$",
     "definition": "Logarithmic average phonon frequency in the Allen–Dynes $T_c$ formula; inherits MLIP phonon softening directly."
    },
    {
     "term": "$\\lambda$ (electron–phonon)",
     "definition": "Dimensionless electron–phonon coupling strength in Allen–Dynes; $\\lambda \\gtrsim 1$ marks strong-coupling superconductors."
    },
    {
     "term": "CCD",
     "definition": "Critical current density: the current at which a solid-state cell shorts by dendrite penetration; LLZO-class cells fail near 0.1 mA/cm²."
    },
    {
     "term": "HALEU",
     "definition": "High-assay low-enriched uranium (5–20% $^{235}$U): the fuel form most advanced fission designs require and supply chains currently gate."
    },
    {
     "term": "IFMIF-DONES",
     "definition": "International Fusion Materials Irradiation Facility–DEMO Oriented Neutron Source (Granada): the first 14 MeV high-flux materials test source, fully operational around 2034."
    }
   ]
  },
  {
   "group": "Programs, instruments, and organizations",
   "terms": [
    {
     "term": "15FYP",
     "definition": "China's 15th Five-Year Plan (2026–2030): the planning document naming this report's materials classes as growth industries."
    },
    {
     "term": "NSFC",
     "definition": "National Natural Science Foundation of China: the country's principal basic-research grant agency."
    },
    {
     "term": "RFIS",
     "definition": "NSFC Research Fund for International Scientists: tiered grants for foreign PIs at PRC institutions."
    },
    {
     "term": "CIT (15% zones)",
     "definition": "Corporate income tax cut from the standard 25% to 15% in designated zones (Hainan, Hetao); dated windows tracked in Chapter 16."
    },
    {
     "term": "CNMGE",
     "definition": "China's national Materials Genome Engineering platform at NSCC-Tianjin: shared materials data and compute open to external users."
    },
    {
     "term": "USGS",
     "definition": "US Geological Survey: issuer of the 60-mineral critical list anchoring US priorities in this report."
    },
    {
     "term": "CMEI",
     "definition": "DOE Office of Critical Minerals and Energy Innovation (2025–): holder of the critical-minerals, materials, and manufacturing portfolio."
    },
    {
     "term": "FOA / NOFO",
     "definition": "Funding Opportunity Announcement / Notice of Funding Opportunity: the standard US federal grant solicitation instruments."
    },
    {
     "term": "SBIR / STTR",
     "definition": "Small Business Innovation Research / Small Business Technology Transfer: set-aside R&D awards to US small businesses, run in phases."
    },
    {
     "term": "P.L. 119-83",
     "definition": "Small Business Innovation and Economic Security Act (signed 2026-04-13): reauthorizes SBIR/STTR through 2031-09-30."
    },
    {
     "term": "ARPA-E",
     "definition": "Advanced Research Projects Agency–Energy: DOE's high-risk, program-managed energy funder."
    },
    {
     "term": "MAGNITO",
     "definition": "ARPA-E program (Magnetic Acceleration Generating New Innovations and Tactical Outcomes): AI-guided rare-earth-free magnets; \\$20M NOFO issued August 2025."
    },
    {
     "term": "ULTIMATE",
     "definition": "ARPA-E program (Ultrahigh Temperature Impervious Materials Advancing Turbine Efficiency): materials for >1,300 °C turbine service."
    },
    {
     "term": "Genesis Mission (EO 14363)",
     "definition": "The 2025 US executive-order mission building a national AI-for-science platform across the 17 DOE national laboratories."
    },
    {
     "term": "INCITE",
     "definition": "Innovative and Novel Computational Impact on Theory and Experiment: DOE's peer-reviewed leadership-computing allocation program."
    },
    {
     "term": "ALCC",
     "definition": "ASCR Leadership Computing Challenge: a smaller, faster allocation route at DOE's leadership-computing facilities."
    },
    {
     "term": "ERCAP",
     "definition": "Energy Research Computing Allocations Process: the annual application cycle for NERSC time."
    },
    {
     "term": "NSF ACCESS",
     "definition": "NSF's cyberinfrastructure coordination program allocating national supercomputing and expert support."
    },
    {
     "term": "EuroHPC JU / AI Factories",
     "definition": "The EU supercomputing joint undertaking; its AI Factory sites run startup and SME access calls."
    },
    {
     "term": "NAIRR",
     "definition": "National Artificial Intelligence Research Resource pilot: shared US AI compute and data; startups qualify holding any federal grant."
    },
    {
     "term": "X-Labs",
     "definition": "NSF program (2025–) funding independent research organizations directly — the newest door for a non-university laboratory."
    },
    {
     "term": "CRADA",
     "definition": "Cooperative Research and Development Agreement: the standard contract for collaboration with a US federal laboratory."
    },
    {
     "term": "JDA",
     "definition": "Joint development agreement: a private co-development contract; this report's industry deal form alongside CRADAs."
    },
    {
     "term": "LEEP",
     "definition": "Lab-Embedded Entrepreneurship Program: two-year seats for founders inside Argonne, Oak Ridge, Lawrence Berkeley, or NREL."
    },
    {
     "term": "TMS / MRS / APS / ASM",
     "definition": "The Minerals, Metals & Materials Society; Materials Research Society; American Physical Society; ASM International — the field's professional societies and meeting venues."
    },
    {
     "term": "OpenKIM",
     "definition": "Open Knowledgebase of Interatomic Models: an archive of citable interatomic potentials with automated verification checks."
    },
    {
     "term": "Matbench Discovery",
     "definition": "Public benchmark scoring MLIPs on stable-material discovery as a classification task; the state of the art stands at F1 0.931 as of 2026-07-17, and the leader varies by track (compliant, MPtrj-only training, vs full)."
    },
    {
     "term": "MS25",
     "definition": "Materials-science-focused benchmark dataset for MLIPs (Maxson et al., JCIM 2025): observable-first tests spanning HEAs, reaction barriers, and cascades."
    },
    {
     "term": "OC20 / OC22",
     "definition": "Open Catalyst 2020/2022: DFT adsorption-relaxation corpora for catalysis ML; OC20's two-year accuracy plateau is a flagship error floor here."
    },
    {
     "term": "OMat24",
     "definition": "Open Materials 2024 (Meta): >110 million deliberately non-equilibrium DFT structures; the pretraining lever behind scoreboard Row 1."
    },
    {
     "term": "BEST",
     "definition": "Burning Plasma Experimental Superconducting Tokamak (Hefei): in assembly since May 2025, with completion targeted end-2027."
    },
    {
     "term": "ITER",
     "definition": "The international tokamak at Cadarache: deuterium–tritium operations re-baselined to 2039 under Baseline 2024."
    },
    {
     "term": "CFEDR",
     "definition": "China Fusion Engineering Demonstration Reactor (renamed from CFETR, June 2025): the first device targeting fusion-spectrum fluence."
    },
    {
     "term": "NQI",
     "definition": "National Quantum Initiative: the US coordinated quantum-information program, reauthorized at ~\\$2.7B for FY2025–29."
    },
    {
     "term": "NEA (China)",
     "definition": "National Energy Administration: issuer of China's energy deployment statistics and storage targets cited in Chapter 16."
    },
    {
     "term": "CNESA",
     "definition": "China Energy Storage Alliance: the industry body whose white papers carry the storage projections used in this report."
    },
    {
     "term": "CAS IOP",
     "definition": "Institute of Physics, Chinese Academy of Sciences (Beijing): the condensed-matter laboratory recurring across the superconductor and magnet chapters."
    }
   ]
  }
 ],
 "conversionBox": {
  "title": "Units and conversions used in this report.",
  "text": "> $1\\ \\mathrm{eV} = 96.485$ kJ/mol $= 23.06$ kcal/mol per particle; source units are converted parenthetically at first use.\n> 0.06 eV $\\approx$ 1 kcal/mol $\\approx$ 5.8 kJ/mol — a 60 meV barrier error is a ~10$\\times$ rate error at 300 K.\n> 200–250 kJ/mol $\\approx$ 2.1–2.6 eV (the MOF-74 hydrolysis driving force of Chapter 3).\n> 1 meV/atom $\\approx$ 11.6 K per particle ($k_B = 8.617\\times10^{-2}$ meV/K).\n\nA note on conventions. Unmarked MAE always means mean absolute error, in eV unless a cell says otherwise; magnetocrystalline anisotropy energy is spelled out at every use and quantified through $K_1$ in MJ/m³. MAEs are unsigned averages, not symmetric bounds — the 574-path barrier benchmark behind several entries carries a systematic underestimate sign for two of five models — so the methods entries name error direction wherever the body established one. The barrier-underestimate rates follow a first-citation rule: the precise measured pair, 73.1% (CHGNet) and 78.2% (M3GNet), is quoted at each chapter's first use and \"73–78%\" is shorthand thereafter. Program entries are stated as of 2026-07-17 and deliberately carry no citations; every figure quoted here is cited where it is argued in the body. Terms not listed are standard usage."
 }
};
