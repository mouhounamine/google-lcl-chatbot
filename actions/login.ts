import * as z from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginSchema } from "@/schemas";
import { auth } from "@/firebase.config"; // Make sure the correct Firebase config is imported

// Function to handle login
export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Validate the input using Zod schema
  const validationFields = LoginSchema.safeParse(values);

  if (!validationFields.success) {
    return { error: "Invalid email or password format" };
  }

  const { email, password } = values;

  try {
    // Attempt to sign in with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // If successful, return the success message and user data (optional)
    return { success: "Login successful", user: userCredential.user };
  } catch (error: any) {
    // Handle Firebase login errors
    let errorMessage = "Something went wrong. Please try again.";

    // Firebase provides specific error codes you can handle more precisely
    if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password.";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "No user found with this email.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "The email address is badly formatted.";
    }

    return { error: errorMessage };
  }
};

