export const validateBookTitle = () => {
    return {
      required: "Book title is required.",
      minLength: {
        value: 3,
        message: "Book title must be at least 3 characters long.",
      },
      maxLength: {
        value: 100, // Optional max length, adjust as needed
        message: "Book title must not exceed 100 characters.",
      },
    };
  };
  export const validateFullName = () => {
    return {
      required: "Author's full name is required.",
      pattern: {
        value: /^[a-zA-Z]+ [a-zA-Z]+$/,
        message: "Please enter the full name (first and last name).",
      },
      minLength: {
        value: 5,
        message: "Full name must be at least 5 characters long.",
      },
      maxLength: {
        value: 50,
        message: "Full name must not exceed 50 characters.",
      },
    };
  };
  export const validateDescription = () => {
    return {
      required: "Description is required.",
      minLength: {
        value: 10,
        message: "Description must be at least 10 characters long.",
      },
      maxLength: {
        value: 500, // Optional max length for the description
        message: "Description must not exceed 500 characters.",
      },
    };
  };
  export const validateFile = () => {
    return {
      required: "File upload is required.",
      validate: (fileList: FileList) => {
        const file = fileList[0];
        if (!file) return "File is required.";
        const validTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!validTypes.includes(file.type)) {
          return "File type must be JPEG, PNG, or PDF.";
        }
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeInBytes) {
          return `File size must not exceed ${maxSizeInBytes / (1024 * 1024)}MB.`;
        }
        return true;
      },
    };
  };