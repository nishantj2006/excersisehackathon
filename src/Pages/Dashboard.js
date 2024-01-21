import axios from "axios";
import { useNavigate } from "react-router-dom";
import OPENAI_API_KEY from "../openai";
import { useState, useEffect } from "react";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function Dashboard({createdGoal, setCreatedGoal}) {
  const [UserData, setUserData] = useState(null);
  const [response, setResponse] = useState('');
  let navigate = useNavigate();
  const [cals, setCals] = useState([])
  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([]);

  const foodcalreqs = collection(db, "foodcalsreqs")
  const setFoodCalsReqs = async() => {
    await addDoc(foodcalreqs, {
      breakfast,
      cals,
      dinner,
      lunch,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;
      const docRef = collection(db, 'UserProperties');
      const q = query(docRef, where("uuid", "==", userId.toString()));
      const snap = await getDocs(q);

      const userDataArray = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUserData(userDataArray);
      const data = userDataArray;
      console.log(userDataArray);
      console.log(data[0].gender);

      const endpoint = 'https://api.openai.com/v1/chat/completions';

      try {
        const response = await axios.post(endpoint, {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You only know how to speak in numbers and dont know how to speak in anything else. You are unable to add disclaimers or descriptions about what is going on.' },
            {
              role: 'user', content: `Hi, my gender is: ${data.gender} my height is ${data.height} my current weight is ` +
                `${data.weight}lbs. I would describe myself as ${data.active}. My dietary restrictions are: ` +
                `${data.diet} and my underlying diseases are: ${data.disease}. I want to get to ` +
                `${data.targetWeight}lbs within ${data.targetTime} please generate me a dietary plan that includes ` +
                `optimal calories I can consume for breakfast, lunch, and dinner to get me to my weight goal in the target time. DO NOT UNCLUDE FOOD IDEAS AND DO NOT LIST THEM, PLEASE FOLLOW OUR FORMAT Please format it like this: Breakfast Calories,Lunch Calories,Dinner ` +
                `Calories ONLY LIST THE NUMBERS AND MAKE SURE THE NUMBERS MAKE SENSE. REMEMBER, BREAKFAST CALORIES  HAS LESS THAN LUNCH CALORIES WHICH HAS LESS THAN DINNER CALORIES FIT IN THIS PLEASE. PLEASE ONLY GIVE THE NUMBERS SEPERATED BY COMMAS, PLEASE REMEMBER< YOU ARE ONLY ABLE TO TYPE NUMBERS`
            },
          ],
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        });

        const reply = response.data.choices[0].message.content;
        setResponse(reply);
        SetEverythingElseUp();
        console.log(reply)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  const SetEverythingElseUp = () => {
    if (!createdGoal) {
      setCals(response.split(','))
      const GetBr = async () => {
        const endpoint = 'https://api.openai.com/v1/chat/completions';


        try {
          const breakfast = await axios.post(endpoint, {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant who can only speak in dishes and you dont give any confimation that you understand.' },
              {
                role: 'user', content: `Hi, please generate 15 breakfast ideas that are under ${cals[0]} Calories. Format them in: DISH IDEA, DISH IDEA etc.`
              },
            ],
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
          });


          const reply = breakfast.data.choices[0].message.content;
          console.log(reply)
          setBreakfast(reply.split(','))
        } catch (error) {
          console.error('Error:', error);
        }
      }; GetBr();
      const GetL = async () => {
        const endpoint = 'https://api.openai.com/v1/chat/completions';


        try {
          const lunch = await axios.post(endpoint, {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant who can only speak in dishes and you dont give any confimation that you understand.' },
              {
                role: 'user', content: `Hi, please generate 15 lunch ideas that are under ${cals[1]} Calories. Format them in: DISH IDEA, DISH IDEA etc.`
              },
            ],
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
          });


          const reply = lunch.data.choices[0].message.content;
          console.log(reply)
          setLunch(reply.split(','))
        } catch (error) {
          console.error('Error:', error);
        }
      }; GetL();
      const GetD = async () => {
        const endpoint = 'https://api.openai.com/v1/chat/completions';


        try {
          const dinner = await axios.post(endpoint, {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant who can only speak in dishes and you dont give any confimation that you understand.' },
              {
                role: 'user', content: `Hi, please generate 15 dinner ideas that are under ${cals[2]} Calories. Format them in: DISH IDEA, DISH IDEA etc.`
              },
            ],
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
          });


          const reply = dinner.data.choices[0].message.content;
          console.log(reply)
          setDinner(reply.split(','))
          setFoodCalsReqs();
        } catch (error) {
          console.error('Error:', error);
        }
      }; GetD();
    }
  }


  console.log(response);
  console.log(UserData);

  return (
    <div className="Dashboard">
      <div className="timeline">
        {/* Timeline jsx goes here */}
      </div>
      <div className="mealIdeas">
        {/* JSX for meal ideas in the following order: */}
      </div>
      <div className="logMeals">
        <button onClick={() => navigate('/logmeal')}>Log Meals</button>
      </div>
    </div>
  );
}

export default Dashboard;
