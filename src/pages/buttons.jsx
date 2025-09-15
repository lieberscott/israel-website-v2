import { useState, useEffect } from "react";
import "../styles/styles.css";


const buttons = [
  { category: "Skip" },
  { category: "NoGazanIsInnocent" },
  { category: "alAlhiHospitalBombing" },
  { category: "alShifaHospital"},
  { category: "americanFundedViolence" },
  { category: "antiIsraelJewsCounterarguments" },
  { category: "antiIsraelProtestorTruthBombs" },
  { category: "antiIsraelTwitterLies" },
  { category: "antiSemitism" },
  { category: "antiSemitismInversion" },
  { category: "apartheid" },
  { category: "blamingIsraelLies" },
  { category: "ceasefireGame" },
  { category: "colonizersLie" },
  { category: "campusProtests" },
  { category: "cryBullies" },
  { category: "counteringAntiIsraelCliches" },
  { category: "dayAfterProtests" },
  { category: "deathTollLie" },
  { category: "deadBabiesHypocrisy" },
  { category: "defendingIsrael" },
  { category: "ethnicCleansingInversion" },
  { category: "everythingIsAnIsraeliLie" },
  { category: "gallowsHumor" },
  { category: "gazanDoctorsAndJournalists" },
  { category: "gazaSickCultureOfHate" },
  { category: "gazaTeachesKidsHateAndViolence"},
  { category: "genocideCliche" },
  { category: "hamasInTheirOwnWordsAndHamasEvil" },
  { category: "hamasLies" },
  { category: "hamasWarCrimes" },
  { category: "harvestingOrgansLibel"},
  { category: "heroicStories" },
  { category: "hideFacesLikeKlan" },
  { category: "historyOfConflict" },
  { category: "hostageStories" },
  { category: "houthis" },
  { category: "internationalLaw" },
  { category: "iransRole" },
  { category: "israelAndJewsAreAlone" },
  { category: "israelInversionStrategy" },
  { category: "israelSupporters" },
  { category: "israelTriedforPeace" },
  { category: "israelVsDEI" },
  { category: "israeliFallenSoldiersStories" },
  { category: "israeliMilitaryMorality" },
  { category: "israeliMilitaryVictories" },
  { category: "israeliSpirit" },
  { category: "israelsImpossibleSituationAndDoubleStandards" },
  { category: "itsNotAboutIsraeliMistreatment"},
  { category: "mediaBias" },
  { category: "movingProIsraelSpeeches" },
  { category: "muslimViolence" },
  { category: "muslimsAgainstHamas" },
  { category: "muslimsTaughtToHateJews" },
  { category: "newJewishLeaders" },
  { category: "noMoralEquivalence"},
  { category: "noPalestinianState" },
  { category: "novaInversion" },
  { category: "oct7fallen" },
  { category: "oct7testimonies" },
  { category: "oneStateSolutionGame" },
  { category: "openAirPrison" },
  { category: "outrageousAccusations" },
  { category: "palestineWasARealPlaceLie" },
  { category: "palestiniansOnlyHaveThemselvesToBlame" },
  { category: "palestiniansWelcomedJewsLie"},
  { category: "proIsraelProZionism" },
  { category: "proPalestineViolenceIntimidation" },
  { category: "proPalestineHypocrisy" },
  { category: "proPalestineLies" },
  { category: "qHamas" },
  { category: "realTimeHolocaustDenial" },
  { category: "rhetoricalGames" },
  { category: "stupidProtestors" },
  { category: "survivorsStories" },
  { category: "tearingDownPosters" },
  { category: "theNewNazis" },
  { category: "theWestHasFallen" },
  { category: "theWestOnlyPerpetuatingTheViolence" },
  { category: "theyreFullOfHate" },
  { category: "unapologeticallyProIsrael" },
  { category: "unitedNationsJournalistsNGOs" },
  { category: "unrwa"},
  { category: "whyTheLeftHatesIsrael" },
  { category: "xNonIsrael" }
];


export default function Buttons(props) {
  
  const { created_at } = props;
    
  const { likes, commentCount, linkToTweet } = props;

  
  const handleClick = async (e) => {
    
    console.log("handleClick");
    
    const url = "http://localhost:3000/categorize";
    const url2 = "https://get-liked-tweets-json-part-1.glitch.me/categorize";
    
    const response = await fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tweetData: props.tweetData, category: e.target.id, pageNum: props.pageNum})
    });
    
    const json = await response.json();
    
    if (json.ok) {
      console.log("OK!");
      props.setIndex(prev => prev - 1);
    }
    // props.setIndex(prev => prev + 1);
    
  }

  
  
  return (
    <div className="categorizeButtonsDiv">
      { buttons.map((item, i, arr) => {
        return (
          <button id={item.category} key={ item.category} onClick={(e) => handleClick(e)}>{ item.category }</button>
        )
      })}
    </div>
  );
}
