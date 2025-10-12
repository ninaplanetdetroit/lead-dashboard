const fs = require('fs');
const Papa = require('papaparse');

const csvFile = fs.readFileSync('All CWS_Matched CDSMI and LSLR and LALE.xlsx  Data.csv', 'utf8');
const parsed = Papa.parse(csvFile, { header: true, skipEmptyLines: true });

const jsData = parsed.data.map(row => ({
  pwsid: row['PWSID'] || '',
  name: row['Supply Name'] || '',
  population: parseInt(row['Population Served (2025)']) || 0,
  leadLines: parseInt(row['Lead in CDSMI']) || 0,
  gpcl: parseInt(row['GPCL in CDSMI']) || 0,
  unknown: parseInt(row['Unknown in CDSMI']) || 0,
  totalToReplace: parseInt(row['Total to be identified or replaced']) || 0,
  totalReplaced: parseInt(row['Grand Total of Lead Service Lines Replaced 2 21 2024']) || 0,
  percentReplaced: parseFloat(row['% Replaced to Date']) || 0,
  exceedance: (row['Most Recent Lead Action Level Exceedance'] || '').trim()
}));

const output = `export const waterSystemsData = ${JSON.stringify(jsData, null, 2)};\n\nexport default waterSystemsData;`;

fs.writeFileSync('src/data/waterSystemsData.js', output);
console.log('✅ Data converted! ' + jsData.length + ' systems exported.');