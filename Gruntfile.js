module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Custom paths
    path :  {
      src : {
        js      : 'src/js/**/*.js',
        jsLib   : 'src/js/lib',
        css     : 'src/css',
        cssLess : 'src/css/**/*.less',
        cssMain : 'src/css/main.less'
      },
      dest : {
        js      : 'webapp/js/<%= pkg.name %>.js',
        jsMin   : 'webapp/js/<%= pkg.name %>.min.js',
        css     : 'webapp/css/<%= pkg.name %>.css',
        cssMin  : 'webapp/css/<%= pkg.name %>.min.css'
      }
    },


    //Setting up uglify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          '<%= path.dest.jsMin %>' : ['<%= path.src.jsLib %>/jquery.js','<%= path.src.js %>']
        }
      }
    },

    //Setting up less
    less: {
      development: {
        options: {
          paths: ['<%= path.src.css %>'],
          compress : true,
          yuicompress : true
        },
        files: {
          '<%= path.dest.css %>': '<%= path.src.cssMain %>'
        }
      }
    },

    //Setting up watch
    watch: {
      scripts : {
        files: ['<%= path.src.js %>'],
        tasks: ['uglify']
      },

      styles : {
        files: ['<%= path.src.cssLess %>'],
        tasks: ['less']
      }
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default tasks
  grunt.registerTask('default', ['uglify', 'less:development', 'watch']);

};