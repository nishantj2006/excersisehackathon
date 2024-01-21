import axios from "axios";
import { useNavigate } from "react-router-dom";
import OPENAI_API_KEY from "../openai";
import { useState, useEffect } from "react";
import React from "react";
import { getDoc, getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function Dashboard() {
  const [UserData, setUserData] = useState(null);
  const [response, setResponse] = useState('');
  const [FoodData, setFoodData] = useState(null);
  let navigate = useNavigate();
  let dayCounter1 = 1;
  let dayCounter2 = 2;
  let dayCounter3 = 3;
  let dayCounter4 = 4;
  let dayCounter5 = 5;
  let dayCounter6 = 6;
  let dayCounter7 = 7;
  const [dayNum, setDayNum] = useState('');
  const [cals, setCals] = useState([])
  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([]);
  const [wrote, setWrote] = useState(false);
  const foodcalreqs = collection(db, "foodcalsreqs")
  const submitBtn = () => {
    updateNums();
    this.forceUpdate();
  }
  const updateNums = () => {
    dayCounter1 += 7;
    dayCounter2 += 7;
    dayCounter3 += 7;
    dayCounter4 += 7;
    dayCounter5 += 7;
    dayCounter6 += 7;
    dayCounter7 += 7;
  }
  const [bPick, setBPick] = useState('')
  const [lPick, setLPick] = useState('')
  const [dPick, setDPick] = useState('')
  const [btnClicked, setBtnClicked] = useState(false);
  const rN = Math.round(Math.random(0,14))
  console.log(rN)
  const timelineBtn1 = () => {
    setDayNum('1');
    setBPick(breakfast[rN])
    setLPick(lunch[rN])
    setDPick(dinner[rN])
    setBtnClicked(true);
  }
  const timelineBtn2 = () => {
    setDayNum('2');
    setBPick(breakfast[rN])
    setLPick(lunch[rN])
    setDPick(dinner[rN])
    setBtnClicked(true);
  }
  const timelineBtn3 = () => {
    setDayNum('3');
    setBPick(breakfast[rN])
    setLPick(lunch[rN])
    setDPick(dinner[rN])
    setBtnClicked(true);
  }
  const timelineBtn4 = () => {
    setDayNum('4');
    setBPick(breakfast[rN])
    setLPick(lunch[rN])
    setDPick(dinner[rN])
    setBtnClicked(true);
  }
  const timelineBtn5 = () => {
    setDayNum('5');
    setBPick(breakfast[rN])
    setLPick(lunch[rN])
    setDPick(dinner[rN])
    setBtnClicked(true);
  }
  const timelineBtn6 = () => {
    setDayNum('6');
    setBPick(breakfast[rN])
    setLPick(lunch[rN])
    setDPick(dinner[rN])
    setBtnClicked(true);
  }
  const timelineBtn7 = () => {
    setDayNum('7');
    setBPick(breakfast[rN])
    setLPick(lunch[rN])
    setDPick(dinner[rN])
    setBtnClicked(true);
  }
  const setFoodCalsReqs = async () => {
    await addDoc(foodcalreqs, {
      breakfast,
      cals,
      dinner,
      lunch,
      uuid: auth.currentUser.uid,
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
              role: 'user', content: `Hi, my gender is: ${data[0].gender} my height is ${data[0].height} my current weight is ` +
                `${data[0].weight}lbs. I would describe myself as ${data[0].active}. My dietary restrictions are: ` +
                `${data[0].diet} and my underlying diseases are: ${data[0].disease}. I want to get to ` +
                `${data[0].targetWeight}lbs within ${data[0].targetTime} please generate me a dietary plan that includes ` +
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
        //if (!wrote) {
        SetEverythingElseUp();
        //}
        //else {
        // const foodRef = collection(db, 'foodcalsreqs')
        // const fq = query(foodRef, where("uuid", "==", userId.toString()))
        // const fSnap = await getDocs(fq)

        // const foodDataArray = fSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        // setFoodData(foodDataArray);
        // console.log(foodDataArray);
        // setCals(foodDataArray[0].cals)
        // setBreakfast(foodDataArray[0].breakfast)
        // setLunch(foodDataArray[0].lunch)
        // setDinner(foodDataArray[0].setDinner)

        //}
        console.log(reply)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  const SetEverythingElseUp = () => {
    const c = response.split(',')
    setCals(c)
    const GetBr = async () => {
      const endpoint = 'https://api.openai.com/v1/chat/completions';


      try {
        const breakfast = await axios.post(endpoint, {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant who can only speak in dishes and you dont give any confimation that you understand.' },
            {
              role: 'user', content: `Hi, please generate 15 breakfast ideas that are under ${cals[0]} Calories. Format them in: DISH IDEA, DISH IDEA etc.PLEASE REMEMBER THAT COMMAS GO BETWEEN WORDS NOT PERIODS`
            },
          ],
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        });


        const breply = breakfast.data.choices[0].message.content;
        setBreakfast(breply.split(','))
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
              role: 'user', content: `Hi, please generate 15 lunch ideas that are under ${cals[1]} Calories. Format them in: DISH IDEA, DISH IDEA etc. PLEASE REMEMBER THAT COMMAS GO BETWEEN WORDS NOT PERIODS`
            },
          ],
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        });


        const lreply = lunch.data.choices[0].message.content;
        setLunch(lreply.split(','))
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
              role: 'user', content: `Hi, please generate 15 dinner ideas that are under ${cals[2]} Calories. Format them in: DISH IDEA, DISH IDEA etc.PLEASE REMEMBER THAT COMMAS GO BETWEEN WORDS NOT PERIODS`
            },
          ],
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        });


        const dreply = dinner.data.choices[0].message.content;
        setDinner(dreply.split(','))
        setFoodCalsReqs();
      } catch (error) {
        console.error('Error:', error);
      }
    }; GetD();
    setWrote(true);

  }

  console.log(cals);
  console.log(breakfast)
  console.log(lunch)
  console.log(dinner)
  console.log(response);
  console.log(UserData);

  return (
    <div className="Dashboard">
      <div className="timeline">
        <button className="createGoalButton" onClick={timelineBtn1}>Day {dayCounter1}</button>
        <button className="createGoalButton" onClick={timelineBtn2}>Day {dayCounter2}</button>
        <button className="createGoalButton" onClick={timelineBtn3}>Day {dayCounter3}</button>
        <button className="createGoalButton" onClick={timelineBtn4}>Day {dayCounter4}</button>
        <button className="createGoalButton" onClick={timelineBtn5}>Day {dayCounter5}</button>
        <button className="createGoalButton" onClick={timelineBtn6}>Day {dayCounter6}</button>
        <button className="createGoalButton" onClick={timelineBtn7}>Day {dayCounter7}</button>
        <button className="createGoalButton" onClick={submitBtn}>Continue</button>
      </div>
      <div className="mealIdeas">
        {
          btnClicked ? (
            <>
              <h2 className="stuff">Day {dayNum}: </h2>
              <br />
              <h3 className="stuff">Breakfast: </h3>
              <h4 className="stuff">Try to keep within {cals[0]} Calories!</h4>
              <h4 className="stuff">Our recommended breakfast for today is {bPick}</h4>
              <br />
              <h3 className="stuff">Lunch: </h3>
              <h4 className="stuff">Try to keep within {cals[1]} Calories!</h4>
              <h4 className="stuff">Our recommended lunch for today is {lPick}</h4>
              <br />
              <h3 className="stuff">Dinner: </h3>
              <h4 className="stuff">Try to keep within {cals[2]} Calories!</h4>
              <h4 className="stuff">Our recommended dinner for today is {dPick}</h4>
            </>
          ) : (
            <br />
          )
        }
      </div>
    </div>
  );
}

export default Dashboard;
