module.exports = function(grunt) {

  // require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/assets/javascript/modules/*.js'],
        dest: 'public/assets/javascript/modules.js',
      },
    },
    watch: {
      options: {
        spawn: false
      },
      handlebars: {
        files: ['views/*.handlebars'],
        tasks: ['handlebars:compile']
      },
      concat: {
        files: ['public/assets/javascript/modules/*.js'],
        tasks: ['concat:dist']
      }
    },
    handlebars: {
      options: {
        namespace: 'Template',
        processName: function(filePath) {
            return filePath.replace(/^views\//, '').replace(/\.handlebars/, '');
        }
      },
      compile : {
        files: {
          'public/assets/javascript/modules/templates.js' : ['views/*.handlebars'],
        }
      }
    }
  });
grunt.registerTask('default', ['handlebars', 'concat']);
grunt.loadNpmTasks('grunt-contrib-handlebars');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
};
