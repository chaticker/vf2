<template>
  <v-app>
    <v-app-bar app color="primary" dark :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <site-title :title="site.title"></site-title>
      <v-spacer/>
      <site-search/>
      <site-sign></site-sign>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :width="$store.state.editable ? 380 : null"
      >
      <site-menu :items="site.menu" @close="drawer=false"></site-menu>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <site-top :top="site.top"></site-top>
    <site-footer :footer="site.footer"></site-footer>
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'
import SiteSign from '@/views/site/sign'
import SiteSearch from '@/views/site/search'
import SiteTop from '@/views/site/top'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu, SiteSign, SiteSearch, SiteTop },
  name: 'App',
  data () {
    return {
      drawer: false,
      site: {
        menu: [
          {
            title: '메뉴 로드중 ...',
            icon: 'mdi-home',
            subItems: [
              {
                title: '홈',
                to: '/',
                createdAt: new Date('2000-01-01'),
                level: 5
              }
            ],
            createdAt: new Date('2000-01-01'),
            level: 5
          }
        ],
        title: '타이틀 로드중 ...',
        footer: '바닥 로드중 ...',
        top: ' '
      }
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const v = sn.val()
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
          return
        }
        this.site = v
      }, (e) => {
        console.log(e.message)
      })
    }
  }
}
</script>
<style>

</style>
