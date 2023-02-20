import {onAuthStateChanged} from "firebase/auth";
import {authorize} from "@/firebase/config";
import {ref} from "vue";

const user = ref(authorize.currentUser)

onAuthStateChanged(authorize, (_user) => {
    user.value = _user
})

const getUser = () => {
    return {user}
}
export default getUser
