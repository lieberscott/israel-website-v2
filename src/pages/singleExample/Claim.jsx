import { useEffect, useState } from "react";
import "../../styles/styles.css";

export default function Claim(props) {

  const { claim } = props;
  
  
  return (
    <div className="textWhite">
      <p>Claim: {claim}</p>
    </div>
  )
}