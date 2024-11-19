import Register from "../models/register.js"; // Adjust import if needed

// Controller for registering a new user
const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = req.body;

    // Check for missing required fields
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "Email already exists. Please use a different email.",
        });
    }

    // Additional logic if needed, like checking password match, etc.
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Create a new user
    const newUser = new Register({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export { registerUser };