<template>
  <div>
    <nav class="navbar  rounded justify-content-between flex-nowrap flex-row fixed-top" style="left: 75%">
      <div v-if="isLogin()" class="container">
        <ul class="nav navbar-nav flex-row float-right">
          <a type="button" class="font2 navbar-brand float-left"  id="back-button" @click="goToAuthorization">
            <label id="back" for="back-button">Sign In</label>
          </a>
          <a type="button" class="position font2 navbar-brand float-left" id="sign-up" @click="goToRegistration">
            <label id="signUp" for="sign-up">Sign Up</label>
          </a>
        </ul>
      </div>
    </nav>
    <div id="elementor-tab-content-1531" class="elementor-tab-content elementor-clearfix elementor-active" data-tab="1" role="tabpanel" aria-labelledby="elementor-tab-title-1531" style="display: block;">
      <h3 class="font">Вам потрібен розкішний резорт для молодят або номер на 45-му поверсі? А може окрема вілла, бутік-готель в горах чи на узбережжі? Перераховувати різноманітність варіантів можна нескінченно! Тому ми зібрали популярні системи пошуку та бронювання готелів на одному сайті – це дозволить знайти і порівняти ціни на проживання.</h3>
      <h3 class="font">У виборі готелю, незалежно для відпочинку чи для бізнес поїздки, не варто гнатися тільки за помпезністю і розкішшю. Найголовніше це гармонія у всьому. Важливо чітко розуміти що ти хочеш отримати від проживання? Насолодитися віддаленими від міста пейзажами і видами або ж зануритися в ритм мегаполісу!</h3>
      <h3 class="font">В якому б місті ви не опинилися, готель це не просто тимчасове житло. Це спосіб пожити в іншій атмосфері, зануритися в колорит міста і країни. Головна відмінна риса звичайного готелю від кращого в світі – здатність подарувати незабутні емоції та враження, залишити після себе слід у вашому житті, залишитися в пам’яті. І кращий – не обов’язково дорогий. Кращий – це з душею і родзинкою!</h3>
    </div>
  </div>
</template>


<script>
import Link from "./Link";
export default {
  name: "Home",
  methods: {
    goToAuthorization() {
      this.$router.push('/authorization')
    },
    goToRegistration() {
      this.$router.push('/registration')
    },
    isLogin(){
      return !Link.methods.checkTokenExp();
    },
    logout() {
      Link.methods.logout();
    },
  }
}
</script>

<style scoped>
.font{
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 20px; color: #000000;
  text-decoration: none;
}
</style>