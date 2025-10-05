import './ReportPreview.css'

function ReportPreview({ customerData, reportData, onClose }) {
  const handlePrint = () => {
    window.print()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const generateReportNumber = () => {
    return `LAB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
  }

  const reportNumber = generateReportNumber()

  return (
    <div className="report-preview">
      <div className="report-actions no-print">
        <button className="btn-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Close
        </button>
        <button className="btn-print" onClick={handlePrint}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9V2H18V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 14H6V22H18V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Print Report
        </button>
      </div>

      <div className="report-container">
        <div className="report-content">
          <div className="report-header">
            <div className="header-top">
              <svg className="heartbeat-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="lab-title">
                <h1>JAYAVEL CLINICAL LABORATORY</h1>
                <p>Comprehensive Blood Testing Services</p>
                <p>Phone: +91 9876543210 | Email: info@jayavellab.com</p>
              </div>
            </div>
          </div>

          <div className="report-info-section">
            <div className="report-details-box">
              <div className="details-column">
                <h3>Patient Details</h3>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{customerData?.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Age/Gender:</span>
                  <span className="detail-value">{customerData?.age} Years / {customerData?.gender}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{customerData?.phone}</span>
                </div>
              </div>

              <div className="details-column">
                <h3>Report Details</h3>
                <div className="detail-row">
                  <span className="detail-label">Report No:</span>
                  <span className="detail-value">{reportNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Test Date:</span>
                  <span className="detail-value">{formatDate(reportData?.testDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Report Date:</span>
                  <span className="detail-value">{formatDate(reportData?.reportDate)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="test-results-section">
            <h2>BLOOD TEST RESULTS</h2>

            <table className="results-table">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Result</th>
                  <th>Unit</th>
                  <th>Normal Range</th>
                </tr>
              </thead>
              <tbody>
                {reportData?.tests && reportData.tests.map((test, index) => (
                  <tr key={index}>
                    <td>{test.testName === 'Custom Test' ? test.customTestName : test.testName}</td>
                    <td className="result-value">{test.value}</td>
                    <td>{test.unit}</td>
                    <td>{test.normalRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reportData?.notes && (
            <div className="notes-section">
              <p><strong>Notes:</strong> {reportData.notes}</p>
            </div>
          )}

          <div className="report-footer">
            <div className="signature-line">
              <div className="signature-space"></div>
              <p className="signature-label">Lab Director Signature</p>
              <p className="signature-date">Date: {formatDate(reportData?.reportDate)}</p>
            </div>

            <div className="footer-text">
              <p>This is a computer generated report</p>
              <p>Authorized by Jayavel Clinical Laboratory</p>
              <p>For any queries, please contact us at +91 9876543210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportPreview
