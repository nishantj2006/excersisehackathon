import axios from "axios";
import { useNavigate } from "react-router-dom";
import OPENAI_API_KEY from "../openai";
import { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { db, auth, firestore } from "../firebase-config";

function Dashboard() {
  const userInfoRef = collection(db, "UserProperties")
  const [UserData, setUserData] = useState(null);

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
  /*useEffect(() => {
    const getData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const docRef = collection(db, 'UserProperties');
        const q = query(docRef, where("uuid", "==", userId.toString()));
        const snap = await getDocs(q);

        // Update state with user data
        const userDataArray = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        // setUserData(()=>{return userDataArray});

        console.log(userDataArray);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getData();
  }, []); // Run only once on component mount*/
  useEffect(() => {
    const fetchData = async () => {
      //Start of data retrival 
      const getData = async () => {
        const userId = auth.currentUser.uid;
        const docRef = collection(db, 'UserProperties');
        const q = query(docRef, where("uuid", "==", userId.toString()))
        const snap = await getDocs(q);

        // Update state with user data
        const userDataArray = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserData(userDataArray);
        const data = userDataArray
        console.log(userDataArray); // This will log the correct data
        console.log(data[0].gender)
        await getData();
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: `Hi, my gender is: ${data[0].gender} my height is ${data[0].height} my current weight is ` +
              `${data[0].weight}. I would describe myself as ${data[0].active}. My dietary restrictions are: ` +
              `${data[0].diet} and my underlying diseases are: ${data[0].disease}. I want to get to ` +
              `${data[0].targetWeight} within ${data[0].targetTime} please generate me a dietary plan that includes ` +
              `maximum calories I can consume for breakfast, lunch, and dinner and also pitch around 10 meal ideas per day for breakfast, ` +
              `lunch, and dinner. Please format it like this: Day#,Breakfast Calories-Breakfast Ideas,Lunch Calories-Lunch Ideas,Dinner ` +
              `Calories-Dinner Ideas`,
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
      }
      await getData()
    };
  }, []);
  console.log(response);
  console.log(UserData);
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