import { useState, useMemo, useCallback } from 'react';
import { clients as allClients, tiposCliente } from './data/clients';
import MapView from './components/MapView';
import FilterPanel from './components/FilterPanel';
import './App.css';

function App() {
  const [filters, setFilters] = useState({
    vendedor: '',
    tipos: [...tiposCliente],
  });
  const [visibleCount, setVisibleCount] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);

  const filteredClients = useMemo(() => {
    return allClients.filter((c) => {
      if (filters.vendedor && c.vendedor !== filters.vendedor) return false;
      if (!filters.tipos.includes(c.tipo_cliente)) return false;
      return true;
    });
  }, [filters]);

  const handleVisibleCountChange = useCallback((count) => {
    setVisibleCount(count);
  }, []);

  return (
    <div className='app'>
      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        totalClients={filteredClients.length}
        visibleCount={visibleCount}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
      <main className='map-container'>
        <button
          className='mobile-toggle-btn'
          onClick={() => setPanelOpen(true)}
          aria-label='Abrir filtros'
        >
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path
              d='M3 5h14M3 10h14M3 15h14'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
          <span className='mobile-toggle-stats'>
            {visibleCount}/{filteredClients.length}
          </span>
        </button>
        <MapView
          clients={filteredClients}
          onVisibleCountChange={handleVisibleCountChange}
        />
      </main>
      <div className='bottom-bar'>
        <div className='bottom-bar-stats'>
          <div className='bottom-bar-stat'>
            <span className='bottom-bar-number'>{visibleCount}</span>
            <span className='bottom-bar-label'>Visibles</span>
          </div>
          <div className='bottom-bar-divider' />
          <div className='bottom-bar-stat'>
            <span className='bottom-bar-number'>{filteredClients.length}</span>
            <span className='bottom-bar-label'>Total</span>
          </div>
        </div>
        <button
          className='bottom-bar-filter-btn'
          onClick={() => setPanelOpen(true)}
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path d='M1 2h14L9.5 8.5V13l-3 1.5V8.5L1 2z' fill='currentColor' />
          </svg>
          Filtros
        </button>
      </div>
      {panelOpen && (
        <div className='overlay' onClick={() => setPanelOpen(false)} />
      )}
    </div>
  );
}

export default App;
