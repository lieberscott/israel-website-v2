import { useEffect, useState } from "react";
import "../../styles/styles.css";

export default function ExampleText(props) {

  const { example, explanation } = props;
  
  
  return (
    <div className="textWhite">
      <p>Example: {example}</p>
      <p>Explanation: {explanation}</p>
    </div>
  )
}