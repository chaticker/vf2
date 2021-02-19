import Vue from 'vue'
import Vuetify, { VBtn, VIcon } from 'vuetify/lib'

import en from 'vuetify/es5/locale/en'
import ko from 'vuetify/es5/locale/ko'

Vue.use(Vuetify, {
  components: {
    VBtn,
    VIcon
  }
})
const VuetifyObj = new Vuetify({
  lang: {
    locales: { en, ko },
    current: 'ko'
  }
})

export default VuetifyObj
