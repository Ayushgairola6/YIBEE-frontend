import { useState } from "react";

const Test = () => {

    const [formdata, setFormData] = useState({
        title: "",
        mood: "",
        name: "",
        email: ""
    });
    const handleChange = (e) => {
        e.preventDefault();
        // console.log(e.target.value)
        setFormData(e.target.value)
        console.log(formdata)
    }
    const handleSubmit=()=>{
        console.log(formdata)
    }

    return <>
        <form className="bg-black border-2 border-cyan-400 flex flex-col" onChange={handleChange} onSubmit={handleSubmit()} encType="form-data" action="" method="post">
            <input className="bg-teal-300 border-2 border-gray-500" value={formdata.email} onChange={handleChange} type="text" />
            <input className="bg-teal-300 border-2 border-gray-500" value={formdata.mood} onChange={handleChange} type="text" />
            <input className="bg-teal-300 border-2 border-gray-500" value={formdata.name} onChange={handleChange} type="text" />
            <input className="bg-teal-300 border-2 border-gray-500" value={formdata.title} onChange={handleChange} type="text" />
        </form>

    </>
}

export default Test;
