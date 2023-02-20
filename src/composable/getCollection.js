import {ref, watchEffect} from "vue";
import {db} from "@/firebase/config";
import {query, collection, orderBy, onSnapshot} from "firebase/firestore";

const getCollection = (path) => {
    const docs = ref(null)
    const error = ref(null)

    let q = query(collection(db,path),orderBy('createdAt'))
    const unsub = onSnapshot(q,(snap) => {
        let results = []
        snap.docs.forEach(doc =>
            doc.data().createdAt && results.push({...doc.data(), id: doc.id}))
        docs.value = results
        error.value = null
    }, (e) => {
        console.log(e.message)
        docs.value = null
        error.value = 'Could not fetch data'
    })

    watchEffect((onCleanup) => {
        onCleanup(() => unsub())
    })

    return {docs,error}
}

export default getCollection