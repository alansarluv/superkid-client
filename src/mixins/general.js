export const generalMixin = {
  // data() {
  //   return {
  //   }
  // },
  methods: {
    getAge (birthDate) {
      const today = new Date();
      birthDate = new Date(birthDate);
      let currentAge = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        currentAge--;
      }
      currentAge = currentAge > 0 ? currentAge : 0;
      return currentAge;
    }    
  }
}