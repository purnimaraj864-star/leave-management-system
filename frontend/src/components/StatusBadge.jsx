import React from 'react';

// Reusable status badge with clear color indicators
function StatusBadge({ status }) {
    let backgroundColor = '#e5e7eb';
    let textColor = '#374151';

    if (status === 'Approved') {
        backgroundColor = '#dcfce7';
        textColor = '#166534';
    } else if (status === 'Rejected') {
        backgroundColor = '#fee2e2';
        textColor = '#991b1b';
    } else if (status === 'Pending') {
        backgroundColor = '#fef3c7';
        textColor = '#92400e';
    }

    const badgeStyle = {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: backgroundColor,
        color: textColor,
        textTransform: 'capitalize'
    };

    return <span style={badgeStyle}>{status}</span>;
}

export default StatusBadge;
