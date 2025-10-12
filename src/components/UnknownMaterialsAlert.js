import React from 'react';
import './UnknownMaterialsAlert.css';

function UnknownMaterialsAlert() {
  const totalServiceLines = 2606706;
  const knownLead = 203050;
  const knownGPCL = 61608;
  const unknown = 315372;
  const nonLead = 2026676;
  
  const knownTotal = knownLead + knownGPCL;
  const percentUnknown = ((unknown / totalServiceLines) * 100).toFixed(1);
  const potentialPopulationImpact = Math.round((unknown / totalServiceLines) * 7375073);

  return (
    <div className="unknown-container">
      <div className="alert-banner">
        <div className="alert-icon">⚠️</div>
        <div className="alert-content">
          <h1>The Hidden Lead Crisis</h1>
          <p className="alert-subtitle">
            Over 315,000 water service lines in Michigan have unknown materials — 
            they could be lead, but haven't been tested yet
          </p>
        </div>
      </div>

      <div className="stats-comparison">
        <div className="comparison-card known">
          <div className="card-icon">✅</div>
          <h3>What We Know</h3>
          <div className="big-number">{knownTotal.toLocaleString()}</div>
          <p className="stat-description">Confirmed lead or galvanized service lines requiring replacement</p>
          <div className="breakdown">
            <div className="breakdown-item">
              <span className="bullet" style={{background: '#dc2626'}}></span>
              <span>{knownLead.toLocaleString()} Lead</span>
            </div>
            <div className="breakdown-item">
              <span className="bullet" style={{background: '#ea580c'}}></span>
              <span>{knownGPCL.toLocaleString()} Galvanized</span>
            </div>
          </div>
        </div>

        <div className="comparison-card unknown-card">
          <div className="card-icon">❓</div>
          <h3>What We Don't Know</h3>
          <div className="big-number danger">{unknown.toLocaleString()}</div>
          <p className="stat-description">Service lines of <strong>unknown material</strong> — could be lead</p>
          <div className="warning-box">
            <strong>{percentUnknown}%</strong> of all service lines haven't been properly identified
          </div>
        </div>
      </div>

      <div className="visualization-section">
        <h2>Scale of the Unknown</h2>
        <p className="section-subtitle">
          If even a fraction of these unknown lines contain lead, 
          the problem is far bigger than current estimates
        </p>

        <div className="scenario-grid">
          <div className="scenario-card">
            <div className="scenario-title">Conservative Estimate</div>
            <div className="scenario-percent">10% contain lead</div>
            <div className="scenario-number">{Math.round(unknown * 0.10).toLocaleString()}</div>
            <div className="scenario-label">additional lead lines</div>
          </div>

          <div className="scenario-card moderate">
            <div className="scenario-title">Moderate Estimate</div>
            <div className="scenario-percent">25% contain lead</div>
            <div className="scenario-number">{Math.round(unknown * 0.25).toLocaleString()}</div>
            <div className="scenario-label">additional lead lines</div>
          </div>

          <div className="scenario-card high">
            <div className="scenario-title">High Estimate</div>
            <div className="scenario-percent">50% contain lead</div>
            <div className="scenario-number">{Math.round(unknown * 0.50).toLocaleString()}</div>
            <div className="scenario-label">additional lead lines</div>
          </div>
        </div>
      </div>

      <div className="impact-section">
        <h2>Population at Potential Risk</h2>
        <div className="impact-box">
          <div className="impact-number">{potentialPopulationImpact.toLocaleString()}</div>
          <div className="impact-label">Michigan residents served by systems with unknown service line materials</div>
        </div>
      </div>

      <div className="why-matters-section">
        <h2>Why This Matters</h2>
        <div className="reasons-grid">
          <div className="reason-card">
            <div className="reason-icon">🔬</div>
            <h3>Testing Gap</h3>
            <p>Until these lines are tested or replaced, we can't know the true scope of lead contamination risk</p>
          </div>

          <div className="reason-card">
            <div className="reason-icon">💰</div>
            <h3>Funding Uncertainty</h3>
            <p>Without accurate counts, it's impossible to properly budget and plan for complete lead line removal</p>
          </div>

          <div className="reason-card">
            <div className="reason-icon">⏱️</div>
            <h3>Timeline Impact</h3>
            <p>The 2041 federal deadline may be unrealistic if hundreds of thousands more lead lines exist</p>
          </div>

          <div className="reason-card">
            <div className="reason-icon">🏘️</div>
            <h3>Environmental Justice</h3>
            <p>Unknown lines are often concentrated in older neighborhoods and lower-income communities</p>
          </div>
        </div>
      </div>

      <div className="action-section">
        <h2>What Needs to Happen</h2>
        <div className="action-list">
          <div className="action-item">
            <span className="action-number">1</span>
            <div className="action-content">
              <h4>Mandatory Material Identification</h4>
              <p>All water systems must identify service line materials through inspection or replacement</p>
            </div>
          </div>

          <div className="action-item">
            <span className="action-number">2</span>
            <div className="action-content">
              <h4>Increased Transparency</h4>
              <p>Regular public reporting on identification progress and findings from each water system</p>
            </div>
          </div>

          <div className="action-item">
            <span className="action-number">3</span>
            <div className="action-content">
              <h4>Accelerated Testing</h4>
              <p>Prioritize identification in communities with older housing stock and known lead issues</p>
            </div>
          </div>

          <div className="action-item">
            <span className="action-number">4</span>
            <div className="action-content">
              <h4>Additional Funding</h4>
              <p>State and federal resources for material identification programs, not just replacement</p>
            </div>
          </div>
        </div>
      </div>

      <div className="callout-box">
        <h3>Bottom Line</h3>
        <p>
          Michigan's lead service line problem may be significantly larger than current data suggests. 
          The 315,372 unknown service lines represent a critical data gap that must be addressed 
          before we can truly understand — and solve — the lead crisis.
        </p>
      </div>
    </div>
  );
}

export default UnknownMaterialsAlert;