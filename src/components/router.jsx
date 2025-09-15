import * as React from "react";
import { Switch, Route, Router } from "wouter";
import staticLocationHook from "wouter/static-location";



import PageMain from "../pages/singleExample/PageMain.jsx";
import Test from "../pages/singleExample/Test.jsx";
import ChatGPTpage from "../pages/singleExample/ChatGPTpage.jsx";
import TweetBody from "../pages/singleExample/TweetBody.jsx";


import Home from "../pages/home";
import Tweet from "../pages/tweet";
import TweetsHTML from "../pages/tweetsHTML";
import TweetMain from "../pages/tweetMainFetch";
import CategoryPage from "../pages/categoryPage";
import Carousel from "../pages/carousel.jsx";

/**
* The router is imported in app.jsx
*
* Our site just has two routes in it–Home and About
* Each one is defined as a component in /pages
* We use Switch to only render one route at a time https://github.com/molefrog/wouter#switch-
*/

export default () => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/tweet" component={Tweet} />
    <Route path="/tweetsHTML" component={TweetsHTML} />
    <Route path="/tweetMain" component={TweetMain} />
    <Route path="/category/:cat" component={TweetBody} />
    <Route path="/test" component={Test} />
  </Switch>
);
