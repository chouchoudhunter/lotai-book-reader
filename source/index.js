 const modulesFiles=require.context('./modules', true, /\.js$/)//引入目录下所有模块
 const modules = modulesFiles.keys().reduce((modules, modulePath) => {
   // 根据文件名设置模块名
   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
   const value = modulesFiles(modulePath)
   modules[moduleName] = value.default
   return modules
 }, {})
 export default modules