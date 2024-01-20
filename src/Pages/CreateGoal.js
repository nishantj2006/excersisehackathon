import { useState } from "react";
import { auth, db } from "../firebase-config";
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import Profile from "../profile";

function CreateGoal() {
    const [otherSelectedD, setOtherSelectedD] = useState(false);

    const otherClickedD = () => {
        setOtherSelectedD(true);
    }

    const [otherSelectedI, setOtherSelectedI] = useState(false);

    const otherClickedI = () => {
        setOtherSelectedI(true);
    }

    const [otherSelectedG, setOtherSelectedG] = useState(false);

    const otherClickedG = () => {
        setOtherSelectedG(true);
    }

    const [otherSelectedF, setOtherSelectedF] = useState(false);

    const otherClickedF = () => {
        setOtherSelectedF(true);
    }
    let navigate = useNavigate();
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [Active, setActive] = useState("");
    const [diet, setDiet] = useState("");
    const [disease, setDisease] = useState("");
    const [goal, setGoal] = useState("");
    const [targetWeight, setTargetWeight] = useState("");
    const [targetTime, setTargetTime] = useState("");
    const userInfoRef = collection(db, "UserProperties")
    const setUserData = async () => {
        await addDoc(userInfoRef, {
            gender,
            age,
            height,
            weight,
            Active,
            diet,
            disease,
            goal,
            targetWeight,
            targetTime,
            uuid: auth.currentUser.uid,
            
        });
        navigate('/dashboard')
    }

    return (
        <div className="createGoal">
            <div className="cgContainer">
                <h1>Create Your Goal</h1>
                <div className="inputGp">
                    <label>Gender</label>
                    <button  className={`createGoalButton ${gender === 'Male' ? 'highlighted' : ''}`}
            onClick={() => setGender('Male')}>Male</button>
                    <button  className="createGoalButton" onClick={() => setGender("Female")}>Female</button>
                    <button  className="createGoalButton" onClick={() => setGender("Other")}>Other</button>
                </div>
                <div className="inputGp">
                    <label>Age: </label>
                    <input placeholder="Current Age..." onChange={(event) => { setAge(event.target.value) }} />
                </div>
                <div className="inputGp">
                    <label>Height: </label>
                    <input placeholder="Height..." onChange={(event) => { setHeight(event.target.value) }} />
                </div>
                <div className="inputGp">
                    <label>Weight:</label>
                    <input placeholder="Weight..." onChange={(event) => { setWeight(event.target.value) }} />
                </div>
                <div className="inputGp">
                    <label>Target Weight:</label>
                    <input placeholder="Weight..." onChange={(event) => { setTargetWeight(event.target.value) }} />
                </div>
                <div className="inputGp">
                    <label>How Active Are You?:</label>
                    <button  className="createGoalButton" onClick={() => setActive("Very Active")}>Very Active</button>
                    <button  className="createGoalButton" onClick={() => setActive("Somewhat Active")}>Somewhat active</button>
                    <button  className="createGoalButton" onClick={() => setActive("Not Active")}>Not Active</button>
                </div>
                <div className="inputGp">
                    <label>Are you any of the following:</label>
                    <button  className="createGoalButton" onClick={() => setDiet("Vegan")}>Vegan</button>
                    <button  className="createGoalButton" onClick={() => setDiet("Vegetarian")}>Vegetarian</button>
                    <button  className="createGoalButton" onClick={() => setDiet("Pescitarian")}>Pescatarian</button>
                    <button  className="createGoalButton" onClick={otherClickedD}>Other</button>
                    {otherSelectedD ? (<input placeholder="Specific diet here..." onChange={(event) => { setDiet(event.target.value) }} />) : (<br />)}
                    <button  className="createGoalButton" onClick={() => setDiet("No Dietary Restrictions")}>None</button>
                </div>
                <div className="inputGp">
                    <label>Any Underlying Diseases?</label>
                    <button  className="createGoalButton" onClick={() => setDisease("High Blood Pressure")}>High Blood Pressure</button>
                    <button  className="createGoalButton" onClick={() => setDisease("High Cholestrol")}>High Cholestrol</button>
                    <button  className="createGoalButton" onClick={() => setDisease("Diabetes")}>Diabetes</button>
                    <button  className="createGoalButton" onClick={() => setDisease("Heart Disease")}>Heart Disease</button>
                    <button  className="createGoalButton" onClick={otherClickedI}>Other</button>
                    {otherSelectedI ? (<input placeholder="Specific disease here..." onChange={(event) => { setDisease(event.target.value) }} />) : (<br />)}
                    <button  className="createGoalButton" onClick={() => setDisease("No underlying diseases")}>None</button>
                </div>
                <div className="inputGp">
                    <label>What Time Do You Want to Reach this Weight by?</label>
                    <button className="createGoalButton"  onClick={() => setTargetTime("1-3 months")}>1-3 months</button>
                    <button  className="createGoalButton" onClick={() => setTargetTime("3-6 monts")}>3-6 months</button>
                    <button  className="createGoalButton" onClick={() => setTargetTime("6-12 months")}>6-12 months</button>
                    <button  className="createGoalButton" onClick={otherClickedF}>Other</button>
                    {otherSelectedF ? (<input placeholder="To have [insert your goal]..." onChange={(event) => { setTargetTime(event.target.value) }} />) : (<br />)}
                </div>
                <div className="inputGp">
                    <label>Give yourself a main goal</label>
                    <button className="createGoalButton"  onClick={() => setGoal("to be fit")}>To be Fit</button>
                    <button  className="createGoalButton" onClick={() => setGoal("to lost weight")}>To Lose Weight</button>
                    <button  className="createGoalButton" onClick={() => setGoal("to have a healthier lifestyle")}>To have a Healtheir Lifestyle</button>
                    <button  className="createGoalButton" onClick={otherClickedG}>Other</button>
                    {otherSelectedG ? (<input placeholder="To have [insert your goal]..." onChange={(event) => { setGoal(event.target.value) }} />) : (<br />)}
                </div>
                <button onClick={setUserData}>Submit</button>
            </div>
        </div>
    );
}

export default CreateGoal;