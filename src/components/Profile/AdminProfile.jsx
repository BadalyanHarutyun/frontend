import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "./AdminProfile.css"
function AdminProfile() {
  const [first, setFirst] = useState(true);
  const [brandName, setBrandName] = useState("");
  const [message,setMessage] = useState();
  const [brands, setBrands] = useState([]);
  const [brandId,setBrandId] = useState();
  const [modelName, setModelName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if(!localStorage.getItem("token")){
        navigate("/admin/login")
      }
      if(localStorage.getItem("token")){
      const res = await await fetch("/api/v1/admin",{
        method:"GET",
        headers:{
          "x-access-token":localStorage.getItem("token")
        },
        
      })
      const data = await res.json()
      console.log(data)
      if(data.err) {
        navigate("/admin/login")
      } 
    }
    })()
  
    
  }, [])
  useEffect(() =>{
    (async () => {
      const res = await fetch("/api/v1/admin/carbrand");
      const data = await res.json();
      console.log(data.msg)
      if(data.msg) {
      setBrands(data.msg)
      }
      setMessage("")
    })()
   
  },[first])
  const addBrand = async () => {
    if(brandName) {
      console.log(brandName)
      const res = await fetch("/api/v1/admin/carbrand",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
          "x-access-token":localStorage.getItem("token")
        },
        body:JSON.stringify({name:brandName})
      })
      const data = await res.json();
      console.log(data.msg)
      if(data.msg) {
        setMessage(data.msg)
      }
      else if(Array.isArray(data.err)){
        setMessage(data.err.msg)
      } else {
        setMessage(data.err)
      }
    }
  }
  const addModel = async () => {
    if(modelName) {
      
      const res = await fetch("/api/v1/admin/carmodel",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
          "x-access-token":localStorage.getItem("token")
        },
        body:JSON.stringify({name:modelName,brandId})
      })
      const data = await res.json();
      console.log(data)
      if(data.msg) {
        setMessage(data.msg)
      }
      else if(Array.isArray(data.err)){
        setMessage(data.err.msg)
      } else {
        setMessage(data.err)
      }
    }
  }
  const selectCheckBox=(e) => {
      console.log(e.target.id)
      Array.from(document.getElementsByClassName("checkbox_inputs")).forEach(element => {
        element.checked = false;
      });
      setBrandId(e.target.id)
      document.getElementById(e.target.id).checked = true;
  }
  const logout = (e) => {
    localStorage.removeItem("token");
    navigate("/admin/login")
  }
   
  return (
    <div className='admin_profile'>
       {first ? <div className='add_section'>
         <p>Add Brand</p>
         <input type="text" onChange={(e) => setBrandName(e.target.value)} />
         <button onClick={addBrand}>Add</button>
         <p>{message}</p>
         <button onClick={() => setFirst(prev => !prev)}>Add car model</button>


        </div>
        :<div className='add_section'>
          <p>Add Model</p>
        
           <input type="text" onChange={(e) => setModelName(e.target.value)} />
         <button onClick={addModel}>Add</button>
         <p>{message}</p>
        <button onClick={() => setFirst(prev => !prev)}>Add car brand</button>
        <div>
            {
              brands && brands.map(item => {
                return (
                  <div>
                  <input type="checkbox" className='checkbox_inputs' onClick={selectCheckBox} id={item.id} name={item.name} />
                  <label for={item.naem}>{item.name}</label>
                  </div>
                )
              })
            }
          </div>
        </div>
        
        }
      <button width={"100px"} height={"100px"} onClick={logout}>Logout</button>
      <a href='/admin/cars'>Go to cars</a>
    </div>
  )
}

export default AdminProfile