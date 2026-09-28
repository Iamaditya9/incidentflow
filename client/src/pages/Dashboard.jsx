import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    // Initial fetch from backend
    fetch('http://localhost:5000/api/incidents')
      .then((res) => res.json())
      .then((data) => {
        setIncidents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });

    // Real-time WebSocket listeners
    socket.on('incident:created', (newInc) => {
      setIncidents((prev) => [newInc, ...prev]);
    });

    socket.on('incident:updated', (updatedInc) => {
      setIncidents((prev) =>
        prev.map((inc) => (inc._id === updatedInc._id ? updatedInc : inc))
      );
    });

    return () => {
      socket.off('incident:created');
      socket.off('incident:updated');
    };
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/incidents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, assignedTo: 'Aditya Yadav' }),
      });
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const filteredIncidents = incidents.filter((inc) => {
    if (filter === 'ALL') return true;
    return inc.severity === filter;
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '24px', background: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>⚡ IncidentFlow Operations</h1>
          <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>Human-Centered Live Response Telemetry</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1e293b', padding: '6px 14px', borderRadius: '20px', border: '1px solid #334155', fontSize: '13px' }}>
          <span style={{ height: '8px', width: '8px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
          <span>Live Telemetry Active</span>
        </div>
      </header>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>TOTAL INCIDENTS</span>
          <h3 style={{ fontSize: '28px', margin: '8px 0 0 0' }}>{incidents.length}</h3>
        </div>
        <div style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #ef4444' }}>
          <span style={{ fontSize: '12px', color: '#ef4444' }}>CRITICAL / HIGH</span>
          <h3 style={{ fontSize: '28px', margin: '8px 0 0 0', color: '#ef4444' }}>
            {incidents.filter((i) => i.severity === 'CRITICAL' || i.severity === 'HIGH').length}
          </h3>
        </div>
        <div style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>OPERATOR</span>
          <h3 style={{ fontSize: '18px', margin: '8px 0 0 0', color: '#38bdf8' }}>Aditya Yadav</h3>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #334155',
              cursor: 'pointer',
              background: filter === lvl ? '#38bdf8' : '#1e293b',
              color: filter === lvl ? '#0f172a' : '#f8fafc',
              fontWeight: filter === lvl ? 'bold' : 'normal',
            }}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Incidents Feed */}
      {loading ? (
        <p style={{ color: '#94a3b8' }}>Loading operational stream...</p>
      ) : filteredIncidents.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No active incidents matching criteria.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredIncidents.map((inc) => (
            <div
              key={inc._id}
              style={{
                background: '#1e293b',
                borderLeft: `4px solid ${inc.severity === 'CRITICAL' ? '#ef4444' : inc.severity === 'HIGH' ? '#f97316' : '#eab308'}`,
                padding: '16px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '4px', background: '#334155' }}>{inc.severity}</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{inc.affectedSystem}</span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>• Status: {inc.status}</span>
                </div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{inc.title}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>{inc.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {inc.status !== 'RESOLVED' && (
                  <button
                    onClick={() => handleStatusUpdate(inc._id, 'RESOLVED')}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}