const sass = require('sass');
const mozjpeg = require('imagemin-mozjpeg');
const loadGruntTasks = require('load-grunt-tasks');

module.exports = function (grunt) {
  //配置参数
  grunt.initConfig({
    clean: {
      dist: ['dist/**']
    },
    connect: {
      server: {
        options: {
          protocol: 'http',
          port: 8081,
          hostname: '*',
          keepalive: true,
          open: true,
          base: ['dist', 'src', 'public']
        }
      }
    },
    watch: {
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['sass'],
      },
      babel: {
        files: ['src/**/*.js'],
        tasks: ['babel']
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['html_template', 'useref'],
      }
    },
    useref: {
      html: 'dist/**/*.html',
      // explicitly specify the temp directory you are working in
      // this is the the base of your links ( "/" )
      temp: 'dist'
    },
    html_template: {
      options: {
        locals: {
          pkg: grunt.file.readJSON('package.json'),
          menus: [
            {
              name: 'Home',
              icon: 'aperture',
              link: 'index.html'
            },
            {
              name: 'Features',
              link: 'features.html'
            },
            {
              name: 'About',
              link: 'about.html'
            },
            {
              name: 'Contact',
              link: '#',
              children: [
                {
                  name: 'Twitter',
                  link: 'https://twitter.com/w_zce'
                },
                {
                  name: 'About',
                  link: 'https://weibo.com/zceme'
                },
                {
                  name: 'divider'
                },
                {
                  name: 'About',
                  link: 'https://github.com/zce'
                }
              ]
            }
          ],
          date: new Date()
        },
      },
      dist: {                                      // Target
        files: [{
          expand: true,
          cwd: "src/",
          src: "**/*.html",
          dest: "dist/",
          ext: ".html"
        }]
      },
    },
    htmlmin: {
      options: {                                 // Target options
        removeComments: true, //移除注释
        removeCommentsFromCDATA: true,//移除来自字符数据的注释
        collapseWhitespace: true,//无用空格
        collapseBooleanAttributes: true,//失败的布尔属性
        removeAttributeQuotes: true,//移除属性引号      有些属性不可移走引号
        removeRedundantAttributes: true,//移除多余的属性
        useShortDoctype: true,//使用短的跟元素
        removeEmptyAttributes: true,//移除空的属性
        removeOptionalTags: true,//移除可选附加标签
        minifyCSS: true,
        minifyJS: true,
      },
      // Task
      dist: {                                      // Target
        files: [{
          expand: true,
          cwd: "dist/",
          src: "**/*.html",
          dest: "dist/",
          ext: ".html"
        }]
      },
    },
    sass: {
      options: {
        sourceMap: false,
        implementation: sass,
      },
      dist: {
        files: [{
          expand: true,
          cwd: "src/",
          src: "**/*.scss",
          dest: "dist/",
          ext: ".css"
        }]
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'public',
        src: '**',
        dest: 'dist/',
      },
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: [{
          expand: true,
          cwd: "src/",
          src: "**/*.js",
          dest: "dist/",
          ext: ".js"
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/assets/images',
          src: '**',
          dest: 'dist/assets/images'
        }, {
          expand: true,
          cwd: 'src/assets/fonts',
          src: '**',
          dest: 'dist/assets/fonts'
        }]
      }
    }
  });

  //载入uglify插件，压缩js
  loadGruntTasks(grunt);
  //注册任务
  grunt.registerTask('build', ['clean', 'html_template', 'babel', 'sass', 'useref', 'concat', 'uglify', 'cssmin', 'htmlmin', 'imagemin', 'copy']);
  grunt.registerTask('dev', ['clean', 'html_template', 'babel', 'sass', 'useref', 'concat', 'uglify', 'cssmin', 'htmlmin', 'imagemin', 'copy', 'connect']);
  grunt.registerTask('clear', ['clean']);
};