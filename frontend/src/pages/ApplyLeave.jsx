import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveForm from '../components/LeaveForm';
import { createLeave } from '../services/leaveService';

function ApplyLeave() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleFormSubmit = async (formData) => {
        setServerError('');
        setSubmitting(true);

        try {
            await createLeave(formData);
            // Navigate back to dashboard on success
            navigate('/dashboard');
        } catch (err) {
            setServerError(err.message || 'Failed to apply leave');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Apply for Leave</h2>
                <p style={styles.subtitle}>Fill in the details below to submit your leave request</p>

                {serverError && <div style={styles.errorAlert}>{serverError}</div>}

                <LeaveForm
                    onSubmit={handleFormSubmit}
                    submitButtonText="Submit Leave Application"
                    isSubmitting={submitting}
                />
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
    title: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#111827',
        margin: '0 0 6px 0'
    },
    subtitle: {
        fontSize: '14px',
        color: '#6b7280',
        margin: '0 0 24px 0'
    },
    errorAlert: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        padding: '12px 16px',
        borderRadius: '6px',
        marginBottom: '18px'
    }
};

export default ApplyLeave;
