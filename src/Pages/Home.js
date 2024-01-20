import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {  
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard')
  })
  return (
    <div className="home">
        
    </div>
  );
}

export default Home;