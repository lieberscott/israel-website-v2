import React, { useState, useEffect } from "react";
import { Router, Link } from "wouter";

/**
* This code defines the react app
*
* Imports the router functionality to provide page navigation
* Defines the Home function outlining the content on each page
* Content specific to each page (Home and About) is defined in their components in /pages
* Each page content is presented inside the overall structure defined here
* The router attaches the page components to their paths
*/

// Import and apply CSS stylesheet
import "./styles/styles.css";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";

// Home function that is reflected across the site
export default function Home() {
  return (
    <Router>
      <main role="main" className="wrapper">
        <div className="links">
          <Link href="/"><div className="linksText">Home</div></Link>
          <span className="divider">|</span>
          <Link href="/category/hostages"><div className="linksText">Hostages</div></Link>
          <span className="divider">|</span>
          <Link href="/category/oct7"><div className="linksText">Oct. 7</div></Link>
          <span className="divider">|</span>
          <Link href="/category/fallen_soldier"><div className="linksText">Fallen Soldiers</div></Link>
          <span className="divider">|</span>
          <Link href="/category/hamas_evil"><div className="linksText">Hamas Evil</div></Link>
        </div>
        <div className="content">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </div>
      </main>
    </Router>
  );
}