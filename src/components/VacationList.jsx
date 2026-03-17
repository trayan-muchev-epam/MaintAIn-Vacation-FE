import { useState } from 'react';
import { deleteVacation } from '../api.js';

function VacationList({ vacations, loading, onDeleted }) {
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this vacation request?')) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteVacation(id);
      onDeleted();
    } catch (err) {
      alert('Failed to delete vacation request.');
    } finally {
      setDeletingId(null);
    }
  }

  function statusClass(status) {
    switch (status) {
      case 'APPROVED': return 'status-approved';
      case 'REJECTED': return 'status-rejected';
      case 'PENDING': return 'status-pending';
      default: return '';
    }
  }

  if (loading) {
    return <p>Loading vacations...</p>;
  }

  if (vacations.length === 0) {
    return <p className="no-data">No vacation requests found.</p>;
  }

  return (
    <div className="vacation-list">
      <h2>My Vacations</h2>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vacations.map((v) => (
            <tr key={v.id}>
              <td>{v.startDate}</td>
              <td>{v.endDate}</td>
              <td>{v.days}</td>
              <td>
                <span className={`status ${statusClass(v.status)}`}>
                  {v.status}
                </span>
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(v.id)}
                  disabled={deletingId === v.id}
                >
                  {deletingId === v.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VacationList;
