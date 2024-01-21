import { useState } from "react";
import { auth, db } from "../firebase-config";
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import Profile from "../profile";

function CreateGoal({createdGoal}) {
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
        createdGoal(true);
    }

    return (
        <div className="createGoal">
            <div className="cgContainer">
                <h1>Create Your Goal</h1>
                <div className="inputGp">
                    <label>Gender</label>
                    <button  className={`createGoalButton ${gender === 'Male' ? 'highlighted' : ''}`}
                    onClick={() => setGender('Male')}>Male</button>
                    <button  className={`createGoalButton ${gender === 'Female' ? 'highlighted' : ''}`}
                    onClick={() => setGender('Female')}>Female</button>
                    <button  className={`createGoalButton ${gender === 'Other' ? 'highlighted' : ''}`}
                     onClick={() => setGender('Other')}>Other</button>
                </div>
                <div className="inputGp">
                    <label>Age: </label>
                    <input className="inputBox" placeholder="Current Age..." onChange={(event) => { setAge(event.target.value) }} />
                </div>
                <div className="inputGp">
                    <label>Height: </label>
                    <input className="inputBox" placeholder="Height..." onChange={(event) => { setHeight(event.target.value) }} />
                </div>
                <div className="inputGp">
                    <label>Weight:</label>
                    <input className="inputBox" placeholder="Weight..." onChange={(event) => { setWeight(event.target.value) }} />
                </div>
                <div className="inputGp">
                    <label>Target Weight:</label>
                    <input className="inputBox" placeholder="Weight..." onChange={(event) => { setTargetWeight(event.target.value) }} />
                </div>
                <div className="inputGp">
                    <label>How Active Are You?:</label>
                    <button className={`createGoalButton ${Active === 'Very Active' ? 'highlighted' : ''}`} onClick={() => setActive("Very Active")}>Very Active</button>
                    <button className={`createGoalButton ${Active === 'Somewhat Active' ? 'highlighted' : ''}`} onClick={() => setActive("Somewhat Active")}>Somewhat active</button>
                    <button className={`createGoalButton ${Active === 'Not Active' ? 'highlighted' : ''}`} onClick={() => setActive("Not Active")}>Not Active</button>
                </div>
                <div className="inputGp">
                        <label>Are you any of the following:</label>
                    <button className={`createGoalButton ${diet === 'Vegan' ? 'highlighted' : ''}`} onClick={() => { setDiet("Vegan"); setOtherSelectedD(false); }}>
                        Vegan
                    </button>
                    <button className={`createGoalButton ${diet === 'Vegetarian' ? 'highlighted' : ''}`} onClick={() => { setDiet("Vegetarian"); setOtherSelectedD(false); }}>
                        Vegetarian
                    </button>
                    <button className={`createGoalButton ${diet === 'Pescatarian' ? 'highlighted' : ''}`} onClick={() => { setDiet("Pescatarian"); setOtherSelectedD(false); }}>
                        Pescatarian
                    </button>
                    <button
                        className={`createGoalButton ${otherSelectedD ? 'highlighted' : ''}`}
                        onClick={() => { setDiet("Other"); setOtherSelectedD(true); setOtherSelectedI(false); }}
                    >
                        Other
                    </button>
                    {otherSelectedD ? (<input placeholder="Specific diet here..." onChange={(event) => { setDiet(event.target.value) }} />) : (<br />)}
                    <button className={`createGoalButton ${diet === 'No Dietary Restrictions' ? 'highlighted' : ''}`} onClick={() => { setDiet("No Dietary Restrictions"); setOtherSelectedD(false); }}>
                        None
                    </button>
                </div>
                <div className="inputGp">
                    <label>Any Underlying Diseases?</label>
                    <button className={`createGoalButton ${disease === 'High Blood Pressure' ? 'highlighted' : ''}`} onClick={() => { setDisease("High Blood Pressure"); setOtherSelectedI(false); }}>
                        High Blood Pressure
                    </button>
                    <button className={`createGoalButton ${disease === 'High Cholesterol' ? 'highlighted' : ''}`} onClick={() => { setDisease("High Cholesterol"); setOtherSelectedI(false); }}>
                        High Cholesterol
                    </button>
                    <button className={`createGoalButton ${disease === 'Diabetes' ? 'highlighted' : ''}`} onClick={() => { setDisease("Diabetes"); setOtherSelectedI(false); }}>
                        Diabetes
                    </button>
                    <button className={`createGoalButton ${disease === 'Heart Disease' ? 'highlighted' : ''}`} onClick={() => { setDisease("Heart Disease"); setOtherSelectedI(false); }}>
                        Heart Disease
                    </button>
                    <button
                    className={`createGoalButton ${otherSelectedI ? 'highlighted' : ''}`}
                    onClick={() => { setDisease("Other"); setOtherSelectedI(true); setOtherSelectedD(false); }}
                    >
                        Other
                    </button>
                    {otherSelectedI ? (<input className="inputBox" placeholder="Specific disease here..." onChange={(event) => { setDisease(event.target.value) }} />) : (<br />)}
                    <button className={`createGoalButton ${disease === 'No underlying diseases' ? 'highlighted' : ''}`} onClick={() => { setDisease("No underlying diseases"); setOtherSelectedI(false); }}>
                        None
                    </button>
                </div>
                <div className="inputGp">
                <label>What Time Do You Want to Reach this Weight by?</label>
                <button className={`createGoalButton ${targetTime === '1-3 months' ? 'highlighted' : ''}`} onClick={() => { setTargetTime("1-3 months"); setOtherSelectedF(false); }}>
                    1-3 months
                </button>
                <button className={`createGoalButton ${targetTime === '3-6 months' ? 'highlighted' : ''}`} onClick={() => { setTargetTime("3-6 months"); setOtherSelectedF(false); }}>
                    3-6 months
                </button>
                <button className={`createGoalButton ${targetTime === '6-12 months' ? 'highlighted' : ''}`} onClick={() => { setTargetTime("6-12 months"); setOtherSelectedF(false); }}>
                    6-12 months
                </button>
                <button
                        className={`createGoalButton ${otherSelectedF ? 'highlighted' : ''}`}
                        onClick={() => { setTargetTime("Other"); setOtherSelectedF(true); setOtherSelectedG(false); }}
                    >
                        Other
                    </button>
                    {otherSelectedF ? (<input className="inputBox"  placeholder="To have [insert your goal]..." onChange={(event) => { setTargetTime(event.target.value) }} />) : (<br />)}
                    </div>

                    <div className="inputGp">
                    <label>Give yourself a main goal</label>
                    <button className={`createGoalButton ${goal === 'to be fit' ? 'highlighted' : ''}`} onClick={() => { setGoal("to be fit"); setOtherSelectedG(false); }}>
                        To be Fit
                    </button>
                    <button className={`createGoalButton ${goal === 'to lose weight' ? 'highlighted' : ''}`} onClick={() => { setGoal("to lose weight"); setOtherSelectedG(false); }}>
                        To Lose Weight
                    </button>
                    <button className={`createGoalButton ${goal === 'to have a healthier lifestyle' ? 'highlighted' : ''}`} onClick={() => { setGoal("to have a healthier lifestyle"); setOtherSelectedG(false); }}>
                        To have a Healthier Lifestyle
                    </button>
                    <button
                        className={`createGoalButton ${otherSelectedG ? 'highlighted' : ''}`}
                        onClick={() => { setGoal("Other"); setOtherSelectedG(true); }}
                    >
                        Other
                    </button>
                    {otherSelectedG ? (<input className="inputBox"  placeholder="To have [insert your goal]..." onChange={(event) => { setGoal(event.target.value) }} />) : (<br />)}
                </div>

                <button onClick={setUserData}>Submit</button>
            </div>
        </div>
    );
}

export default CreateGoal;