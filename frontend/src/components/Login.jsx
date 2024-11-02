import {useState} from "react";
import axios from "axios";

export default function Login() {

    const [ formData, setFormData ] = useState({
        email:"",
        password:"",
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ showErrorMsg, setShowErrorMsg ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        if (!isLoading) {
            setErrorMsg(false);
            setIsLoading(true);
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
                localStorage.setItem("tokens", response.data.token);

                setIsLoading(false);
            } catch (error) {
                console.log("Error during login!", error.response?.data);
                if (error.response && error.response.data) {
                    Object.keys(error.response.data).forEach(field => {
                        const errorMessages = error.response.data[field];
                        if (errorMessages && errorMessages.length > 0) {
                            setErrorMsg(errorMessages[0]);
                            setShowErrorMsg(true);
                        }
                    })
                } else {
                    setErrorMsg("Something really unexpected happened, please try again.");
                    setShowErrorMsg(true);
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
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
            <label>Password</label>
            <input type="text" name="password" value={formData.password} onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    </>
}