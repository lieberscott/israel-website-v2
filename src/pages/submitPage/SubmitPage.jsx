import React, { useState } from "react";
import Preview from "./Preview.jsx"; // reuse your existing component for preview
import "../../styles/submitStyles.css";
import { claims, keywords } from "../../../constants.js";
import { submitExample } from "../../../api/api.js";


function SubmitPage() {
  const [claim, setClaim] = useState(claims[0].claimShortText || "");
  const [claimId, setClaimId] = useState(claims[0]._id);
  const [explanation, setExplanation] = useState("");
  const [themTweets, setThemTweets] = useState("");
  const [usTweets, setUsTweets] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const formatTweets = (str) =>
    str
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
      .map((id) => ({ id }));

  const previewData = {
    claim: claim,
    explanation,
    them: formatTweets(themTweets),
    us: formatTweets(usTweets),
  };

  // User submissions
  const handleSubmit = async () => {
    const submitUsTweets = formatTweets(usTweets);
    const submitThemTweets = formatTweets(themTweets);
    try {
      console.log("Submitting:", { claimId, claim, explanation, submitThemTweets, submitUsTweets });

      // simulate success
      const responseData = await submitExample(claimId, claim, explanation, submitThemTweets, submitUsTweets);
      if (responseData.error) {
        console.log("error : ", e);
        setStatusMessage("❌ There was a problem submitting. Please try again.");
      }
      else {
        setStatusMessage("✅ Success! Your submission has been received.");
      }
    } catch (e) {
      console.log("error : ", e);
      setStatusMessage("❌ There was a problem submitting. Please try again.");
    }
  };

  return (
    <div className="submit-page">
      <h3>Submit Your Example</h3>

      {/* Claim */}
      <div className="form-line">
        <label>Select a Claim:</label>
        <select
          value={claimId}
          onChange={(e) => {
            const selectedClaim = claims.find((c) => c._id === e.target.value);
            if (selectedClaim) {
              setClaim(selectedClaim.claimText);
              setClaimId(selectedClaim._id);
            } else {
              setClaim("");
              setClaimId("newClaimId");
            }
          }}
        >
          {claims.map((c) => (
            <option key={c._id} value={c._id}>
              {c.claimShortText}
            </option>
          ))}
          <option value="newClaimId">➕ Add a new claim</option>
        </select>

        {claimId === "newClaimId" && (
          <input
            type="text"
            placeholder="Enter new claim..."
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
          />
        )}
      </div>
      {/* Explanation */}
      <div className="form-line">
        <label>Explanation:</label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows="3"
          placeholder="Write an explanation of exactly what the Tweets below are saying and how they are an example of the claim above."
        />
      </div>

      {/* Them Tweets */}
      <div className="form-line">
        <label>Them Tweet IDs (comma-separated):</label>
        <input
          type="text"
          value={themTweets}
          onChange={(e) => setThemTweets(e.target.value)}
          placeholder="1234567890, 2345678901"
        />
      </div>

      {/* Us Tweets */}
      <div className="form-line">
        <label>Us Tweet IDs (comma-separated):</label>
        <input
          type="text"
          value={usTweets}
          onChange={(e) => setUsTweets(e.target.value)}
          placeholder="9876543210, 8765432109"
        />
      </div>

      <img
        src="./images/tweetid.png"
        alt="Where to find TweetIds"
        className="form-image"
      />

      {/* Live Preview */}
      <div className="preview">
        <h2>Live Preview</h2>
        <Preview data={previewData} />
      </div>

      {/* Submit */}
      <div className="form-actions">
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {statusMessage && <p className="status">{statusMessage}</p>}

    </div>
  );
}

export default SubmitPage;