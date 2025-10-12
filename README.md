# Michigan Lead Service Line Replacement Dashboard

An interactive data visualization tracking lead service line replacement progress across Michigan water systems (2021-2024).

## Live Demo

View the dashboard at: [https://ninaplanetdetroit.github.io/lead-dashboard](https://ninaplanetdetroit.github.io/lead-dashboard)

## Overview

This dashboard visualizes data from Michigan's Environmental Quality Department (EGLE) showing:
- 580,030 total lead service lines requiring replacement
- 69,891 lines replaced (12% progress) from 2021-2024
- 3.9 million Michigan residents served by systems with known lead lines
- Annual replacement trends showing 138% increase from 2021 to 2024

## Technology Stack

- **React** - UI framework
- **Recharts** - Data visualization library
- **CSS3** - Styling and animations
- **GitHub Pages** - Hosting

## Features

- Animated counter statistics
- Interactive line chart showing annual replacement trends
- Pie chart displaying service line composition by material
- Responsive design for mobile and desktop
- Real-time progress bar animation

## Data Source

Michigan EGLE Community Drinking Supply Monitoring Inventory (CDSMI) and Lead Service Line Replacement Reports

## Installation & Development

### Prerequisites
- Node.js (v14 or higher)
- npm

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
├── src/
│   ├── App.js          # Main dashboard component
│   ├── App.css         # Dashboard styles
│   └── index.js        # React entry point
├── package.json        # Dependencies and scripts
└── README.md
```

## Key Insights from the Data

- **Scale of Challenge**: Over half a million service lines need replacement
- **Progress Acceleration**: Replacement rates more than doubled from 2021 to 2024
- **Population Impact**: 52.8% of Michigan's population served by systems with known lead
- **Unknown Materials**: 315,372 service lines still need material identification

## Future Enhancements

- Search functionality for specific water systems
- County-level filtering
- Interactive map view
- Downloadable data reports
- Historical trend projections

## License

Data is public domain. Dashboard code available for reuse with attribution.

## Contact

Built by Planet Detroit for public information purposes.

## Acknowledgments

Data provided by Michigan Department of Environment, Great Lakes, and Energy (EGLE)
