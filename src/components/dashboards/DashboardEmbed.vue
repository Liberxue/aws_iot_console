<template>
<div class='dashboard-iframe-container'>
  <div class='dashboard-iframe'><iframe :src='dashData'></iframe></div>
</div>

</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      dashboard: null
    };
  },
  props: {
    dashId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    dashData () {
      // const link = 'https://iot.app.initialstate.com/embed/#/' + this.type + '/' + this.dashId;
      const link = 'https://cloudwatch.amazonaws.com/dashboard.html?dashboard=iot-dashboard&context=eyJSIjoidXMtZWFzdC0xIiwiRCI6ImN3LWRiLTM5MDMxODQ5NTczNSIsIlUiOiJ1cy1lYXN0LTFfWTBPUGhqV0JnIiwiQyI6IjRuZWc0OGVwdGJwbGo3ZmtzMDZmM205ZXByIiwiSSI6InVzLWVhc3QtMTo1Y2IwZDEzZS01NTFlLTRkYWUtYmY2Yy01YjdmZGE1OWQ4MjYiLCJNIjoiUHVibGljIn0=';
      return link;
    }
  }
};
</script>

<style scoped>

.dashboard-iframe-container {
  height: 100%;
  width: 100%;
}

.cwdb-dashboard-content {
    background-color: #fafdff  !important;
    border-top: 1px solid #fff  !important;
}
.dashboard-iframe {
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin: 0 auto;
}

iframe {
  margin: 0;
  padding: 0;
  flex: 1 1 auto;
  overflow: auto;
  display: block;
  border: none;
  width: 100%;
  height: 95%;
}
</style>
