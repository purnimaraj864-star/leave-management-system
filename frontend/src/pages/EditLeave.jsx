import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LeaveForm from '../components/LeaveForm';
import { getLeaveById, updateLeave } from '../services/leaveService';

function EditLeave() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [leaveData, setLeaveData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                setLoading(true);
                const data = await getLeaveById(id);

                if (data.status !== 'Pending') {
                    setServerError('Only pending leaves can be edited.');
                }
                setLeaveData(data);
            } catch (err) {
                setServerError(err.message || 'Failed to fetch leave details');
            } finally {
                setLoading(false);
            }
        };

        fetchLeave();
    }, [id]);

    const handleFormSubmit = async (formData) => {
        setServerError('');
        setSubmitting(true);

        try {
            await updateLeave(id, formData);
            navigate('/dashboard');
        } catch (err) {
            setServerError(err.message || 'Failed to update leave');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading leave details...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Edit Leave Application</h2>
                    <Link to="/dashboard" style={styles.backLink}>
                        ← Back to Dashboard
                    </Link>
                </div>

                {serverError && <div style={styles.errorAlert}>{serverError}</div>}

                {leaveData && leaveData.status === 'Pending' ? (
                    <LeaveForm
                        initialData={leaveData}
                        onSubmit={handleFormSubmit}
                        submitButtonText="Update Application"
                        isSubmitting={submitting}
                    />
                ) : (
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ color: '#6b7280' }}>This leave cannot be edited because it is no longer Pending.</p>
                        <Link to="/dashboard" style={styles.actionBtn}>
                            Return to Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '650px',
        margin: '40px auto',
        padding: '0 20px'
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        padding: '30px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    title: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#111827',
        margin: 0
    },
    backLink: {
        color: '#2563eb',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500'
    },
    errorAlert: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        padding: '12px 16px',
        borderRadius: '6px',
        marginBottom: '18px'
    },
    actionBtn: {
        display: 'inline-block',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        marginTop: '10px'
    }
};

export default EditLeave;
