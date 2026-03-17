import { useState, useEffect, useCallback } from 'react';
import { fetchVacations, fetchCurrentUser } from '../api.js';
import VacationList from './VacationList.jsx';
import VacationForm from './VacationForm.jsx';

function Dashboard({ user, onLogout, onUserUpdate }) {
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [vacData, userData] = await Promise.all([
        fetchVacations(),
        fetchCurrentUser(),
      ]);
      setVacations(vacData);
      onUserUpdate(userData);
    } catch (err) {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  }, [onUserUpdate]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Vacation Manager</h1>
        <div className="user-info">
          <span>
            Welcome, <strong>{user.username}</strong>
          </span>
          <span className="remaining-days">
            Remaining days: <strong>{user.remainingVacationDays}</strong>
          </span>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <section className="dashboard-content">
        <VacationForm onCreated={refresh} />
        <VacationList
          vacations={vacations}
          loading={loading}
          onDeleted={refresh}
        />
      </section>
    </div>
  );
}

export default Dashboard;
