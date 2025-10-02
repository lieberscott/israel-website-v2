// import * as fetch from "node-fetch";
import { serverUrl } from "./serverConstants";


/**
  * @summary fetch the 20 debates with the most recent "message" added
  * @param {string} authToken identifier for user
  * @param {date} furthestBackDate furthest back search should go
  * @param {date} mostRecentDate most recent time debate should go
  * @param {boolean} onlyFeatured get only featured debates, or get entire feed
  * @param {number} limit optional, used to get just 1 debate when interacting with notification
*/
export const fetchDate = async (date) => {
  const url = `${serverUrl}/fetch_date`;
  try {
    const responseData = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ date })
    });

    let json = await responseData.json();

    return json;

  } catch (error) {
    return { errors: [error] };
  }
};