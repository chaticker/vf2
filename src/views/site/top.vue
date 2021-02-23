<template>
    <v-top>
        <v-btn
            v-scroll="onScroll"
            fab
            dark
            fixed
            bottom
            right
            color="primary"
            @click="scrollTop"
            v-show="visible"
          >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
    </v-top>
</template>

<script>
export default {
  props: ['top'],
  data () {
    return {
      visible: false
    }
  },
  methods: {
    scrollTop: function () {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId)
        }
        window.scroll(0, window.pageYOffset - 50)
      }, 20)
    },
    scrollListener: function (e) {
      this.visible = window.scrollY > 100
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.scrollListener)
  }
}
</script>

<style scoped>
.bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
