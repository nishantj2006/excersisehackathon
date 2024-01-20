import axios from "axios";
import { useNavigate } from "react-router-dom";
import OPENAI_API_KEY from "../openai";
import { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { db, auth, firestore } from "../firebase-config";

function Dashboard() {
  const userInfoRef = collection(db, "UserProperties")
  const [userData, setUserData] = useState(null);

  //Timeline
  const timeline = () => {
    //Draw plan from database
  }

  //meal ideas
  const mealIdeas = () => {
    //First let use select what grain, protein etc etc they are feeling
    //Using that data, prompt gpt to provide meal ideas and format it in a way that we can parse through it
  }

  //logMeals
  const logMeals = () => {
    navigate('/logmeal')
  }

  const [response, setResponse] = useState('');
  useEffect(() => {
    //Start of data retrival 
    const getData = async () => {
      const userId = auth.currentUser.uid;
      const docRef = collection(db, 'UserProperties');
      const q = query(docRef, where("uuid" , "==", userId))
      const snap = await getDocs(q);
      //userInfoRef.doc.map((doc) => ({ ...doc.data(), id: doc.id }))
      setUserData(snap)
      console.log(snap);
    }
    getData();
    const fetchData = async () => {
      {}
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: 'Hi, my gender is: ' + userData.gender + " my height is " + userData.height + " my current weight is " + 
            userData.weight + ".I would describe myself as " + userData.active +". My dietary restrctions are: "+ userData.diet + " and my underlying diseases are: " +userData.disease 
            + ". I want to get to " + userData.targetWeight + " witin " + userData.targetTime + " please generate me a dietary plan that includes maximum calories I can comsume for " +
            "breakfast, lunch, and dinner and also pitch around 10 meal ideas per day for breakfast, lunch, and dinner, " + 
            "Please format it like this: Day#,Breakfast Calories-Breakfast Ideas,Lunch Calories-Lunch Ideas,Dinner Calories-Dinner Ideas", 
            max_tokens: 1000,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );
        setResponse(response.data.choices[0].text);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  console.log(response);
  let navigate = useNavigate();
  return (
    <div className="Dashboard">
      <div className="timeline">
        {/*Timeline jsx goes here*/}
      </div>
      <div className="mealIdeas">
        {/* JSX for meal ideas in the following order: */}
      </div>
      <div className="logMeals">
        <button onClick={logMeals}>Log Meals</button>
      </div>
    </div>
  );
}

export default Dashboard;