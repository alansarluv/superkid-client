<template>
  <div class="container-fluid container-content position-relative">
    <div v-if="!isMobileSidebar" @click="isMobileSidebar = true" class="mobile-menu btn"><i class="fas fa-bars"></i></div>    
    <atec-sidebar
      :isMobileSidebar='isMobileSidebar'
      @closeSidebar='isMobileSidebar = false'
    ></atec-sidebar>
    <div class="right-content report-page">
      <div class="row mx-0 mb-3 px-3">
        <div v-if="reportData.length !== 0" class="col-md-12 px-0">
          <h4>Nama anak : {{kidLists[0]['name']}} ({{ getAge(kidLists[0]['birthday'])}} tahun) </h4>
          <p class="c-pointer text-primary" data-toggle="collapse" href="#collapseCompare" role="button" aria-expanded="false" aria-controls="collapseCompare">Klik disini untuk bandingkan 2 laporan atec</p>
          <div class="collapse" id="collapseCompare">
            <div class="card card-body">
              <p>Pilih 2 laporan yang ingin dibandingkan {{atecCompare.atecCompare1}} - {{atecCompare.atecCompare2}}</p>
              <div class="row">
                <div class="col-sm-6">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="reportAtec1">First atec</label>
                        <select v-model="atecCompare.atecCompare1" class="form-control" id="reportAtec1">
                          <option 
                            v-for="list in reportData" 
                            :value="list._id"
                            :key='list._id'>
                            {{yearMonth(list.monthYear)}}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="reportAtec2">Second atec</label>
                        <select v-model="atecCompare.atecCompare2" class="form-control" id="reportAtec2">
                          <option 
                            v-for="list in reportData" 
                            :value="list._id"
                            :key='list._id'>
                            {{yearMonth(list.monthYear)}}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <button type="button" @click="compare()" class="btn btn-primary">Bandingkan</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>
      <div class="row d-none d-md-flex mx-0 px-3">
        <div class="col-12 text-center mb-3 pb-2 px-0 is-border-bottom">
          <div class="row">
            <div class="col-12 col-md-2 text-left">
              <p class="mb-0">Tahun dan Bulan</p>
            </div>
            <div class="col-12 col-md">
              <p class="mb-0">Kemampuan Bicara</p>
            </div>
            <div class="col-12 col-md">
              <p class="mb-0">Kemampuan Sosial</p>
            </div>
            <div class="col-12 col-md">
              <p class="mb-0">Kemampuan Sensorik</p>
            </div>
            <div class="col-12 col-md">
              <p class="mb-0">Kemampuan Umum</p>
            </div>
            <div class="col-12 col-md-1">
              <p class="mb-0">Total</p>
            </div>
            <div class="col-12 col-md-2">
              <p class="mb-0"></p>
            </div>
          </div>
        </div>
      </div>
      <template v-if="reportData.length === 0 && loadingReport === false">
        <h3 class="text-center">Belum ada laporan atec</h3>
      </template>
      <div class="mt-4" v-if="loadingReport">
        <div v-html="spinner"></div>
      </div>
      <div class="spinner-custom" v-show="loadingDetail">
        <div class="spinner-wrapper">
          <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>        
          <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>        
          <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>        
          <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>        
          <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>        
        </div>
      </div>

      <div v-for="list in reportData" :key='list.id' class="row mb-lg-2 mb-5 mx-0 px-3">
        <div class="col-12 col-md-12 text-md-center px-0">
          <div class="row">
            <div class="col-12 col-md-2 text-left mb-3 mb-md-0">
              <p class="mb-0 font-weight-bold">
                <span>{{yearMonth(list.monthYear)}}</span>
              </p>
            </div>
            <div class="col-12 col-md">
              <p class="mb-0">
                <span class="d-md-none">Kemampuan bicara : </span>
                {{list.bicaraTotal}}
              </p>
            </div>
            <div class="col-12 col-md">              
              <p class="mb-0">
                <span class="d-md-none">Kemampuan sosial : </span>
                {{list.sosialTotal}}
              </p>
            </div>
            <div class="col-12 col-md">
              <p class="mb-0">
                <span class="d-md-none">Kemampuan sensorik : </span>
                {{list.sensorikTotal}}
              </p>
            </div>
            <div class="col-12 col-md">
              <p class="mb-0">
                <span class="d-md-none">Kemampuan umum : </span>
                {{list.umumTotal}}
              </p>
            </div>
            <div class="col-12 col-md-1">
              <p class="mb-lg-0 mb-2">
                <span class="d-md-none font-weight-bold">Total skor: </span>
                {{list.bicaraTotal + list.sosialTotal + list.sensorikTotal + list.umumTotal }}
              </p>
            </div>  
            <div class="col-12 col-md-2">
              <p class="action-button my-0 mr-md-5 text-left">
                <button class="btn btn-primary btn-sm" type="button" @click="goto(list._id)">Detail</button>
                <button
                  class="btn btn-danger btn-sm ml-3"
                  type="button"
                  data-toggle="modal"
                  data-target="#modalDelete"
                  @click="dataDelete=list._id"
                >Hapus</button>
              </p>
            </div>  
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="modalDeleteLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalDeleteLabel">Hapus laporan</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Anda yakin ingin menghapus laporan pada bulan tersebut ?</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-ghost"
                data-dismiss="modal"
                ref="cancelmodalDelete"
              >Batalkan</button>
              <button type="button" @click="deleteList()" class="btn btn-danger">Hapus</button>
            </div>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Sidebar from '../partials/Sidebar';
  import { getAgeMixin, spinnerMixin } from '../../mixins/general';

  export default {
    components: {
      atecSidebar: Sidebar
    },
    data() {
      return {
        loadingReport: false,
        loadingDetail: false,
        reportData : [],
        dataDelete: "",
        kidLists: this.$store.getters.userKids || [],
        atecCompare: {
          atecCompare1: '',
          atecCompare2: '',
          atecCompareRes: [],
        },
        isMobileSidebar: false
      }
    },
    mixins: [spinnerMixin, getAgeMixin],
    watch: {
      "atecCompare.atecCompareRes": function() {
        if (this.atecCompare.atecCompareRes.length > 1) {
          console.log("compare disini");  // eslint-disable-line no-console
          this.$router.push({ 
            name: 'atec-compare',
            params: { compare: this.atecCompare.atecCompareRes }
          });
        }
      },
    },    
    methods: {
      yearMonth(val) {
        const year = val.slice(0,4);
        const monthNum = parseInt(val.substring(4));
        const monthNames = this.$store.getters.monthNames;
        return year + " - " + monthNames[monthNum-1];
      },
      goto(id){
        this.loadingDetail = true;
        const config = {
          headers: this.$store.getters.configHeader
        };
        let data = null;
        axios
          .get('/atec/detail/'+id, config)
          .then(res => {
            data = res.data.data;
            this.loadingDetail = false;
            if (res.status === 200 && data._id) {
              this.$router.push({ 
                name: 'atec-detail',
                params: { detail: data }
              });
            }
          })
          .catch(error => console.log("error: ", error)) // eslint-disable-line no-console
      },
      deleteList(){
        const id = this.dataDelete;
        this.loadingDetail = true;
        const config = {
          headers: this.$store.getters.configHeader
        };
        axios
          .delete('/atec/delete/'+id, config)
          .then(res => {
            this.loadingDetail = false;
            if (res.status === 200) {
              this.reportData = this.reportData.filter(list => list._id !== id);
            }
            const cancelmodalDelete = this.$refs.cancelmodalDelete;
            cancelmodalDelete.click();
          })
          .catch(
            error => {
              console.log("error: ", error) // eslint-disable-line no-console
              const cancelmodalDelete = this.$refs.cancelmodalDelete;
              cancelmodalDelete.click();
            })
      },
      compare() {
        if (this.atecCompare.atecCompare1 === '' || this.atecCompare.atecCompare2 === '') {
          alert("Pilih atec yang ingin dibandingkan");
        } else if (this.atecCompare.atecCompare1 === this.atecCompare.atecCompare2 ) {
          alert("Pilihan atec yang ingin dibandingkan harus berbeda")
        } else {
          this.loadingDetail = true;
          const config = {
            headers: this.$store.getters.configHeader
          };
          let data = null;
          this.atecCompare.atecCompareRes = [];
          axios
            .get('/atec/detail/'+this.atecCompare.atecCompare1, config)
            .then(res => {
              console.log("detail:", res) // eslint-disable-line no-console
              data = res.data.data;
              this.loadingDetail = false;
              if (res.status === 200 && data._id) {
                this.atecCompare.atecCompareRes.push(res.data);
              }
            })
            .catch(error => console.log("error: ", error)) // eslint-disable-line no-console

          axios
            .get('/atec/detail/'+this.atecCompare.atecCompare2, config)
            .then(res => {
              console.log("detail:", res) // eslint-disable-line no-console
              data = res.data.data;
              this.loadingDetail = false;
              if (res.status === 200 && data._id) {
                this.atecCompare.atecCompareRes.push(res.data);
              }
            })
            .catch(error => console.log("error: ", error)) // eslint-disable-line no-console
        }
      }
    },
    created() { 
      const user = this.$store.getters.user;
      const config = {
        headers: this.$store.getters.configHeader,
        params: {
          userId: user._id
        }
      }
      this.loadingReport = true;
      axios
        .get('/atec/report', config)
        .then(res => {
          const data = res.data;
          this.reportData = data.data;
          this.loadingReport = false;
        })  
        .catch(error => console.log("error: ", error)) // eslint-disable-line no-console
    }
  }
</script>
<style lang="scss" scoped>
  .report-page {
    .is-border-bottom {
      border-bottom: 1px solid #E2E2E2;
    }
    .btn-primary {
      border-color: #ffc40e;
      background-color: #ffc40e;
      color: #212121;
      padding: 4px 18px;
      &:hover {
        background-color: #ecb300;        
      }
    }
    .btn-danger {
      padding: 4px 18px;
    }
    .spinner-custom {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: black;
      opacity: .5;
      z-index: 2;
      margin-top: 0;
      
      .spinner-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        width: 400px;
        height: 100px;
        text-align: center;
        .spinner-border {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
  .mobile-menu {
    display: none;    
  }

  @media (max-width: 768px) {  
    .report-page {
      padding-left: 0 !important;
      padding-right: 0 !important;
      h4 {
        font-size: 18px;
      }
      .px-3 {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    }
    .mobile-menu {
      position: absolute;
      display: block;
      top: -18px;
      right: -18px;
      z-index: 3;
    }
  }

</style>