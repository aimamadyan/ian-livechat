import {signOut} from "firebase/auth";
import {authorize} from "@/firebase/config";
import {ref} from "vue";

const error = ref(null)
const logout = async () => {
    error.value = null
    try {
        await signOut(authorize)
    } catch (e) {
        error.value = e.message
    }
}

export {error,logout}