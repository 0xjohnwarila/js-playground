<script>
import { mapState } from "vuex";
import VUserSearchForm from "@/components/VUserSearchForm";
import VUserProfile from "@/components/VUserProfile";
export default {
  name: "UserView",
  components: {
    VUserSearchForm,
    VUserProfile
  },
  computed: {
    ...mapState({
      user: "user"
    })
  }
};
</script>

<template>
  <div>
    <VUserSearchForm/>
    <VUserProfile :user="user"/>
  </div>
</template>