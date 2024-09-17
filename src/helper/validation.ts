// validation.js
// Validate first name
export const validateFirstName = () => {
    return {
      required: "First Name is Required.",
      pattern: {
        value: /^[A-Za-z]+$/,
        message: "First Name should not contain numbers."
      },
      minLength: {
        value: 3,
        message: "First Name must be at least 3 characters."
      },
      maxLength: {
        value: 10,
        message: "First Name must not exceed 10 characters."
      }
    };
  };
  // Validate last name
  export const validateLastName = () => {
    return {
      required: "Last Name is Required.",
      pattern: {
        value: /^[A-Za-z]+$/,
        message: "Last Name should not contain numbers."
      },
      minLength: {
        value: 3,
        message: "Last Name must be at least 3 characters."
      },
      maxLength: {
        value: 10,
        message: "Last Name must not exceed 10 characters."
      }
    };
  };
  // Validate email
  export const validateEmail = () => {
    return {
      required: "Email Address is Required.",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Enter a valid email address."
      }
    };
  };
  // Validate password
  export const validatePassword = () => {
    return {
      required: "Password is Required.",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      }
    };
  };