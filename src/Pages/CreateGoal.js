import { useState } from "react";

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

    const otherClickedG= () => {
        setOtherSelectedG(true);
    }
    return (
        <div className="createGoal">
            <div className="cgContainer">
                <h1>Create Your Goal</h1>
                <div className="inputGp">
                    <label>Gender</label>
                    <button>Male</button>
                    <button>Female</button>
                    <button>Other</button>
                </div>
                <div className="inputGp">
                    <label>Age: </label>
                    <input placeholder="Current Age..." />
                </div>
                <div className="inputGp">
                    <label>Height: </label>
                    <input placeholder="Height..." />
                </div>
                <div className="imputGp">
                    <label>Weight:</label>
                    <input placeholder="Weight..." />
                </div>
                <div className="imputGp">
                    <label>How Active Are You?:</label>
                    <button>Very Active</button>
                    <button>Somewhat active</button>
                    <button>Not Active</button>
                </div>
                <div className="imputGp">
                    <label>Are you any of the following:</label>
                    <button>Vegan</button>
                    <button>Vegetarian</button>
                    <button>Pescatarian</button>
                    <button onClick={otherClickedD}>Other</button>
                    {otherSelectedD ? (<input placeholder="Specific diet here..."></input>) : (<br />)}
                </div>
                <div className="imputGp">
                    <label>Any Underlying Diseases?</label>
                    <button>High Blood Pressure</button>
                    <button>High Cholestrol</button>
                    <button>Diabetes</button>
                    <button>Heart Disease</button>
                    <button onClick={otherClickedI}>Other</button>
                    {otherSelectedI ? (<input placeholder="Specific disease here..."></input>) : (<br />)}
                    <button>None</button>
                </div>
                <div className="imputGp">
                    <label>Give yourself a main goal</label>
                    <button>To be fit</button>
                    <button>To Lose Weight</button>
                    <button>To have a Healtheir Lifestyle</button>
                    <button onClick={otherClickedG}>Other</button>
                    {otherSelectedG ? (<input placeholder="To have [insert your goal]..."></input>) : (<br />)}
                </div>
                <button>Submit</button>
            </div>
        </div>
    );
}

export default CreateGoal;