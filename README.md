# Michigan Lead Service Line Replacement Dashboard

An interactive data visualization tracking lead service line replacement progress across Michigan water systems (2021-2024).

## Live Demo

View the dashboard at: [https://ninaplanetdetroit.github.io/lead-dashboard](https://ninaplanetdetroit.github.io/lead-dashboard)

## Overview

This dashboard visualizes data from Michigan's Environmental Quality Department (EGLE) showing:
* 580,030 total lead service lines requiring replacement
* 69,891 lines replaced (12% progress) from 2021-2024
* 3.9 million Michigan residents served by systems with known lead lines
* Annual replacement trends showing 138% increase from 2021 to 2024

## Technology Stack

* **React** - UI framework
* **Recharts** - Data visualization library
* **CSS3** - Styling and animations
* **GitHub Pages** - Hosting
* **PapaParse** - CSV data processing

## Features

### Dashboard Overview
* Animated counter statistics
* Interactive line chart showing annual replacement trends
* Pie chart displaying service line composition by material
* Responsive design for mobile and desktop
* Real-time progress bar animation

### Search Systems
* Search by water system name or PWSID
* Filter systems with lead action level exceedances
* Filter systems with LCR exceedances since 2018 (Michigan's LCR revision year)
* Sort by name, lead lines, population, or progress
* Detailed system cards showing:
  - Population served
  - Known lead lines
  - Lines replaced
  - Galvanized (GPCL) lines
  - Unknown material lines
  - Compliance status (Compliant ≥20%, Not in compliance <20%)
  - Lead action level exceedances

### Rankings
* View systems by:
  - Most lead lines
  - Best replacement progress
  - Systems needing attention
  - Most unknown lines
* Interactive table with sortable columns
* Top 3 rankings highlighted
* Compliance status indicators (Green: ≥20%, Red: <20%)
* Warning badges for systems with lead action level exceedances

## Data Source & Methodology

### Source Data
Michigan EGLE Community Drinking Supply Monitoring Inventory (CDSMI) and Lead Service Line Replacement Reports

### Data Processing
**Replacement progress percentages are calculated by Planet Detroit** based on EGLE-reported data:

* **Total to Replace** = Lead lines + GPCL (Galvanized Previously Connected to Lead) + Unknown material lines
* **% Replaced** = (Lines Replaced / Total to Replace) × 100
* **Compliance Status**: 
  - Compliant: ≥20% replacement progress (meets regulatory requirement)
  - Not in compliance: <20% replacement progress

The dashboard uses raw data from EGLE's official reports, with replacement percentages calculated by Planet Detroit to provide a comprehensive view of statewide progress toward the goal of eliminating lead service lines.

## Installation & Development

### Prerequisites
* Node.js (v14 or higher)
* npm
* PapaParse (for CSV processing)

### Setup

```bash
# Clone the repository
git clone https://github.com/ninaplanetdetroit/lead-dashboard.git
cd lead-dashboard

# Install dependencies
npm install

# Run development server
npm start
```

The app will open at `http://localhost:3000`

### Data Updates

To update the dashboard with new EGLE data:

1. Replace `lead-data.csv` with updated CSV file
2. Run the conversion script:
   ```bash
   node scripts/convertCsv.js
   ```
3. Rebuild and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Embedding

To embed this dashboard on a website, use an iframe:

```html
<iframe 
  src="https://ninaplanetdetroit.github.io/lead-dashboard" 
  width="100%" 
  height="1600" 
  frameborder="0" 
  style="border: none;">
</iframe>
```

## Project Structure

```
michigan-lead-dashboard/
├── public/
├── scripts/
│   └── convertCsv.js       # CSV to JSON converter
├── src/
│   ├── components/
│   │   ├── Dashboard.js           # Main overview component
│   │   ├── WaterSystemDirectory.js # Search systems tab
│   │   ├── RankingTable.js        # Rankings tab
│   │   └── *.css                  # Component styles
│   ├── data/
│   │   └── waterSystemsData.js    # Processed data
│   ├── App.js                     # Main app component
│   ├── App.css                    # Global styles
│   └── index.js                   # React entry point
├── lead-data.csv                  # Source data from EGLE
├── package.json                   # Dependencies and scripts
└── README.md
```

## Key Insights from the Data

* **Scale of Challenge**: Over half a million service lines need replacement
* **Progress Acceleration**: Replacement rates more than doubled from 2021 to 2024
* **Population Impact**: 52.8% of Michigan's population served by systems with known lead
* **Unknown Materials**: 315,372 service lines still need material identification
* **Compliance Status**: Systems meeting the 20% replacement threshold are considered compliant
* **LCR Revision Impact**: Michigan revised its Lead and Copper Rule in 2018, establishing stricter requirements

## Data Fields Tracked

For each water system:
* **PWSID** - Public Water System ID
* **Supply Name** - Water system name
* **Population Served** - Residents served (2025 estimates)
* **Lead in CDSMI** - Known lead service lines
* **GPCL in CDSMI** - Galvanized Previously Connected to Lead lines
* **Unknown in CDSMI** - Lines with unknown material
* **Total to Replace** - Sum of lead + GPCL + unknown lines
* **Grand Total of Lead Service Lines Replaced** - Lines replaced (2021-2024)
* **% Replaced to Date** - Calculated replacement progress
* **Most Recent Lead Action Level Exceedance** - Year of most recent exceedance (if any)

## Regulatory Context

* **20% Compliance Threshold**: Michigan's regulatory framework establishes 20% replacement progress as a key benchmark
* **Lead and Copper Rule (LCR)**: Revised in 2018 to strengthen protections
* **Action Level Exceedances**: Systems that exceed the lead action level (15 ppb) face additional requirements

## Future Enhancements

* County-level filtering
* Interactive map view
* Downloadable data reports
* Historical trend projections
* Year-over-year comparison tools

## License

Data is public domain. Dashboard code available for reuse with attribution.

## Contact

Built by Planet Detroit for public information purposes.

For questions or data updates: [contact information]

## Acknowledgments

* Data provided by Michigan Department of Environment, Great Lakes, and Energy (EGLE)
* Replacement progress calculations and analysis by Planet Detroit
* Dashboard design and development by Planet Detroit

## Updates

* **November 2024**: Added system search and rankings functionality
* **November 2024**: Implemented compliance-based progress categories (≥20% / <20%)
* **November 2024**: Added LCR exceedance filtering (systems exceeding lead action level since 2018)
* **November 2024**: Enhanced data processing to use calculated replacement percentages
