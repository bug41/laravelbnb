<template>
  <div>
    <h6 class="text-uppercase text-secondary font-weight-bolder">
      Check availability
      <transition name="fade">
        <span v-if="noAvailability" class="text-danger">(NOT AVAILABLE)</span>
        <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
      </transition>      
    </h6>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="from">From</label>
        <input
          type="text"
          name="from"
          class="form-control form-control-sm"
          placeholder="Start Date"
          v-model="from"
          @keyup.enter="check"
          :class="[{ 'is-invalid': errorFor('from') }]"
        />
        <v-errors :errors="errorFor('from')"></v-errors>
      </div>
      <div class="form-group col-md-6">
        <label for="to">To</label>
        <input
          type="text"
          name="to"
          class="form-control form-control-sm"
          placeholder="End Date"
          v-model="to"
          @keyup.enter="check"
          :class="[{ 'is-invalid': errorFor('to') }]"
        />
        <v-errors :errors="errorFor('to')"></v-errors>
      </div>
    </div>
    <processButton :value="loading">Check</processButton>
  </div>
</template>

<style scoped>
label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: darkgray;
  font-weight: 800;
}

.is-invalid {
  border-color: #b22222;
  background-image: none;
}

.invalid-feedback {
  width: 100%;
  color: #b22222;
}
</style>


<script>
  import {is422} from './../shared/utils/response';
  import validationErrors from './../shared/mixins/validationErrors';
  
  export default {
    mixins: [validationErrors],
    props: {
        bookableId: [String, Number],
    },
    data() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            loading: false,
            status: null
        };
    },
    methods: {
        async check() {
            this.loading = true;
            this.errors = null;
            this.$store.dispatch("setLastSearch", {
                from: this.from,
                to: this.to
            });

            try{
              this.status = (await axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)).status;
              this.$emit("availability", this.hasAvailability);
            }catch(err){
              if (is422(err)) {
                  this.errors = err.response.data.errors;
              }

              this.status = err.response.status;
              this.$emit("availability", this.hasAvailability);
            }
            
            this.loading = false;            
        }
    },
    computed: {
        hasErrors() {
            return 422 == this.status && this.erros !== null;
        },
        hasAvailability() {
            return 200 == this.status;
        },
        noAvailability() {
            return 404 == this.status;
        },
    }    
};
</script>