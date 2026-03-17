import { useState } from 'react';
import { createVacation } from '../api.js';

function VacationForm({ onCreated }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (startDate > endDate) {
      setError('Start date must be before or equal to end date.');
      return;
    }

    setLoading(true);
    try {
      await createVacation({ startDate, endDate });
      setSuccess('Vacation request created successfully!');
      setStartDate('');
      setEndDate('');
      onCreated();
    } catch (err) {
      setError(err.message || 'Failed to create vacation request.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vacation-form">
      <h2>Request Vacation</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VacationForm;
