import React,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import "./AdminLogin.css"
function AdminLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
useEffect(() => {
  (async () => {
    if(localStorage.getItem("token")){
    const res = await fetch("/api/v1/admin",{
      method:"GET",
      headers:{
        "x-access-token":localStorage.getItem("token")
      },
      
    })
    const data = await res.json()
    console.log(data)
    if(data.msg) {
      navigate("/admin/profile")
    } 
  }
  })()

  
}, [])

  const login = async () => {
   let res = await fetch("/api/v1/admin/login",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
       
      },
      body:JSON.stringify({email,password})
    })
    let data = await res.json();
    if(data.msg) {
      localStorage.setItem("token",data.accessToken);
      navigate("/admin/profile")
    } else {
        setError(data.err)
      }
    
  }
  return (
    <div className="container">
    <div className="screen">
      <div className="screen__content">
        <div className="login">
          <p>{error}</p>
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input type="email" className="login__input" placeholder="User name / Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input type="password" className="login__input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={login} className="button login__submit">
            <span className="button__text">Log In Now</span>
            <i className="button__icon fas fa-chevron-right"></i>
          </button>				
        </div>
      </div>
      <div className="screen__background">
        <span className="screen__background__shape screen__background__shape4"></span>
        <span className="screen__background__shape screen__background__shape3"></span>		
        <span className="screen__background__shape screen__background__shape2"></span>
        <span className="screen__background__shape screen__background__shape1"></span>
      </div>		
    </div>
  </div>
  )
}

export default AdminLogin