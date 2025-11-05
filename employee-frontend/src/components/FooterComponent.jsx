import React from 'react'

const FooterComponent = () => {
  return (
    <div>
      <footer className="footer text-white text-center py-3 mt-5" style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <span>© 2025 Employee Management System. All Rights Reserved.</span>
      </footer>
    </div>
  )
}

export default FooterComponent
