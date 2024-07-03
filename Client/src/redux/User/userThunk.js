import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


const validateUsername = (username) => {
    if (username.trim() === '') {
        return 'Username is required!';
    }
    return null;
};

const validateEmail = (email) => {
    if (email.trim() === '') {
        return 'Email is required!';
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.trim())) {
        return 'Invalid email address!';
    }
    return null;
};

const validatePhone = (phone) => {
    if (phone.trim() === '') {
        return 'Phone number is required!';
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.trim())) {
        return 'Phone number must be exactly 10 digits!';
    }
    return null;
};

const validatePassword = (password) => {
    if (password.trim() === '') {
        return 'Password is required!';
    }
    if (password.trim().length < 6) {
        return 'Password must be greater than 6 characters';
    }
    return null;
};

const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword.trim() === '') {
        return 'Confirm Password is required!';
    }
    if (password.trim() !== confirmPassword.trim()) {
        return "Password & confirm Password doesn't match";
    }
    return null;
};

// Main registration function
const registration = async ({ username, email, phone, password, confirmPassword, toast }) => {
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    if (usernameError) {
        toast.error(usernameError, { autoClose: 3000 });
    } else if (emailError) {
        toast.error(emailError, { autoClose: 3000 });
    } else if (phoneError) {
        toast.error(phoneError, { autoClose: 3000 });
    } else if (passwordError) {
        toast.error(passwordError, { autoClose: 3000 });
    } else if (confirmPasswordError) {
        toast.error(confirmPasswordError, { autoClose: 3000 });
    } else {
        try {
            const response = await axios.post('http://localhost:3000/userSignup', { username, email, phone, password });

            if (response.data === "UserExist") {
                toast.error("User already exists", { hideProgressBar: true, autoClose: 3000 });
            } else {
                toast.success("Registration completed successfully", { autoClose: 2500 });
                return "success";
            }
        } catch (error) {
            toast.error("An error occurred during registration. Please try again later.", { hideProgressBar: true, autoClose: 3000 });
        }
    }
};



const userVerify = createAsyncThunk(
    'userSlice/userVerify',
    async ({ email, password, toast }, { rejectWithValue }) => {
        console.log(email, password);
        try {
            password = password.trim();
            email = email.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "" || password === "") {
                toast.error("All fields are required", { autoClose: 3000 });
                return rejectWithValue("All fields are required");
            } else if (!emailPattern.test(email)) {
                toast.error("Please enter a valid email address", { autoClose: 3000 });
                return rejectWithValue("Invalid email address");
            } else if (password.length < 6) {
                toast.error("Password must be at least 6 characters", { autoClose: 3000 });
                return rejectWithValue("Password too short");
            } else {

                const response = await axios.post('http://localhost:3000/userLogin', { email, password });

                if (response.data === "User not found") {
                    toast.error("User not found", { autoClose: 3000 });
                    return rejectWithValue("User not found");
                } else if (response.data === "wrongPassword") {
                    toast.error("Password is wrong", { autoClose: 3000 });
                    return rejectWithValue("Incorrect password");
                } else {
                    return response.data;
                }
            }
        } catch (error) {
            toast.error("Something went wrong", { autoClose: 3000 });
            return rejectWithValue(error.message);
        }
    }
)



const editProfile = createAsyncThunk(
    'userSlice/editProfile',
    async ({ formData, username, image, toast }, { rejectWithValue }) => {
        try {
            username = username.trim()
            if (username === '') {
                toast.error('Username is Required', { autoClose: 3000 });
                return rejectWithValue('Username is Required');
            } else {
                const token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.post('http://localhost:3000/editProfile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (response.data.acknowledged === true && response.data.modifiedCount == 1) {
                    toast.success("Update changes successfully", { autoClose: 3000 });
                    return { username, ...(image && { profileURL: image.name }) };
                } else if (response.data === "Access_denied") {
                    toast.warning("Access_denied", { autoClose: 3000 });
                    return rejectWithValue("Access_denied");
                } else if (response.data === "authentication_failed") {
                    toast.warning("Authentication failed please login again", { autoClose: 3000 });
                    return rejectWithValue("Access_denied");
                } else {
                    toast.warning("No changes detected", { autoClose: 3000 });
                    return rejectWithValue("No changes found");
                }
            }
        } catch (error) {
            console.error("Error: ", error);
            toast.error("Something went wrong, please try again later", { autoClose: 3000 });
            return rejectWithValue(error.message);
        }
    }
)

export {
    registration,
    userVerify,
    editProfile
};
