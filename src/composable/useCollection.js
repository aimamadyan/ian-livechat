import {ref} from "vue";
import {db} from "@/firebase/config";
import {collection,addDoc} from "firebase/firestore";

const useCollection = (path) => {
    let error = ref(null)

    const addDocument = async (data) => {
        error.value = null
        try {
            await addDoc(collection(db,path), data)
        } catch (e) {
            console.log(e.message)
            error.value = 'Could not send the message'
        }
    }

    return {error,addDocument}
}

export default useCollection