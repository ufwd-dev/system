<template>
<div>
	<b-jumbotron
		:header="`欢迎登录!${account.ufwd.name}`"
		:lead="date|isoDateTime">
	</b-jumbotron>
</div>
</template>

<script>
import axios from "axios";
import dateFormat from "dateformat";

export default {
  data() {
    return {
      date: new Date(),
      account: {
        ufwd: {}
      }
    }
  },
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'isoDate');
		}
	},
  mounted() {
    const id = this.$store.state.account.id;

    axios.get(`/api/ufwd/service/account/${id}`).then(res => {
      this.account = res.data.data;
    });
  }
}
</script>
