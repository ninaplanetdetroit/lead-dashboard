import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import waterSystemsData from '../data/waterSystemsData';
import './LeadLineMap.css';

function LeadLineMap() {
  const [showNoLead, setShowNoLead] = useState(true);
  const [showCompliant, setShowCompliant] = useState(true);
  const [showNonCompliant, setShowNonCompliant] = useState(true);

  // Filter systems with coordinates
  const systemsWithCoords = waterSystemsData.filter(
    system => system.latitude && system.longitude
  );

  // Filter by compliance status
  const filteredSystems = systemsWithCoords.filter(system => {
    // Three categories:
    // 1. No lead lines identified
    if (system.totalToReplace === 0) {
      return showNoLead;
    }
    // 2. Compliant (≥20% progress)
    if (system.percentReplaced >= 20) {
      return showCompliant;
    }
    // 3. Not in Compliance (<20% progress)
    return showNonCompliant;
  });

  // Determine marker color based on compliance
  const getMarkerColor = (system) => {
    // No lead lines identified - blue
    if (system.totalToReplace === 0) return '#3b82f6';
    // Compliant (≥20%) - green
    if (system.percentReplaced >= 20) return '#16a34a';
    // Not in Compliance (<20%) - red
    return '#dc2626';
  };

  // Calculate marker radius based on total lines to replace
  const getMarkerRadius = (totalToReplace) => {
    // Scale radius: sqrt for better visual proportion
    const baseRadius = Math.sqrt(totalToReplace) / 5;
    return Math.max(baseRadius, 4); // Minimum 4px radius
  };

  // Get compliance status text
  const getComplianceStatus = (system) => {
    if (system.totalToReplace === 0) return 'No lead lines identified';
    if (system.percentReplaced >= 20) return 'Compliant';
    return 'Not in Compliance';
  };

  return (
    <div className="map-container">
      <h2>Geographic Distribution of Lead Service Line Replacement Compliance in Michigan</h2>
      <p className="map-subtitle">
        Showing {filteredSystems.length} of {systemsWithCoords.length} water systems with location data
      </p>

      {/* Filter Controls */}
      <div className="map-controls">
        <label>
          <input
            type="checkbox"
            checked={showNoLead}
            onChange={(e) => setShowNoLead(e.target.checked)}
          />
          <span className="no-lead-label">● No lead lines identified</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={showCompliant}
            onChange={(e) => setShowCompliant(e.target.checked)}
          />
          <span className="compliant-label">● Compliant (≥20% replaced between 2021 and 2024)</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={showNonCompliant}
            onChange={(e) => setShowNonCompliant(e.target.checked)}
          />
          <span className="noncompliant-label">● Not in Compliance (&lt;20% between 2021 and 2024)</span>
        </label>
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
            radius={getMarkerRadius(system.totalToReplace)}
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
                  <p><strong>Lead Lines:</strong> {system.leadLines.toLocaleString()}</p>
                  <p><strong>Total to Replace:</strong> {system.totalToReplace.toLocaleString()}</p>
                  <p><strong>Replaced:</strong> {system.totalReplaced.toLocaleString()}</p>
                  <p><strong>Progress:</strong> {system.percentReplaced.toFixed(1)}%</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span style={{ 
                      color: getMarkerColor(system),
                      fontWeight: 'bold'
                    }}>
                      {getComplianceStatus(system)}
                    </span>
                  </p>
                  {system.exceedance && (
                    <p><strong>LCR Exceedance:</strong> {system.exceedance}</p>
                  )}
                  {system.epaLink && (
                    <p className="epa-link">
                      <a 
                        href={system.epaLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="epa-link-button"
                      >
                        View EPA Facility Report →
                      </a>
                    </p>
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
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-circle no-lead"></span>
            <span>No lead lines identified</span>
          </div>
          <div className="legend-item">
            <span className="legend-circle compliant"></span>
            <span>Compliant (≥20% replaced)</span>
          </div>
          <div className="legend-item">
            <span className="legend-circle noncompliant"></span>
            <span>Not in Compliance (&lt;20% replaced)</span>
          </div>
          <div className="legend-item">
            <span className="legend-text">Circle size = Total lead lines to be identified or replaced</span>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="map-info">
        <p>
          <strong>Note:</strong> This map shows {systemsWithCoords.length} water systems 
          ({(systemsWithCoords.length / waterSystemsData.length * 100).toFixed(1)}% of all Michigan systems) 
          with verified location data from EPA community water system boundaries. Click on any circle to see detailed information and access the EPA facility report.
        </p>
      </div>
    </div>
  );
}

export default LeadLineMap;
