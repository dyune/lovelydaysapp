import {useState} from "react";
import axios from "axios";
import error from "eslint-plugin-react/lib/util/error.js";

export default function Register() {

    const [ formData, setFormData ] = useState({
        username:"",
        email:"",
        password_1:"",
        password_2:"",
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ showErrorMsg, setShowErrorMsg ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!isLoading) {
            setErrorMsg(false);
            setIsLoading(true);
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
                setIsLoading(false);
            } catch (error) {
                console.log("ok")
                console.log("Error during registration!", error.response?.data);
                if (error.response && error.response.data) {
                    Object.keys(error.response.data).forEach(field => {
                        const errorMessages = error.response.data[field];
                        if (errorMessages && errorMessages.length > 0) {
                            setErrorMsg(errorMessages[0]);
                            setShowErrorMsg(true);
                        }
                    })
                }
            } finally {
                setIsLoading(false);
            }
        }
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return <>
        {showErrorMsg && <p>{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <label>Email</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
            <label>Password</label>
            <input type="text" name="password_1" value={formData.password_1} onChange={handleChange} />
            <label>Confirm password</label>
            <input type="text" name="password_2" value={formData.password_2} onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    </>

}