import React, { useState } from "react";
import { useNavigate } from "react-router";

 
export default function Create() {
 const [form, setForm] = useState({
   ID:"",
   name: "",
   Address:"",
   mobile : "",
   position: "",
   level: "",
   
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ ID:"", name: "", Address: "", mobile: "", position: "", level: "" });
   alert("New employee add successfully");
 }
 <div>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.js"></script>
 <script src="validation.js"></script>
 </div>
 // This following section will display the form that takes the input from the user.
 return (
   <div className="container" style={{ backgroundImage: "url(/image.png)" }}><br></br>
     <h3 className=" text-info mt-2">Add New Employee</h3><br></br>
  <form className="m-2" name="registration" onSubmit={onSubmit} >
  <div className="mb-3">
    <label  class="form-label">ID</label>
    <input type="number" class="form-control" id="ID"  required  value={form.ID} onChange={(e)=>updateForm({ ID:e.target.value})}></input>
  </div>  
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control" id="name"  required value={form.name} onChange={(e)=>updateForm({ name:e.target.value})}></input>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" class="form-label">Address</label>
    <input type="text" class="form-control" id="Address"  required value={form.Address} onChange={(e)=>updateForm({ Address:e.target.value})}></input>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Mobile Number</label>
    <input type="number" class="form-control" id="mobile"  required value={form.mobile} onChange={(e)=>updateForm({ mobile:e.target.value})}></input>
  </div><br></br>
  
  <div className="mb-3">
  <select class="form-select" aria-label="Default select example" id="select"  required onChange={(e)=>updateForm({position:e.target.value})}>
  <option value="">Select the Position</option >
  <option value="Food presentation worker">Food presentation worker</option >
  <option value="Cashier">Cashier</option >
  <option value="Technician">Technician</option >
</select>
</div><br></br>
  <div className="form-group mb-3">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionTrainee"
             value="Trainee"
             checked={form.level === "Trainee"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Trainee</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionJunior"
             value="Junior"
             checked={form.level === "Junior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Junior</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionSenior"
             value="Senior"
             checked={form.level === "Senior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionSenior" className="form-check-label">Senior</label>
         </div>
       </div><br></br>

  <div class="mb-3 form-check"  required>
    <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <input type="submit" className="btn btn-primary" value="Submit"></input>
</form>
</div>
 );
}