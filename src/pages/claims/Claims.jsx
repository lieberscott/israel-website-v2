import React, { useState } from "react";
import "../../styles/claimsStyles.css"; // import the CSS file
import { claims, keywords } from "../../../constants.js";

export default function Claims({ onClaimSelect }) {
  const [selectedClaim, setSelectedClaim] = useState({});

  const handleSelect = (claim) => {
    if (selectedClaim._id !== claim._id) {
      setSelectedClaim(claim);
      onClaimSelect(claim._id);
    }
  };

  const handleRemove = () => {
    const newSelected = {};
    setSelectedClaim(newSelected);
    onClaimSelect("");
  };

  return (
    <div className="claim-container">
      <div className="claims-list">
        {claims.map((claim, index) => (
          <button
            key={index}
            onClick={() => handleSelect(claim)}
            className={`claim-button ${
              selectedClaim._id === claim._id ? "active" : ""
            }`}
          >
            {claim.claimShortText ? claim.claimShortText : claim.keyword }
          </button>
        ))}
      </div>

      {Object.keys(selectedClaim).length > 0 && (
        <div className="selected-claims-box">
          <div className="claim-bubble">
            {selectedClaim.claimShortText}
            <span className="remove-btn" onClick={() => handleRemove()}>
              ✕
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
