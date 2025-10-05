import { useState, useEffect } from 'react'
import './BloodReportForm.css'

const TEST_OPTIONS = [
  { value: 'Hemoglobin', label: 'Hemoglobin', unit: 'g/dL', normalRange: '12.0 - 16.0' },
  { value: 'WBC Count', label: 'WBC Count', unit: 'cells/μL', normalRange: '4,000 - 11,000' },
  { value: 'RBC Count', label: 'RBC Count', unit: 'million cells/μL', normalRange: '4.5 - 5.5' },
  { value: 'Platelet Count', label: 'Platelet Count', unit: 'cells/μL', normalRange: '150,000 - 450,000' },
  { value: 'Blood Sugar (Fasting)', label: 'Blood Sugar (Fasting)', unit: 'mg/dL', normalRange: '70 - 100' },
  { value: 'Blood Sugar (PP)', label: 'Blood Sugar (PP)', unit: 'mg/dL', normalRange: '100 - 140' },
  { value: 'Cholesterol', label: 'Cholesterol', unit: 'mg/dL', normalRange: '<200' },
  { value: 'Triglycerides', label: 'Triglycerides', unit: 'mg/dL', normalRange: '<150' },
  { value: 'HDL', label: 'HDL', unit: 'mg/dL', normalRange: '>40' },
  { value: 'LDL', label: 'LDL', unit: 'mg/dL', normalRange: '<100' },
  { value: 'Custom Test', label: 'Custom Test', unit: '', normalRange: '' }
]

function BloodReportForm({ onSubmit, onCancel, initialData, customerData }) {
  const [formData, setFormData] = useState({
    testDate: new Date().toISOString().split('T')[0],
    reportDate: new Date().toISOString().split('T')[0],
    doctorName: '',
    notes: ''
  })

  const [tests, setTests] = useState([
    { testName: '', value: '', unit: '', normalRange: '' }
  ])

  useEffect(() => {
    if (initialData) {
      setFormData({
        testDate: initialData.testDate || new Date().toISOString().split('T')[0],
        reportDate: initialData.reportDate || new Date().toISOString().split('T')[0],
        doctorName: initialData.doctorName || '',
        notes: initialData.notes || ''
      })
      if (initialData.tests && initialData.tests.length > 0) {
        setTests(initialData.tests)
      }
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTestChange = (index, field, value) => {
    const newTests = [...tests]
    newTests[index][field] = value

    if (field === 'testName' && value !== 'Custom Test' && value !== '') {
      const selectedTest = TEST_OPTIONS.find(t => t.value === value)
      if (selectedTest) {
        newTests[index].unit = selectedTest.unit
        newTests[index].normalRange = selectedTest.normalRange
      }
    } else if (field === 'testName' && value === 'Custom Test') {
      newTests[index].customTestName = ''
      newTests[index].unit = ''
      newTests[index].normalRange = ''
    }

    setTests(newTests)
  }

  const addTest = () => {
    setTests([...tests, { testName: '', value: '', unit: '', normalRange: '' }])
  }

  const removeTest = (index) => {
    if (tests.length > 1) {
      setTests(tests.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validTests = tests.filter(t => t.testName && t.value)
    if (validTests.length === 0) {
      alert('Please add at least one test result')
      return
    }
    onSubmit({ ...formData, tests: validTests })
  }

  return (
    <div className="blood-report-form">
      <div className="form-header">
        <svg className="form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2>Generate Blood Report</h2>
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
            <label htmlFor="testDate">Test Date *</label>
            <input
              type="date"
              id="testDate"
              name="testDate"
              value={formData.testDate}
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

          <div className="form-group">
            <label htmlFor="doctorName">Doctor Name</label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Referring doctor"
            />
          </div>
        </div>

        <div className="tests-section">
          <div className="tests-header">
            <h3>Test Results</h3>
            <button type="button" className="btn-add-test" onClick={addTest}>
              + Add Test
            </button>
          </div>

          <div className="tests-list">
            {tests.map((test, index) => (
              <div key={index} className="test-row">
                <div className="test-fields">
                  <select
                    value={test.testName}
                    onChange={(e) => handleTestChange(index, 'testName', e.target.value)}
                    className="test-select"
                    required
                  >
                    <option value="">Select test...</option>
                    {TEST_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {test.testName === 'Custom Test' && (
                    <input
                      type="text"
                      value={test.customTestName || ''}
                      onChange={(e) => handleTestChange(index, 'customTestName', e.target.value)}
                      placeholder="Test name"
                      className="test-input"
                      required
                    />
                  )}

                  <input
                    type="text"
                    value={test.value}
                    onChange={(e) => handleTestChange(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="test-input"
                    required
                  />

                  <input
                    type="text"
                    value={test.unit}
                    onChange={(e) => handleTestChange(index, 'unit', e.target.value)}
                    placeholder="Unit"
                    className="test-input"
                  />

                  <input
                    type="text"
                    value={test.normalRange}
                    onChange={(e) => handleTestChange(index, 'normalRange', e.target.value)}
                    placeholder="Normal range"
                    className="test-input"
                  />
                </div>

                {tests.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove-test"
                    onClick={() => removeTest(index)}
                    title="Remove test"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="notes">Notes / Remarks</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes or remarks"
            rows="3"
          />
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

export default BloodReportForm
