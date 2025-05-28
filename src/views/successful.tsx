import React from 'react';
// import './SuccessScreen.css';

const SuccessScreen = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">💳✅</div>
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">
          Thank you! Your payment has been processed successfully.
        </p>
        <button className="success-button" onClick={() => window.location.href = '/'}>
          Return to Shop
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
