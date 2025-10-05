import { useState } from 'react'
import CustomerForm from './components/CustomerForm'
import BloodReportForm from './components/BloodReportForm'
import ReportPreview from './components/ReportPreview'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('registration')
  const [customerData, setCustomerData] = useState(null)
  const [reportData, setReportData] = useState(null)

  const handleCustomerSubmit = (data) => {
    setCustomerData(data)
    setCurrentView('report')
  }

  const handleReportSubmit = (data) => {
    setReportData(data)
    setCurrentView('preview')
  }

  const handleClose = () => {
    setCurrentView('registration')
    setCustomerData(null)
    setReportData(null)
  }

  const handleCancel = () => {
    if (currentView === 'report') {
      setCurrentView('registration')
    } else if (currentView === 'preview') {
      setCurrentView('report')
    }
  }

  return (
    <div className="app">
      <header className="app-header no-print">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1>Jayavel Clinical Laboratory</h1>
              <p>Blood Report Management System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="content-area">
          {currentView === 'registration' && (
            <CustomerForm
              onSubmit={handleCustomerSubmit}
              initialData={customerData}
            />
          )}

          {currentView === 'report' && (
            <BloodReportForm
              onSubmit={handleReportSubmit}
              onCancel={handleCancel}
              initialData={reportData}
              customerData={customerData}
            />
          )}

          {currentView === 'preview' && (
            <ReportPreview
              customerData={customerData}
              reportData={reportData}
              onClose={handleClose}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
