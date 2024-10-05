import React from "react";
import "./common/TokenData.css"; 

const TokenData = ({ tokenData, onClose }) => {
  if (!tokenData) return null;

  return (
    <div className="token-data-overlay">
      <div className="token-data-container">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="token-data-content">
          <div className="token-logo-section">
            <img src={`https://assets.thetatoken.org/tokens/${tokenData.logo}`} alt={tokenData.symbol} className="token-logo" />
            <div className="token-symbol">{tokenData.symbol}</div>
          </div>

          <div className="token-details-section">
            <p><strong>Contract Address:</strong> {tokenData.id}</p>
            <p><strong>Decimals:</strong> 18</p>
            <p><strong>Holders:</strong> {tokenData.txCount}</p>
            <p><strong>Total Supply:</strong> {tokenData.totalLiquidity}</p>
            <p><strong>Total Transfers:</strong> {tokenData.tradeVolume}</p>
            <p><strong>Token Type:</strong> TNT-20</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenData;
