import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import waterSystemsData from '../data/waterSystemsData';
import './LeadLineMap.css';

// Status configuration with colors and descriptions
const STATUS_CONFIG = {
  'No lead lines': {
    color: '#3b82f6',      // Blue
    description: 'Inventory completed, no lead lines identified'
  },
  'Not compliant': {
    color: '#dc2626',      // Red
    description: '<20% average replacement, 2021–2024'
  },
  'Compliant': {
    color: '#4ade80',      // Light green
    description: '≥20% average replacement, 2021–2024'
  },
  'Inventory not received or incomplete': {
    color: '#9333ea',      // Purple
    description: 'No complete inventory filed'
  },
  '100% replaced': {
    color: '#047857',      // Dark emerald
    description: 'All lead lines replaced'
  },
  'Unknown': {
    color: '#9ca3af',      // Light gray
    description: 'Status unknown'
  }
};

function LeadLineMap() {
  // Filter states for each status category
  const [filters, setFilters] = useState({
    'Inventory not received or incomplete': true,
    'No lead lines': true,
    'Compliant': true,
    '100% replaced': true,
    'Not compliant': true
  });

  // Filter systems with coordinates (excluding wholesale-only systems)
  const systemsWithCoords = waterSystemsData.filter(
    system => system.latitude && system.longitude && 
              system.status !== 'No service lines; wholesale only'
  );

  // Count systems by status
  const statusCounts = {};
  systemsWithCoords.forEach(system => {
    const status = system.status || 'Unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  // Filter systems based on selected statuses
  const filteredSystems = systemsWithCoords.filter(system => {
    const status = system.status || 'Unknown';
    return filters[status] !== false;
  });

  // Get marker color based on status
  const getMarkerColor = (system) => {
    const status = system.status || 'Unknown';
    return STATUS_CONFIG[status]?.color || STATUS_CONFIG['Unknown'].color;
  };

  // Calculate marker radius based on total lines to replace
  const getMarkerRadius = (system) => {
    // For non-filers, use a fixed size
    if (system.status === 'Inventory not received or incomplete') {
      return 6;
    }
    // For systems with no lead lines, use small fixed size
    if (system.totalToReplace === 0) return 5;
    // Scale radius: sqrt for better visual proportion
    const baseRadius = Math.sqrt(system.totalToReplace) / 5;
    return Math.max(baseRadius, 4); // Minimum 4px radius
  };

  // Toggle filter for a status
  const toggleFilter = (status) => {
    setFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  // Check if this is the City of Flint
  const isFlint = (system) => {
    const nameUpper = system.name.toUpperCase();
    return nameUpper.includes('FLINT, CITY OF') || 
           nameUpper.includes('CITY OF FLINT') ||
           nameUpper === 'FLINT' ||
           system.pwsid === 'MI0002520';
  };

  // Order of statuses for display (most concerning first)
  const statusOrder = [
    'Inventory not received or incomplete',
    'Not compliant',
    'Compliant',
    '100% replaced',
    'No lead lines'
  ];

  return (
    <div className="map-container">
      <h2>Geographic Distribution of Lead Service Line Replacement Compliance in Michigan</h2>
      <p className="map-subtitle">
        Showing {filteredSystems.length.toLocaleString()} of {systemsWithCoords.length.toLocaleString()} water systems with location data
      </p>

      {/* Filter Controls */}
      <div className="map-controls">
        <p className="filter-instructions">Click to show or hide status categories:</p>
        {statusOrder.map(status => (
          <label key={status}>
            <input
              type="checkbox"
              checked={filters[status]}
              onChange={() => toggleFilter(status)}
            />
            <span 
              className="status-label"
              style={{ color: STATUS_CONFIG[status].color }}
            >
              ● {status} ({statusCounts[status] || 0})
            </span>
          </label>
        ))}
      </div>

      {/* Map */}
      <MapContainer
        center={[44.3148, -85.6024]} // Center of Michigan
        zoom={7}
        style={{ height: '600px', width: '100%' }}
        scrollWheelZoom={true}
      >
        {/* Base map tiles from OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Water system markers */}
        {filteredSystems.map((system) => (
          <CircleMarker
            key={system.pwsid}
            center={[system.latitude, system.longitude]}
            radius={getMarkerRadius(system)}
            fillColor={getMarkerColor(system)}
            fillOpacity={0.6}
            color="#ffffff"
            weight={2}
          >
            <Popup>
              <div className="map-popup">
                <h3>{system.name}</h3>
                <div className="popup-stats">
                  <p><strong>PWSID:</strong> {system.pwsid}</p>
                  <p><strong>Population:</strong> {system.population.toLocaleString()}</p>
                  
                  {/* Flint special note */}
                  {isFlint(system) && (
                    <p className="status-info flint-popup-note">
                      <strong>ℹ️ Note:</strong> Data do not include lead or galvanized service lines replaced between 2015 and 2021.
                    </p>
                  )}
                  
                  {system.status !== 'Inventory not received or incomplete' && (
                    <>
                      <p><strong>Known Lead Lines:</strong> {system.leadLines.toLocaleString()}</p>
                      <p><strong>GPCL:</strong> {system.gpcl.toLocaleString()}</p>
                      <p><strong>Total to Replace:</strong> {system.totalToReplace.toLocaleString()}</p>
                      <p><strong>Total Replaced:</strong> {system.totalReplaced.toLocaleString()}</p>
                      {system.totalToReplace > 0 && (
                        <p><strong>Progress:</strong> {system.percentReplaced.toFixed(1)}%</p>
                      )}
                    </>
                  )}
                  
                  {system.status === 'Inventory not received or incomplete' && (
                    <p className="status-warning inventory-warning">
                      <strong>⚠️ No complete inventory filed</strong>
                    </p>
                  )}
                  
                  <p>
                    <strong>Status:</strong>{' '}
                    <span style={{ 
                      color: getMarkerColor(system),
                      fontWeight: 'bold'
                    }}>
                      {system.status}
                    </span>
                  </p>
                  
                  {system.exceedance && system.exceedance !== '-' && system.exceedance !== '' && (
                    <p><strong>LCR Exceedance:</strong> {system.exceedance}</p>
                  )}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="map-legend">
        <h4>Legend</h4>
        <table className="legend-table">
          <thead>
            <tr>
              <th></th>
              <th>Status</th>
              <th>Count</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {statusOrder.map(status => (
              <tr key={status}>
                <td>
                  <span 
                    className="legend-circle"
                    style={{ backgroundColor: STATUS_CONFIG[status].color }}
                  ></span>
                </td>
                <td className="legend-status">{status}</td>
                <td className="legend-count">{statusCounts[status] || 0}</td>
                <td className="legend-description">{STATUS_CONFIG[status].description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="legend-note">
          <em>Circle size = Total lines to be identified or replaced</em>
        </p>
        
        {/* Progress Explanation */}
        <div className="progress-explanation">
          <h4>Understanding "Progress"</h4>
          <p className="progress-formula">
            <code>% Replaced = (Lines Replaced ÷ (Total to Identify and/or Replace + Lines Replaced)) × 100</code>
          </p>
          <p className="progress-note">
            <strong>Note:</strong> We calculate Progress based on % Replaced as described above. Systems with many "Unknown" lines may show low progress even if they've replaced all known lead lines. The unknown lines still need to be identified and potentially replaced, which is why they're included in the denominator.
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="map-info">
        <p>
          <strong>Note:</strong> This map shows {systemsWithCoords.length.toLocaleString()} water systems 
          ({(systemsWithCoords.length / waterSystemsData.length * 100).toFixed(1)}% of all Michigan systems) 
          with verified location data from EPA community water system boundaries. Click on any circle to see detailed information.
        </p>
        <p style={{ marginTop: '10px' }}>
          If the water utility you are looking for is not listed here, look them up on the <strong>Search Systems</strong> page.
        </p>
      </div>
    </div>
  );
}

export default LeadLineMap;
