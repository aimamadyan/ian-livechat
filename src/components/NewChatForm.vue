<template>
  <form>
    <textarea
        placeholder="Type a message and hit enter to send..."
        v-model="message"
        @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div class="error">{{error}}</div>
  </form>
</template>

<script>
import getUser from "@/composable/getUser";
import {timestamp} from "@/firebase/config";
import useCollection from "@/composable/useCollection";
import {ref} from "vue";

export default {
  name: "NewChatForm",
  setup() {
    const message = ref('')
    const {user} = getUser()
    const {addDocument, error} = useCollection("messages")

    const handleSubmit = async() =>
    {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp()
      }

      await addDocument({...chat})
      if (!error.value) {
        message.value = ''
      }
    }

    return {message, handleSubmit, error}
  }
}
</script>

<style scoped>
  form {
    margin: 10px;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
  }
</style>