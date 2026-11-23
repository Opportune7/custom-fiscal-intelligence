CUSTOMS FISCAL INTELLIGENCE — VERSION 3.1
Updated 23 November 2026

DEPLOYMENT
Upload index.html, styles.css, data.js and app.js together into your GitHub Pages publishing folder. Keep the names unchanged. No build step or external chart libraries are required. Enable Pages for the chosen branch/folder. Hard-refresh after deployment to clear old browser assets.
Alternatively open the standalone HTML locally. The standalone contains the same CSS and JavaScript.

WHAT CHANGED
Revenue drivers: removed previous-year collections as a headline KPI. Three cards show current collections, change and growth. A donut shows the revenue mix with amount/percentage legend. The detailed table includes component tax bases, current/prior amounts, share of total, own growth and contribution to net change.
Policy simulation studio: merges policy effects and forecasts. Edit VAT, duty, eligible import excise, concessions, products, charge profile, response assumptions, start month and rollout. Graphs and KPIs recalculate immediately. Select View policy case to review a designed future outlook with assumptions, fiscal results and graphs, then download the text brief. Monthly CSV remains available. Save/load and reproducible JSON controls have been removed.
Revenue risks & actions: overdue unpaid bills, audit balances, recovery rate and prioritised follow-up queue. Explains purpose, questions and suggested owners. Overlapping audit and unpaid amounts must not be added as a total loss.
Policymaker guide: workflow, examples, searchable terminology, formulas, chart interpretation, charge bases and source context. Every active KPI opens an explanation and supporting records.

SIMULATION METHOD
Unchanged policy is the default. Future months repeat the corresponding prior-year declaration basket and eligible separate receipts. No growth assumption. At least 24 populated historical months are required. The selected period sets the cutoff; source data do not extend beyond it. Horizon is 3, 6 or 12 months.
Mechanical mode holds imports fixed. Behavioural mode applies an assumed elasticity to the change in total border-charge-inclusive value. The sensitivity range varies elasticity by +/-0.3; it is not a statistical confidence interval. Historical component collection ratios are retained (94% fallback for a zero baseline bill). Rollout is the share of targeted imports covered, not gradual legal rates. Domestic accounting receipts are held unchanged.
Cash forgone = max(0, unchanged-policy projected cash minus proposed-policy projected cash). Concession cost is the separately modelled reduction in bills from relief. Unpaid bills are another measure. These quantities are not interchangeable.

LIMITS AND NEXT DATA PRIORITIES
All records, policy effects and forecasts are illustrative. No live Customs connection, current-law certification or estimates of prices, GDP, employment, VAT credits or welfare. The 4% FOB option is hypothetical and replaces CISS in this demo. Verify effective-dated instruments before real deployment.
Next production priorities: approved monthly revenue targets, reconciled payment records, product-specific legal rules and exemptions, validated import response assumptions, and a secure authenticated backend. GitHub Pages is appropriate for the synthetic demo only.
