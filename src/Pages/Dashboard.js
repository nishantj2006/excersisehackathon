import { useNavigate } from "react-router-dom";

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