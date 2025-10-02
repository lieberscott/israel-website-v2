import React, { useState } from "react";
import App from "../singleExample/MainPage.jsx"; // reuse your existing component for preview

// Example claims – you could also import from a data file
const claims = [
  "Claim 1: Example",
  "Claim 2: Something else",
  "Claim 3: Another one",
];

function SubmitPage() {
  const [claim, setClaim] = useState(claims[0]);
  const [explanation, setExplanation] = useState("");
  const [themTweets, setThemTweets] = useState("");
  const [usTweets, setUsTweets] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handlePreview = () => {
    const formatTweets = (str) =>
      str.split(",").map((id) => `https://twitter.com/i/web/status/${id.trim()}`);

    setPreviewData({
      them: formatTweets(themTweets),
      us: formatTweets(usTweets),
      explanation,
      claim,
    });
  };

  const handleSubmit = async () => {
    try {
      // Replace with your API call or storage logic
      console.log("Submitting:", { claim, explanation, themTweets, usTweets });

      // Simulate API success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatusMessage("✅ Success! Your submission has been received.");
    } catch (error) {
      setStatusMessage("❌ There was a problem submitting. Please try again.");
    }
  };

  return (
    <div className="submit-page">
      <h1>Submit Your Example</h1>

      {/* Step 1: Claim */}
      <div className="form-step">
        <img src="/images/step1.png" alt="Step 1 help" className="step-image" />
        <div className="step-content">
          <label>Select a Claim:</label>
          <select value={claim} onChange={(e) => setClaim(e.target.value)}>
            {claims.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 2: Explanation */}
      <div className="form-step">
        <img src="/images/step2.png" alt="Step 2 help" className="step-image" />
        <div className="step-content">
          <label>Explanation:</label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            rows="4"
            placeholder="Write a short explanation..."
          />
        </div>
      </div>

      {/* Step 3: Them Tweets */}
      <div className="form-step">
        <img src="/images/step3.png" alt="Step 3 help" className="step-image" />
        <div className="step-content">
          <label>Them Tweet IDs (comma-separated):</label>
          <input
            type="text"
            value={themTweets}
            onChange={(e) => setThemTweets(e.target.value)}
            placeholder="1234567890, 2345678901"
          />
        </div>
      </div>

      {/* Step 4: Us Tweets */}
      <div className="form-step">
        <img src="/images/step4.png" alt="Step 4 help" className="step-image" />
        <div className="step-content">
          <label>Us Tweet IDs (comma-separated):</label>
          <input
            type="text"
            value={usTweets}
            onChange={(e) => setUsTweets(e.target.value)}
            placeholder="9876543210, 8765432109"
          />
        </div>
      </div>

      {/* Preview and Submit */}
      <div className="form-actions">
        <button onClick={handlePreview}>Preview</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Status Message */}
      {statusMessage && <p className="status">{statusMessage}</p>}

      {/* Preview Area */}
      {previewData && (
        <div className="preview">
          <h2>Preview</h2>
          <App previewData={previewData} />
        </div>
      )}
    </div>
  );
}

export default SubmitPage;