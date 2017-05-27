module.exports = function(grunt) {

  // require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dev: {
        src: ['public/assets/javascript/modules/*.js'],
        dest: 'public/assets/javascript/modules.js',
      },
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
  },
  nodemon: {
    dev: {
      script: 'server.js',
      options: {
        // nodeArgs: ['--debug'],
        env: {
          PORT: '8080'
        },
        // omit this property if you aren't serving HTML files and
        // don't want to open a browser tab on start
        callback: function (nodemon) {
          nodemon.on('log', function (event) {
            console.log(event.colour);
          });

          // opens browser on initial server start
          nodemon.on('config:update', function () {
            // Delay before server listens on port
            setTimeout(function() {
              require('open')('http://localhost:8080');
            }, 1000);
          });

          // refreshes browser when server reboots
          nodemon.on('restart', function () {
            // Delay before server listens on port
            setTimeout(function() {
              require('fs').writeFileSync('.rebooted', 'rebooted');
            }, 1000);
          });
        }
      }
    }
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
      },
      server: {
        files: ['.rebooted'],
        options: {
          livereload: true
        }
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
grunt.loadNpmTasks('grunt-contrib-nodemon');
grunt.loadNpmTasks('grunt-concurrent');
grunt.loadNpmTasks('grunt-contrib-concat');
};
