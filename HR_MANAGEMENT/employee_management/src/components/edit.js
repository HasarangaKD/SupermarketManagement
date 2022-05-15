import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   ID:"",
   name: "",
   Address:"",
   mobile:"",
   position: "",
   level: "",
   record: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     ID:form.ID,
     name: form.name,
     Address:form.Address,
     mobile:form.mobile,
     position: form.position,
     level: form.level,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div className="container"><br></br>
  <h3 className=" text-info mt-2">Add New Employee</h3><br></br>
<form className="m-2" onSubmit={onSubmit}>
<div className="mb-3">
 <label for="exampleInputEmail1" class="form-label">ID</label>
 <input type="text" class="form-control" id="name" value={form.ID} onChange={(e)=>updateForm({ ID:e.target.value})}></input>
</div>  
<div className="mb-3">
 <label for="exampleInputEmail1" class="form-label">Name</label>
 <input type="text" class="form-control" id="name" value={form.name} onChange={(e)=>updateForm({ name:e.target.value})}></input>
</div>
<div className="mb-3">
 <label for="exampleInputPassword1" class="form-label">Address</label>
 <input type="text" class="form-control" id="Address" value={form.Address} onChange={(e)=>updateForm({ Address:e.target.value})}></input>
</div>
<div className="mb-3">
 <label for="exampleInputEmail1" class="form-label">Mobile Number</label>
 <input type="number" class="form-control" id="mobile" value={form.mobile} onChange={(e)=>updateForm({ mobile:e.target.value})}></input>
</div><br></br>

<div className="mb-3">
<select class="form-select" aria-label="Default select example" id="select" onChange={(e)=>updateForm({position:e.target.value})}>
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
          id="positionIntern"
          value="Intern"
          checked={form.level === "Intern"}
          onChange={(e) => updateForm({ level: e.target.value })}
        />
        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
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

<div class="mb-3 form-check">
 <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
 <label class="form-check-label" for="exampleCheck1">Check me out</label>
</div>
<input type="submit" className="btn btn-primary" value="Update"></input>
</form>
</div>
 );
}