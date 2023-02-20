import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {authorize} from "@/firebase/config";
import {ref} from "vue";

const error = ref(null)
const signup = async (email, pw, displayName) => {
    error.value = null
    try {
        // noinspection JSValidateTypes
        const res = await createUserWithEmailAndPassword(authorize, email, pw)
        if (!res) { throw new Error('Could not complete the signup')}
        await updateProfile(res.user, {displayName})
        error.value = null
        return res
    } catch (e) {
        if (e.message.includes("(auth/weak-password)")) {
            error.value = "Password must be at least 6 characters long"
        } if (e.message.includes(" (auth/email-already-in-use)")) {
            error.value = "Email already exist, please use another"
        }
    }
}
const useSignup = () => {
  return {error,signup}
}

export default useSignup