
function CreateGoal() {
  return (
    <div className="createGoal">
        <div className="cgContainer">
            <h1>Create Your Goal</h1>
            <div className="inputGp">
                <label>Current Weight: </label>
                <input placeholder="Current Weight..."/>
            </div>
            <div className="inputGp">
                <label>Target Weight: </label>
                <input placeholder="Target Weight..."/>
            </div>
            <div className="inputGp">
                <label>Time Period of Completion: </label>
                <input placeholder="Time Period Complete..."/>
            </div>
        </div>
    </div>
  );
}

export default CreateGoal;