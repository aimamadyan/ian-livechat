import {signInWithEmailAndPassword} from "firebase/auth";
import {authorize} from "@/firebase/config";
import {ref} from "vue";

const error = ref(null)
const useLogin = async (email, pw) => {
    error.value = null
    try {
        // noinspection JSValidateTypes
        const res = await signInWithEmailAndPassword(authorize, email, pw)
        error.value = null
        return res
    } catch (e) {
        error.value = "Incorret login credential"
    }
}

export {error,useLogin}