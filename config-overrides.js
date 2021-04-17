const { 
  override,
  fixBabelImports,
  addLessLoader
 } = require('customize-cra')
 // modifyVars

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true
   }),
   addLessLoader({
     javascriptEnabled: true,
     // modifyVars
     cssModules: {
       localIndentName: "[path][name]-[local]-[hash:5]"
     },
     modifyVars: { '@primary-color': '#722ed1' }
   })
 )