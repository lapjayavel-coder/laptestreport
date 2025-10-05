import './ReportPreview.css'

function ReportPreview({ customerData, reportData, onClose }) {
  const handlePrint = () => {
    window.print()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const generateReportNumber = () => {
    return `2509-000${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
  }

  const generateLabId = () => {
    return `LAB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
  }

  const reportNumber = generateReportNumber()
  const labId = generateLabId()
  const isUrineReport = reportData?.testType === 'urine'

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
              <div className="logo-placeholder"></div>
              <div className="lab-title">
                <h1>SHERIN CLINICAL LAB</h1>
                <p className="subtitle">SITHI CLINIC & MEDICALS</p>
              </div>
            </div>
          </div>

          <div className="report-info-section">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Lab ID No:</span>
                <span className="info-value">{reportNumber}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Pt's Name:</span>
                <span className="info-value">Mr./Mrs. {customerData?.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Collection Date:</span>
                <span className="info-value">{formatDate(isUrineReport ? reportData?.collectionDate : reportData?.testDate)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Age & Sex:</span>
                <span className="info-value">{customerData?.age} / {customerData?.gender === 'Male' ? 'MALE' : customerData?.gender === 'Female' ? 'FEMALE' : 'OTHER'}</span>
              </div>
              {isUrineReport && (
                <div className="info-item">
                  <span className="info-label">Received Date:</span>
                  <span className="info-value">{formatDate(reportData?.receivedDate)}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">Ref. by Dr.:</span>
                <span className="info-value">{reportData?.doctorName || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Report Date:</span>
                <span className="info-value">{formatDate(reportData?.reportDate)}</span>
              </div>
            </div>
            <div className="barcode-section">
              <div className="barcode-placeholder"></div>
            </div>
            <div className="final-report-badge">Final Report</div>
            <div className="page-indicator">Page 2 of 2</div>
          </div>

          <div className="test-results-section">
            <h2 className="section-title">CLINICAL PATHOLOGY REPORT</h2>

            {!isUrineReport ? (
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Sample</th>
                    <th>Investigation</th>
                    <th>Result</th>
                    <th>Units</th>
                    <th>Normal Range & Methods</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData?.tests && reportData.tests.map((test, index) => (
                    <tr key={index}>
                      <td>Blood</td>
                      <td>{test.testName === 'Custom Test' ? test.customTestName : test.testName}</td>
                      <td className="result-value">{test.value}</td>
                      <td>{test.unit}</td>
                      <td>{test.normalRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <h3 className="subsection-title">Urine Analysis</h3>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Sample</th>
                      <th>Investigation</th>
                      <th>Result</th>
                      <th>Units</th>
                      <th>Normal Range & Methods</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData?.analysisTests && reportData.analysisTests.map((test, index) => (
                      <tr key={index}>
                        <td>Urine</td>
                        <td>{test.testName}</td>
                        <td className="result-value">{test.value}</td>
                        <td></td>
                        <td>{test.normalRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 className="subsection-title microscopic-title">Deposits (Microscopic Examination)</h3>
                <table className="results-table">
                  <tbody>
                    {reportData?.microscopicTests && reportData.microscopicTests.map((test, index) => (
                      <tr key={index}>
                        <td>Urine</td>
                        <td>{test.testName}</td>
                        <td className="result-value">{test.value}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>

          <div className="end-of-report">End of Report</div>

          <div className="report-footer">
            <div className="footer-note">
              <p className="disclaimer">*Result may vary depending on factors like quality of specimen, time of sampling, reagent kit used, food intake, sensitivity & specificity of assay, processing, assay if done / correlation with clinical findings</p>
              <p className="disclaimer">*Clinical Laboratory investigation never confirm the final diagnosis of the disease. All reports need to be correlated with clinical and other findings</p>
            </div>

            <div className="signature-section">
              <div className="signature-box">
                <div className="signature-line"></div>
                <p className="signature-label">Lab technologist</p>
              </div>
            </div>

            <div className="contact-info">
              <p><strong>No.88, TTP Road, Azad Nagar,</strong></p>
              <p><strong>Muthupet - 614704, Thiruvarur - Dist</strong></p>
              <div className="contact-details">
                <span>📞 04369 299956</span>
                <span>📞 +91 97886 14530</span>
                <span>✉ sherinclinicallab@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportPreview
