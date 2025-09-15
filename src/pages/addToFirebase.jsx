import { useEffect, useState } from "react";
import "../styles/styles.css";
import firebase from "firebase/app";
import { collection, addDoc } from "firebase/firestore"; 


import TweetsThread from "./tweetsThread.jsx";
import TweetsHTML from "./tweetsHTML.jsx";
import Buttons from "./buttons.jsx";
import TweetMainData from "./tweetMainData.jsx";

export default function TweetMainFetch(props) {
  
  const imagesArr2 = [
    { categoryName: "defendingIsrael", xs: 8 },
    { categoryName: "hamasEvil", xs: 4 },
    { categoryName: "oct7survivorsAndHostages", xs: 4 },
    { categoryName: "rhetoricalGames", xs: 8 }
  ];
  
  console.log("props : ", props);
  
  const profileImg = "https://pbs.twimg.com/profile_images/1701963051426103299/A_nIla5__normal.jpg";
  const twitterCheck = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png";
  const xLogo = "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png";

  
  const [json, setJson] = useState([{}, {}, {}, {}, { image_urls: [], video: false, reply: false, thread: false }]);
  
  useEffect(() => {
    loadData();
  }, []);
  
  
  const loadData = async () => {
    const data = await fetch(`../tweets_by_category/hamasPureEvil.json`);
    const importedJson = await data.json();

    setJson(importedJson);
  }
    
    
  const addToFirebase = async () => {
    
    
    const db = firebase.firestore();
    json.forEach(obj => {
      db.collection('israel').add(obj)
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    });
  }
  
  
  return (
    <div className="tweetMainWrapper">
      <button onClick={addToFirebase}>Click to add to Firebase</button>
    </div>
  )
}


/*
    

*/