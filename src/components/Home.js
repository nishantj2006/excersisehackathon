import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {  
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/login')
  })
  return (
    <div className="home">
        
    </div>
  );
}

export default Home;