import { vendedores, tiposCliente } from '../data/clients';

const TIPO_COLORS = {
  VIP: '#e74c3c',
  frecuente: '#3498db',
  nuevo: '#2ecc71',
};

export default function FilterPanel({
  filters,
  onFilterChange,
  totalClients,
  visibleCount,
  isOpen,
  onClose,
}) {
  const handleVendedorChange = (e) => {
    onFilterChange({ ...filters, vendedor: e.target.value });
  };

  const handleTipoChange = (tipo) => {
    const current = filters.tipos;
    const updated = current.includes(tipo)
      ? current.filter((t) => t !== tipo)
      : [...current, tipo];
    onFilterChange({ ...filters, tipos: updated });
  };

  const handleClearFilters = () => {
    onFilterChange({ vendedor: '', tipos: [...tiposCliente] });
  };

  const hasActiveFilters =
    filters.vendedor !== '' || filters.tipos.length !== tiposCliente.length;

  return (
    <aside className={`filter-panel ${isOpen ? 'open' : ''}`}>
      <button
        className='panel-close-btn'
        onClick={onClose}
        aria-label='Cerrar filtros'
      >
        ✕
      </button>
      <div className='filter-header'>
        <div className='logo-section'>
          <div className='logo-icon'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <circle cx='12' cy='12' r='10' fill='#3b82f6' opacity='0.15' />
              <path
                d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'
                fill='#3b82f6'
              />
              <circle cx='12' cy='9' r='2.5' fill='white' />
            </svg>
          </div>
          <h1>Mapa Clientes</h1>
        </div>
        <p className='subtitle'>Georreferenciación de Clientes</p>
      </div>

      <div className='stats-bar'>
        <div className='stat'>
          <span className='stat-number'>{totalClients}</span>
          <span className='stat-label'>Total</span>
        </div>
        <div className='stat-divider' />
        <div className='stat'>
          <span className='stat-number'>{visibleCount}</span>
          <span className='stat-label'>Visibles</span>
        </div>
      </div>

      <div className='filter-section'>
        <label className='filter-label'>Vendedor</label>
        <select
          className='filter-select'
          value={filters.vendedor}
          onChange={handleVendedorChange}
        >
          <option value=''>Todos los vendedores</option>
          {vendedores.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className='filter-section'>
        <label className='filter-label'>Tipo de Cliente</label>
        <div className='checkbox-group'>
          {tiposCliente.map((tipo) => (
            <label key={tipo} className='checkbox-item'>
              <input
                type='checkbox'
                checked={filters.tipos.includes(tipo)}
                onChange={() => handleTipoChange(tipo)}
              />
              <span
                className='color-dot'
                style={{ backgroundColor: TIPO_COLORS[tipo] }}
              />
              <span className='checkbox-label'>{tipo}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button className='clear-btn' onClick={handleClearFilters}>
          Limpiar filtros
        </button>
      )}

      <div className='legend'>
        <label className='filter-label'>Leyenda</label>
        {Object.entries(TIPO_COLORS).map(([tipo, color]) => (
          <div key={tipo} className='legend-item'>
            <span className='legend-dot' style={{ backgroundColor: color }} />
            <span>{tipo}</span>
          </div>
        ))}
      </div>

      <div className='filter-footer'>
        <p>
          Optimización <strong>bbox</strong> activa — solo se renderizan los
          clientes dentro del área visible del mapa.
        </p>
      </div>
    </aside>
  );
}
