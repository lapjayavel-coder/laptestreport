import { useState, useEffect } from 'react'
import './UrineReportForm.css'

const URINE_TESTS = {
  analysis: [
    { name: 'Colour & Appearance', defaultValue: 'Straw yellow, Clear' },
    { name: 'Glucose (R)', defaultValue: 'Nil' },
    { name: 'Bilirubin', defaultValue: 'Nil' },
    { name: 'Ketone', defaultValue: 'Negative' },
    { name: 'Specific Gravity', defaultValue: '1.015', normalRange: '1.015 - 1.025' },
    { name: 'Blood', defaultValue: 'Negative' },
    { name: 'pH', defaultValue: '6.0' },
    { name: 'Protien', defaultValue: 'Negative' },
    { name: 'Urobilinogen', defaultValue: 'NIL E.U/dL', normalRange: '0.2' },
    { name: 'Nitrite', defaultValue: 'Negative' },
    { name: 'Leukocytes', defaultValue: 'Negative' }
  ],
  microscopic: [
    { name: 'Pus cells', defaultValue: '02 - 03 /hpf' },
    { name: 'Epi Cells', defaultValue: '02 - 03 /hpf' },
    { name: 'R.B.Cs', defaultValue: 'Nil /hpf' },
    { name: 'Cast', defaultValue: 'Nil /hpf' },
    { name: 'Crystal', defaultValue: 'NIL' }
  ]
}

function UrineReportForm({ onSubmit, onCancel, initialData, customerData }) {
  const [formData, setFormData] = useState({
    collectionDate: new Date().toISOString().split('T')[0],
    receivedDate: new Date().toISOString().split('T')[0],
    reportDate: new Date().toISOString().split('T')[0],
    doctorName: ''
  })

  const [analysisTests, setAnalysisTests] = useState(
    URINE_TESTS.analysis.map(test => ({
      testName: test.name,
      value: test.defaultValue,
      normalRange: test.normalRange || ''
    }))
  )

  const [microscopicTests, setMicroscopicTests] = useState(
    URINE_TESTS.microscopic.map(test => ({
      testName: test.name,
      value: test.defaultValue
    }))
  )

  useEffect(() => {
    if (initialData) {
      setFormData({
        collectionDate: initialData.collectionDate || new Date().toISOString().split('T')[0],
        receivedDate: initialData.receivedDate || new Date().toISOString().split('T')[0],
        reportDate: initialData.reportDate || new Date().toISOString().split('T')[0],
        doctorName: initialData.doctorName || ''
      })
      if (initialData.analysisTests) setAnalysisTests(initialData.analysisTests)
      if (initialData.microscopicTests) setMicroscopicTests(initialData.microscopicTests)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAnalysisChange = (index, field, value) => {
    const newTests = [...analysisTests]
    newTests[index][field] = value
    setAnalysisTests(newTests)
  }

  const handleMicroscopicChange = (index, field, value) => {
    const newTests = [...microscopicTests]
    newTests[index][field] = value
    setMicroscopicTests(newTests)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      analysisTests,
      microscopicTests
    })
  }

  return (
    <div className="urine-report-form">
      <div className="form-header">
        <svg className="form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2>Generate Urine Report</h2>
      </div>

      <div className="patient-info-box">
        <h3>Patient Information</h3>
        <div className="patient-details">
          <div className="patient-detail-item">
            <strong>Name:</strong> {customerData?.name}
          </div>
          <div className="patient-detail-item">
            <strong>Age/Gender:</strong> {customerData?.age} / {customerData?.gender}
          </div>
          <div className="patient-detail-item">
            <strong>Phone:</strong> {customerData?.phone}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="collectionDate">Collection Date *</label>
            <input
              type="date"
              id="collectionDate"
              name="collectionDate"
              value={formData.collectionDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="receivedDate">Received Date *</label>
            <input
              type="date"
              id="receivedDate"
              name="receivedDate"
              value={formData.receivedDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reportDate">Report Date *</label>
            <input
              type="date"
              id="reportDate"
              name="reportDate"
              value={formData.reportDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="doctorName">Referring Doctor</label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Doctor name"
            />
          </div>
        </div>

        <div className="tests-section">
          <h3>Urine Analysis</h3>
          <div className="tests-list">
            {analysisTests.map((test, index) => (
              <div key={index} className="test-row">
                <div className="test-name">{test.testName}</div>
                <div className="test-fields">
                  <input
                    type="text"
                    value={test.value}
                    onChange={(e) => handleAnalysisChange(index, 'value', e.target.value)}
                    placeholder="Result"
                    className="test-input"
                  />
                  {test.normalRange && (
                    <input
                      type="text"
                      value={test.normalRange}
                      onChange={(e) => handleAnalysisChange(index, 'normalRange', e.target.value)}
                      placeholder="Normal range"
                      className="test-input range-input"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tests-section">
          <h3>Deposits (Microscopic Examination)</h3>
          <div className="tests-list">
            {microscopicTests.map((test, index) => (
              <div key={index} className="test-row">
                <div className="test-name">{test.testName}</div>
                <div className="test-fields">
                  <input
                    type="text"
                    value={test.value}
                    onChange={(e) => handleMicroscopicChange(index, 'value', e.target.value)}
                    placeholder="Result"
                    className="test-input"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Generate Report
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UrineReportForm
