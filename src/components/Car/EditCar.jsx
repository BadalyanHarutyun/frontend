import React,{useState,useEffect} from 'react'
import { Carousel } from 'react-responsive-carousel';
import { useNavigate,useParams } from 'react-router-dom';

import "react-responsive-carousel/lib/styles/carousel.min.css";
function EditCar() {
    const {id} = useParams()
    const [car, setCar] = useState();
    const [files,setFiles] = useState([]);
    const [brands, setBrands] = useState([]);
    const [modelId,setModelId] = useState();
    const [models,setModels] =  useState([]);
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
      })() },[])
    useEffect(() => {
        (async () => {
            console.log(id)
            let res = await fetch(`/api/v1/admin/car?id=${id}`);
            let data = await res.json();
            console.log(data)
            if(data.msg){
                    setCar(data.msg)
                   

            }
        })()

    },[])
    useEffect(() =>{
        (async () => {
          const res = await fetch("/api/v1/admin/carbrand");
          const data = await res.json();
          console.log(data.msg)
          if(data.msg) {
          setBrands(data.msg)
          }
          
        })()
       
      },[])
      const selectCheckBox= async (e) => {
        console.log(e.target.id)
        Array.from(document.getElementsByClassName("checkbox_inputs")).forEach(element => {
          element.checked = false;
        });
        const res =  await fetch(`/api/v1/admin/carmodel?brandId=${Number(e.target.id)}`,{
            method:"GET",
            headers:{
              "x-access-token":localStorage.getItem("token")
            },
            
          })
          const data = await res.json()
          console.log(data)
          if(data.msg) {
              setModels(data.msg)
          }
        document.getElementById(e.target.id).checked = true;
    }
    const selectCheckBoxModel= async (e) => {
        console.log(e.target.id)
        Array.from(document.getElementsByClassName("checkbox_inputs_model")).forEach(element => {
          element.checked = false;
        });
        setModelId(e.target.id)
       
        document.getElementById(e.target.id).checked = true;
    }
    const addPicture = async (e) => {
        const formData = new FormData();
        formData.append("id",id)
        for (const key of Object.keys(files) ) {
            formData.append('image', files[key])
        }
        const res = await fetch("/api/v1/admin/car/picture",{
            method:"POST",
            headers:{
                "x-access-token":localStorage.getItem("token")
            },
            body:formData
        })
        const data = await res.json();
        if(data.msg) {
          alert(data.msg)
        } else{
          alert(data.err)
        }
    }
    const changeModel = async(e) => {
      const formData = new FormData();
     
      const res = await fetch("/api/v1/admin/car",{
          method:"PUT",
          headers:{
            "Content-Type": "application/json",
              "x-access-token":localStorage.getItem("token")
          },
          body:JSON.stringify({id,modelId})
      })
      console.log(modelId,id)
      const data = await res.json();
      console.log(data)
    }
    const deleteCar = async (e) => {
      const res = await fetch("/api/v1/admin/car",{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
            "x-access-token":localStorage.getItem("token")
        },
       body:JSON.stringify({id:e.target.getAttribute('data-id')})
    })
   
   const data = await res.json();
   if(data.msg) {
    alert(data.msg)
  } else{
    alert(data.err)
  }
    }
   const logout = (e) => {
     localStorage.removeItem("token");
     navigate("/admin/login")
   }
    
    const deletImage = async (e) => {
      const res = await fetch("/api/v1/admin/car/picture",{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
            "x-access-token":localStorage.getItem("token")
        },
        body:JSON.stringify({carId:id,id:e.target.getAttribute("data-img")})
    })
    console.log(id,e.target.getAttribute("data-img"))
    const data = await res.json();
    if(data.msg) {
      alert(data.msg)
    } else{
      alert(data.err)
    }
  }
  return (
    <div style={{display:'flex',flexDirection:'row'}}>
    <div className='add_cars'>
      <a href='/admin/cars'>Go back cars</a>
        <input type="file" onChange={(e) => setFiles(e.target.files)} multiple />
        <button onClick={addPicture}>add Picture</button>
        <button onClick={changeModel}>Change model</button>
        <p>select brand</p>
        <div>
            {
              brands && brands.map(item => {
                return (
                  <div>
                  <input type="checkbox" className='checkbox_inputs'  onClick={selectCheckBox} id={item.id} name={item.name} />
                  <label for={item.name}>{item.name}</label>
                  </div>
                )
              })
            }
          </div>
          <div style={{marginTop:"50px"}}>
          <p>select Model</p>
            {
              models && models.map(item => {
                return (
                  <div>
                  <input type="checkbox" className='checkbox_inputs_model'  onClick={selectCheckBoxModel}  id={item.id} name={item.name} />
                  <label for={item.name}>{item.name}</label>
                  </div>
                )
              })
            }
          </div>
    </div>
 <div>
     {
         car && car.map(item => {
             return(
                 <div style={{borderRadius:"50px",width:"400px", marginTop:"20px", backgroundColor:"aqua",display:"flex", flexDirection:"column",alignItems:"center"}}>
                     <p>brand {item.brandName}</p>
                     <p>model {item.modelName}</p>
                     <button data-id={item.id} onClick={deleteCar} >Delete</button>
                     <Carousel >
                         {
                             item.imageArray.map(item1 => {
                                 return (
                                     <div width="200px" height="200px">
                                       <button style={{position:"absolute"}} data-img={item1.id} onClick={deletImage}>Delete</button>
                                     <img src={item1.url}   alt="broken" />
                                     
                                     </div>
                             )
                             })
                         }
                     </Carousel>
                 </div>
             )
         })
             
     }
 </div>
 <button style={{width:"100px", height:"50px"}} onClick={logout}>Logout</button>
    </div>
  )
}

export default EditCar