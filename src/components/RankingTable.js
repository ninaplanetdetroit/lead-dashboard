import React, { useState, useMemo } from 'react';
import './RankingTable.css';
import waterSystemsData from '../data/waterSystemsData';

// Sample data - replace with your actual data
const sampleData = [
  { name: 'DETROIT CITY OF', population: 639111, leadLines: 80595, totalReplaced: 8656, percentReplaced: 10.7, exceedance: '' },
  { name: 'GRAND RAPIDS', population: 198893, leadLines: 19430, totalReplaced: 5383, percentReplaced: 27.7, exceedance: '' },
  { name: 'JACKSON', population: 31309, leadLines: 7840, totalReplaced: 695, percentReplaced: 8.9, exceedance: '2023' },
  { name: 'MUSKEGON', population: 37213, leadLines: 7631, totalReplaced: 1147, percentReplaced: 15.0, exceedance: '' },
  { name: 'DEARBORN', population: 109976, leadLines: 7306, totalReplaced: 798, percentReplaced: 10.9, exceedance: '' },
  { name: 'SAGINAW, CITY OF', population: 44202, leadLines: 6317, totalReplaced: 3540, percentReplaced: 56.0, exceedance: '' },
  { name: 'KALAMAZOO', population: 73598, leadLines: 4328, totalReplaced: 2770, percentReplaced: 64.0, exceedance: '' },
  { name: 'MUSKEGON HEIGHTS', population: 10730, leadLines: 3940, totalReplaced: 670, percentReplaced: 17.0, exceedance: '' },
  { name: 'BATTLE CREEK   VERONA SYSTEM', population: 51084, leadLines: 3614, totalReplaced: 324, percentReplaced: 9.0, exceedance: '' },
  { name: 'ESCANABA', population: 12180, leadLines: 3572, totalReplaced: 1107, percentReplaced: 31.0, exceedance: '' },
];

function RankingTable({ data = waterSystemsData }) {
  const [sortField, setSortField] = useState('leadLines');
  const [sortDirection, setSortDirection] = useState('desc');
  const [viewMode, setViewMode] = useState('most-lead'); // most-lead, best-progress, worst-progress

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      // Default sort directions
      if (field === 'percentReplaced') {
        setSortDirection('desc');
      } else {
        setSortDirection('desc');
      }
    }
  };

  const sortedData = useMemo(() => {
    let filtered = [...data].filter(d => d.leadLines > 0);
    
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return filtered;
  }, [data, sortField, sortDirection]);

  const getProgressClass = (percent) => {
    if (percent >= 50) return 'good';
    if (percent >= 25) return 'fair';
    if (percent >= 10) return 'poor';
    return 'critical';
  };

  const getRank = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  return (
    <div className="ranking-container">
      <div className="ranking-header">
        <h2>System Rankings</h2>
        <p>Compare lead service line replacement progress across Michigan water systems</p>
      </div>

      <div className="view-controls">
        <button 
          className={`view-btn ${viewMode === 'most-lead' ? 'active' : ''}`}
          onClick={() => {
            setViewMode('most-lead');
            setSortField('leadLines');
            setSortDirection('desc');
          }}
        >
          Most Lead Lines
        </button>
        <button 
          className={`view-btn ${viewMode === 'best-progress' ? 'active' : ''}`}
          onClick={() => {
            setViewMode('best-progress');
            setSortField('percentReplaced');
            setSortDirection('desc');
          }}
        >
          Best Progress
        </button>
        <button 
          className={`view-btn ${viewMode === 'worst-progress' ? 'active' : ''}`}
          onClick={() => {
            setViewMode('worst-progress');
            setSortField('percentReplaced');
            setSortDirection('asc');
          }}
        >
          Needs Attention
        </button>
      </div>

      <div className="table-container">
        <table className="ranking-table">
          <thead>
            <tr>
              <th className="rank-col">Rank</th>
              <th 
                className="sortable" 
                onClick={() => handleSort('name')}
              >
                Water System
                {sortField === 'name' && (
                  <span className="sort-indicator">{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="sortable number-col" 
                onClick={() => handleSort('population')}
              >
                Population
                {sortField === 'population' && (
                  <span className="sort-indicator">{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="sortable number-col" 
                onClick={() => handleSort('leadLines')}
              >
                Lead Lines
                {sortField === 'leadLines' && (
                  <span className="sort-indicator">{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="sortable number-col" 
                onClick={() => handleSort('totalReplaced')}
              >
                Replaced
                {sortField === 'totalReplaced' && (
                  <span className="sort-indicator">{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th 
                className="sortable number-col" 
                onClick={() => handleSort('percentReplaced')}
              >
                Progress
                {sortField === 'percentReplaced' && (
                  <span className="sort-indicator">{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
              <th className="number-col">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((system, index) => (
              <tr key={index} className={index < 3 ? 'top-three' : ''}>
                <td className="rank-col">
                  <span className="rank-badge">{getRank(index)}</span>
                </td>
                <td className="system-name">
                  {system.name}
                  {system.exceedance && (
                    <span className="exceedance-tag" title={`Exceeded in ${system.exceedance}`}>
                      ⚠️
                    </span>
                  )}
                </td>
                <td className="number-col">{system.population.toLocaleString()}</td>
                <td className="number-col lead-count">{system.leadLines.toLocaleString()}</td>
                <td className="number-col">{system.totalReplaced.toLocaleString()}</td>
                <td className="number-col">
                  <div className="progress-cell">
                    <span className={`progress-badge ${getProgressClass(system.percentReplaced)}`}>
                      {system.percentReplaced.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="number-col">
                  <div className="status-indicator-wrapper">
                    <div className={`status-indicator ${getProgressClass(system.percentReplaced)}`}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-legend">
        <div className="legend-title">Progress Status:</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="status-indicator good"></div>
            <span>Good (≥50%)</span>
          </div>
          <div className="legend-item">
            <div className="status-indicator fair"></div>
            <span>Fair (25-49%)</span>
          </div>
          <div className="legend-item">
            <div className="status-indicator poor"></div>
            <span>Poor (10-24%)</span>
          </div>
          <div className="legend-item">
            <div className="status-indicator critical"></div>
            <span>Critical (&lt;10%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingTable;