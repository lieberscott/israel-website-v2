import { useState, useEffect } from "react";
import "../styles/styles.css";


export default function TweetsImages(props) {
        
  const [image0, setImage0] = useState("");
  const [image1, setImage1] = useState("");
  
  
  useEffect(() => {
    if (props.image_urls.length > 0) {
      setImage0(props.image_urls[0].url);
    }
    
    if (props.image_urls.length > 1) {
      setImage1(props.image_urls[1].url);
    }
  }, []);
  
    
  
  return (
    <div className="tweetsImages" key={image0}>
      { props.image_urls.length > 1 ? <div className="imagesWrapper">
        <img className="image0" src={image0} />
        <img className="image1" src={image1} />
      </div> :
      <div className="imagesWrapper">
        <img className="singleImage" src={image0} />
      </div>
      }
      { props.note_url ? <div className="imagesWrapper">
        <img src={props.note_url} />
      </div> : [] }
    </div>

  );
}
