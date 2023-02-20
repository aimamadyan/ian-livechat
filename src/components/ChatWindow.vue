<template>
  <div class="chat-window">
    <div v-if="error">{{error}}</div>
    <div v-if="formattedDocs" class="messages" ref="messages">
      <div v-for="doc in formattedDocs" :key="doc.id" class="single">
        <span class="created-at">{{doc.createdAt}}</span>
        <span class="name">{{doc.name}}</span>
        <span class="message">{{doc.message}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "@/composable/getCollection";
import {computed,ref, onUpdated} from "vue";
import {formatDistanceToNow} from "date-fns";

export default {
  name: "ChatWindow",
  setup() {
    const {docs,error} = getCollection("messages")
    const messages = ref(null)

    const formattedDocs = computed(() => {
      if (docs.value) {
        return docs.value.map(doc => {
          let time = formatDistanceToNow(doc.createdAt.toDate())
          return {...doc, createdAt: time}
        })
      }
    })

    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight
    })

    return {error,formattedDocs,messages}
  }
}
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }

</style>