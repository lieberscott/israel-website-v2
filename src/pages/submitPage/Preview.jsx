import React from "react";

function Preview({ data }) {
  const { claim, explanation, them, us } = data;

  return (
    <div className="preview-container">
      <h4>Claim: {claim}</h4>
      <p className="preview-text">Explanation: {explanation}</p>

      <div className="preview-carousels">
        <div className="preview-column">
          <h4>Them</h4>
          {them.length === 0 ? (
            <p className="placeholder">No Tweets yet</p>
          ) : (
            them.map((url, i) => (
              <blockquote key={i} className="twitter-tweet">
                <a href={url}></a>
              </blockquote>
            ))
          )}
        </div>

        <div className="preview-column">
          <h4>Us</h4>
          {us.length === 0 ? (
            <p className="placeholder">No Tweets yet</p>
          ) : (
            us.map((url, i) => (
              <blockquote key={i} className="twitter-tweet">
                <a href={url}></a>
              </blockquote>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Preview;
