export const spinnerMixin = {
  data() {
    return {
      spinner: `
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>      
      `
    }
  }
}

export const getAgeMixin = {
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

export const monthYearMixin = {
  methods: {
    yearMonth(val) {
      const year = val.slice(0,4);
      const monthNum = parseInt(val.substring(4));
      const monthNames = this.$store.getters.monthNames;
      return year + " - " + monthNames[monthNum-1];
    },
    monthYear(val) {
      const year = val.slice(0,4);
      const monthNum = parseInt(val.substring(4));
      const monthNames = this.$store.getters.monthNames;
      return monthNames[monthNum-1] + " - " + year;
    } 
  }
}

export const alertToastMixin = {
  methods: {
    alertToast($text, $type, $duration){
      let $icon = $type;
      const $dur = ($duration || 3000) + 1000;
      if ($type === 'danger') {
        $icon = 'error';
      } else if ($type === 'warning') {
        $icon = 'warning-line'
      }
      const $elm = `
        <div class="alert alert-slide-top alert-${$type} hidden alert-dismissible fade show" role="alert">
          <span class="ic ic-${$icon}"></span>
          <span class="text-dark">${$text}</span>
          <button type="button" class="close d-none" data-dismiss="alert" aria-label="Close"></button>    
        </div>`
      document.body.insertAdjacentHTML("beforeend", $elm);
      setTimeout(function(){
        document.body.querySelector('.alert-slide-top.hidden').classList.remove('hidden');
      }, 1000);
      setTimeout(function(){
        document.body.querySelector('.alert-slide-top').remove();
      }, $dur);
    }
  }
}
