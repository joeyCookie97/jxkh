module.exports = {
    // 解决 warn: You are using the runtime-only build of Vue where the template 
    //       compiler is not available. Either pre-compile the templates 
    //       into render functions, or use the compiler-included build
    // 您正在使用仅在运行时构建的Vue，其中模板编译器不可用。要么将模板预编译为呈现函数，要么使用包含编译器的构建

    // 在项目配置的时候，默认 npm 包导出的是运行时构建，即 runtime 版本，不支持编译 template 模板。
    // vue 在初始化项目配置的时候，有两个运行环境配置的版本：Compiler 版本、Runtime 版本。
    // Compiler 版本：可以对 template 模板内容进行编译（包括字符串模板和可以绑定的 html 对象作为模板）
    // Runtime 版本：使用 vue-loader 加载.vue 文件（组件文件）时，webpack 在打包过程中对模板进行了渲染。
    runtimeCompiler: true 
}