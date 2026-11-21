CUSTOMS FISCAL INTELLIGENCE DASHBOARD
Working concept demonstration | November 2026

START HERE
Extract the ZIP and open index.html in a modern browser. Keep index.html,
styles.css, data.js and app.js together. No installation, build command,
CDN, API key, internet connection or third-party chart library is needed.

For GitHub hosting, put these four files at the root of the site published
by GitHub Pages. All asset URLs are relative, so repository subpaths work.
Do not upload actual confidential Customs data to a public repository.

FILES
index.html   Accessible page shell, filters, navigation and dialogs.
styles.css   Responsive desktop/mobile layout and print styles.
data.js      Deterministic synthetic data generator and normalized tables.
app.js       Data joins, measures, charts, all ten modules and interactions.

DESIGN AND IMPLEMENTATION
The concept note supplied by the user is the requirements reference, not
an instruction to approve policies, contact officials or publish findings.
The visual identity is an original demonstration, not official branding.

This GitHub-compatible edition performs its data processing in the browser.
It is a fully working static demo, not a deployed institutional backend.
GitHub Pages serves the files; secure production ingestion, database storage,
authentication and role enforcement require a separate backend service.

DEMO WALKTHROUGH
1. Executive overview: select year, month, port, HS chapter and tax component.
   More filters adds origin/destination, procedure, incentive, duty band,
   trader cohort and policy episode. Reset restores the 2026 national view.
2. Select a port/country/scheme bar to filter its population. Scroll the
   declaration table, search by product/HS/trader/ID, change sorting, use
   pagination and open a declaration for its component-level audit lineage.
3. Revenue drivers: see an exact matched-month bridge from prior receipts
   to current receipts, using value, combined rate/mix, relief and payment.
4. Tariff intelligence: compare benchmark and applied burdens by HS line.
5. Incentives: compare period relief with all-time approval utilisation.
6. Imports/exports: explore values, mass, markets and trader concentration.
7. Compliance: inspect flags, open bond exposure and overdue regimes.
8. Policy studio: inspect a descriptive machinery/electrical comparison.
9. Scenario studio: move the duty-change and relief sliders; switch to
   behavioural mode and adjust the assumed elasticity. Save/Load stores
   a deterministic snapshot recipe locally. Export JSON includes parameters,
   filters, results and the full normalized dataset for reproducibility.
10. Forecast: choose a 3/6/12-month horizon; inspect error and interval notes.
11. Quality: inspect computed linkage, reconciliation and session actions.
12. Simulate live: adds one October 2026 record every 8 seconds while the
    page is open; all applicable views recalculate. Pause stops additions.
    The data cut-off stays October 2026. A historical filter may hide newly
    generated records. Browser background timer throttling may delay ticks.
13. Export CSV exports matching table records (including search); Export
    brief creates a filtered decision-note draft. Forecast CSV, audit JSON
    and full normalized dataset exports are also available.

DATA AND ACCOUNTING MODEL
4,872 baseline declaration lines, 58 months from Jan 2022 to Oct 2026;
10 six-digit HS examples, six ports, six counterpart countries, 120 possible
pseudonymous traders, 36 synthetic approvals. Reproducible seed: 20261121.
These are illustrative values, not empirically calibrated proxy estimates.

Separate arrays preserve header, line, assessment, payment, approval,
tariff-rule and audit facts. Four tax components exist per line: ID, VAT,
Levy and EXC. The demo does not implement IAT, every fee or all CET lines.
Each receipt links to one assessment; each assessment links to one line.
The simplified generator has one line per declaration and one allocated
receipt per assessment. Production adapters must support one-to-many
receipt allocation, amendments, revisions and cancelled declarations.

benchmark = round(customs value * illustrative component rate)
relief = benchmark * synthetic relief share, rounded to NGN
assessment = benchmark - relief
net receipts = gross receipts - refunds - reversals
payment conversion = net receipts / assessments for the same cohort
effective burden = assessments / customs value
revenue forgone = identified benchmark - assessment

Tax components use independent customs-value bases. These are not validated
Nigerian legal rates or statutory tax waterfalls. Export taxes are zero in
this fixture. Export support and audit recoveries are separate diagnostic
measures; neither is silently added to net receipts.

Revenue bridge is an accounting identity. Rate and composition effects are
combined. Currency-conversion, quantity and enforcement attribution require
additional source fields; this demo does not claim separate causal effects.

SCENARIOS AND FORECASTS
Mechanical replay changes ID by percentage points, floors rates at zero,
and retains the selected fraction of existing relief on the new benchmark.
Behavioural mode scales value and mass by:
 [(1 + new total border burden) / (1 + old total border burden)] ^ elasticity
Elasticity is assumed; sensitivity uses elasticity +/- 0.3. It is not fitted
from real Customs observations. Receipt conversion is held at the historical
component ratio, with a 94% fallback for a zero baseline assessment.

Forecasts use a seasonal-naive model: repeat the same month of last year.
They use the entire 2022-2026 history under non-time filters, intentionally
ignoring the global year/month selection. At least 24 populated months are
required; missing monthly combinations in an eligible series are zero-filled.
The latest 12 months are evaluated against their prior-year counterparts.
WAPE = sum absolute error / sum actual receipts. MAE is the mean absolute
error. Illustrative 80% intervals use the 80th percentile of 12 holdout
absolute errors, expanded by sqrt(1 + horizon/12). They are not calibrated
confidence bounds or validated forecasts. No structural break model is used.

The policy studio uses Jan-Jun versus Jul-Oct monthly mean import values
for HS 84 and HS 85 in the selected year. It ignores the month selector
to preserve that event window. Other filters apply. Difference-in-differences
arithmetic is displayed descriptively, with no causal validation, fitted
standard errors, real legal episode or claim of a measured treatment effect.

MOVING TO REAL DATA
Preserve the normalized keys and replace the synthetic generator with a
reviewed ingestion adapter. Supply effective-dated legal tax rules, full
tax bases, HS concordances, approval eligibility, allocated payment events,
versioned declarations and independently signed source control totals.
Implement server-side authentication, least privilege, cohort suppression,
encryption, retention, immutable logs, protected exports and refresh approval.
Fit and back-test behavioural and historical-effect models only when the
underlying evidence supports identification. Replace descriptive diagnostics
with reviewed statistical methods; do not relabel synthetic output as facts.

Browser localStorage and the session log are convenience features, not
security controls. No passwords, authentication claims or private trader
information are embedded. Saved scenarios stay in the current browser origin;
clearing browser storage removes them. Downloaded JSON is the portable copy.

KNOWN SCOPE LIMITS
No GDP, domestic output, employment, consumer price, welfare or national
input-output multiplier estimates. No real live connection. No production
role-based access, database or confidential-data upload flow. The prototype
demonstrates all ten dashboard modules, but not every advanced analytical
method, every tax component or every field of the eventual production system.

CUSTOMIZATION
Change colors/layout in styles.css; titles/module content in app.js;
fixtures and tax assumptions in data.js; page metadata in index.html.
Retain synthetic-data labels until a governed real-data pipeline replaces it.

VERIFICATION
See TEST-REPORT.txt for automated and browser checks performed on this build.
