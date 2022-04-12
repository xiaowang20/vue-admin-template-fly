<template> 
  <employee-detail :is-edit='true'></employee-detail>
</template>
<script>
  import EmployeeDetail from './components/EmployeeDetail'
  export default {
    name: 'addEmployee',
    components: { EmployeeDetail }
  }
</script>
<style>
</style>


