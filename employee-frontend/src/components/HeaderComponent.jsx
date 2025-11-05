import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-dark" style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="/" style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              letterSpacing: '1px'
            }}>
              <i className="bi bi-people-fill me-2"></i>
              Employee Management System
            </a>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent
