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

export {
    registration
};
