import axios from "axios";
import { useNavigate } from "react-router-dom";
import OPENAI_API_KEY from "../openai";
import { useState, useEffect } from "react";

function Dashboard() {
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
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: '',
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