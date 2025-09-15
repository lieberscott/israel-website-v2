import { useEffect, useState } from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link, useLocation } from "wouter";
import Grid from '@mui/material/Unstable_Grid2'

import CategoryHomepage from "./categoryHomepage.jsx";
import Carousel from "./carousel.jsx";
import CarouselArrow from "./carouselArrow.jsx";

import "../styles/styles.css";


const imagesArr2 = [
  { categoryName: "defendingIsrael", xs: 8 },
  { categoryName: "hamasEvil", xs: 4 },
  { categoryName: "oct7survivorsAndHostages", xs: 4 },
  { categoryName: "rhetoricalGames", xs: 8 }
]



const imagesArr = [
  { xs: 6, category: "hostages", name: "Hostage Stories", subcategories: ["hostageStories"] },
  { xs: 6, category: "oct7", name: "Oct. 7 testimonies", subcategories: ["oct7fallen", "oct7testimonies", "heroicStories"]},
  { xs: 8, category: "fallen_soldiers", name: "Fallen soldiers", subcategories: ["israeliFallenSoldiersStories"]},
  { xs: 4, category: "hamas_evil", name: "Hamas Evil", subcategories: ["gazaSickCultureOfHate", "gazaTeachesKidsHateAndViolence", "hamasInTheirOwnWordsAndHamasEvil", "hamasWarCrimes", "houthis", "noGazanIsInnocent", "noPalestinianState", "palestiniansOnlyHaveThemselvesToBlame", "hamasLies", "hideFacesLikeKlan", "proPalestineSupportsViolenceAndHamas", "proPalestineViolenceIntimidation", "stupidProtestors", "tearingDownPosters", "antiSemitism", "dayAfterProtests", "theNewNazis", "theyreFullOfHate", "harvestingOrgansLibel", "oneStateSolutionGame"] },
  // { xs: 7, category: "pro_palestine_lies", subcategories: ["antiIsraelTwitterLies", "itsNotAboutIsraeliMistreatment", "palestineWasARealPlaceLie", "palestiniansWelcomedJewsLie", "proPalestineLies", "apartheid", "colonizersLie", "counteringAntiIsraelCliches", "ethnicCleansingInversion", "genocideCliche", "israelInversionStrategy", "antiIsraelJewsCounterarguments", "alAlhiHospitalBombing", "alShifaHospital", "blamingIsraelLies", "deathTollLie", "gazanDoctorsAndJournalists", "internationalLaw"]},
  // { xs: 5, category: "moving_pro_israel_speeches", subcategories: ["movingProIsraelSpeeches"]}

]

export default function Home() {
  
  
  useEffect(() => {
    (async() => {
      const data = await fetch(`/api`);
      const json = await data.json();
      
      console.log("json : ", json);
    })()
  }, [])


  return (
    <div className="homepageWrapper">
      <div className="textWhite">This site is meant to provide an easy place for people to learn about the current conflict.</div>
      <div className="gridWrapper">
      <Grid container spacing={2}>
        
        { imagesArr.map((item, i) => {
          return (
            <Link key={item.category} href={`/category/${item.category}`}>
              <Grid position="relative" borderRadius={6} overflow="hidden" height={250} xs={item.xs}>
                <CategoryHomepage category={ item.category } name={ item.name } />
              </Grid>
            </Link>
          )
        })}
        
      </Grid>
    </div>
    </div>
  );
}
