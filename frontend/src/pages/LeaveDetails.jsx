import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLeaveById } from '../services/leaveService';
import { getCurrentUser } from '../services/authService';
import StatusBadge from '../components/StatusBadge';

function LeaveDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = getCurrentUser();

    const [leave, setLeave] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                setLoading(true);
                const data = await getLeaveById(id);
                setLeave(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch leave details');
            } finally {
                setLoading(false);
            }
        };

        fetchLeave();
    }, [id]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading leave details...</div>;
    }

    if (error) {
        return (
            <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
                <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '16px', borderRadius: '8px' }}>
                    {error}
                </div>
                <button
                    onClick={() => navigate(-1)}
                    style={{ marginTop: '16px', padding: '8px 16px', cursor: 'pointer' }}
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (!leave) return null;

    const backPath = user?.role === 'admin' ? '/admin' : '/dashboard';

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Leave Application Details</h2>
                    <Link to={backPath} style={styles.backLink}>
                        ← Back
                    </Link>
                </div>

                <div style={styles.detailsGrid}>
                    <div style={styles.item}>
                        <span style={styles.label}>Employee Name:</span>
                        <span style={styles.value}>{leave.employee?.name || 'N/A'}</span>
                    </div>

                    <div style={styles.item}>
                        <span style={styles.label}>Employee Email:</span>
                        <span style={styles.value}>{leave.employee?.email || 'N/A'}</span>
                    </div>

                    <div style={styles.item}>
                        <span style={styles.label}>Leave Type:</span>
                        <span style={styles.value}>{leave.leaveType}</span>
                    </div>

                    <div style={styles.item}>
                        <span style={styles.label}>Current Status:</span>
                        <div>
                            <StatusBadge status={leave.status} />
                        </div>
                    </div>

                    <div style={styles.item}>
                        <span style={styles.label}>From Date:</span>
                        <span style={styles.value}>
                            {new Date(leave.fromDate).toLocaleDateString()}
                        </span>
                    </div>

                    <div style={styles.item}>
                        <span style={styles.label}>To Date:</span>
                        <span style={styles.value}>
                            {new Date(leave.toDate).toLocaleDateString()}
                        </span>
                    </div>

                    <div style={styles.item}>
                        <span style={styles.label}>Date Applied:</span>
                        <span style={styles.value}>
                            {new Date(leave.createdAt).toLocaleString()}
                        </span>
                    </div>

                    <div style={styles.itemFull}>
                        <span style={styles.label}>Reason for Leave:</span>
                        <p style={styles.reasonText}>{leave.reason}</p>
                    </div>
                </div>

                <div style={styles.footer}>
                    {user?.role === 'user' && leave.status === 'Pending' && (
                        <Link to={`/leaves/${leave._id}/edit`} style={styles.editBtn}>
                            Edit Application
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '700px',
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
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '16px',
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
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    itemFull: {
        gridColumn: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginTop: '10px'
    },
    label: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#6b7280',
        textTransform: 'uppercase'
    },
    value: {
        fontSize: '15px',
        fontWeight: '500',
        color: '#1f2937'
    },
    reasonText: {
        fontSize: '15px',
        color: '#374151',
        backgroundColor: '#f9fafb',
        padding: '12px',
        borderRadius: '6px',
        margin: '6px 0 0 0',
        whiteSpace: 'pre-wrap',
        border: '1px solid #e5e7eb'
    },
    footer: {
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    editBtn: {
        backgroundColor: '#d97706',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500'
    }
};

export default LeaveDetails;
