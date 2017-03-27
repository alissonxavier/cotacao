/*jslint
    devel:true, maxerr: 10
*/

/*global
    required:true
*/

/*
 *  Gulpfile
 *  @author DICLIX MVP Residencial
 */


(function () {
    
    'use strict';

  
    var gulp = require('gulp'),
    	timestamp = new Date().getTime(),	
        gulpConfig = {
            run: {
                bower: require('gulp-bower'),
                concat: require('gulp-concat'),
                connect: require('gulp-connect'),
                rimraf: require('gulp-rimraf'),
                sass: require('gulp-ruby-sass'),
                sequence: require('run-sequence'),
                sourcemaps: require('gulp-sourcemaps'),
            	minify: require('gulp-minify'),
            	htmlreplace: require('gulp-html-replace'),
                spsave: require("spsave").spsave
                },

            path: {
                folder: {
                    app: {
                        assets: {
                            base: 
                                [
                                    './assets/fonts',
                                    './assets/images'
                                ]
                        },

                        vendor: {
                            base: './vendor'
                        },

                        dist: {
                            base: './dist',
                            js: './dist/js',
                            css: './dist/css',
                            templates: './dist/templates',
                            components: './dist/components'

                        },

                        i18n: {
                            base: './src/app/i18n/**/*',

                            dist: {
                                base:'./dist/i18n'
                            }
                        }
                    },

                    httpd: {
                        base: './dist'
                    },

                    node: {
                        base: './node_modules'
                    }
                },

                files: {
                    vendor: {
                        js: [
                            './Vendor/angular/angular.js',
                            './Vendor/jquery/dist/jquery.min.js',
                            './Vendor/angular-route/angular-route.min.js',
                            './Vendor/angular-mask/dist/ngMask.js',
                            './Vendor/angularjs-slider/dist/rzslider.min.js'
                            
                        ],
                        
                        css: [
                            './Vendor/bootstrap/dist/css/bootstrap.min.css',
                            './Vendor/bootstrap/dist/css/bootstrap-theme.min.css',
                            './Vendor/font-awsome/css/font-awesome.css',
                            './Vendor/angularjs-slider/dist/rzslider.css'
                        ]
                    },

                    app: {
                        html: [
                            './index.html',
                            './templates/**/*.html'
                        ],
                        js: [
                            '!./assets/config/',
                            '!./assets/config/**',
                            './assets/**/*.js'
                        ],
                        config: './assets/config/',
                        css : './assets/css/*.css'
                    },

                }
            },

            filename: {
                'app': {
                    'js': 'app.js',
                    'css': 'app.css'
                },

                'vendor': {
                    'js': 'vendor.js',
                    'css': 'vendor.css'
                }
            },

            errorthrow: function (error) {
                console.log(error.toString());
                this.emit('end');
            },

            changeswatch: function (event) {
                console.log('File ' + event.path + ' was ' + event.type);
            }
        };


    /*
     *
     *  @task Http Server
     *  @description Instancia um servidor web para desenvolvimento
     *
     */
    gulp.task('httpd', function () {
        gulpConfig.run.connect.server({
            root: gulpConfig.path.folder.httpd.base,
            livereload: true,
            port: 3000
        });
    });

    gulp.task('httpd-reload', function () {
        gulp.src(gulpConfig.path.folder.httpd.base)
            .pipe(gulpConfig.run.connect.reload());
    });


    /*
     *
     *  @task Bower
     *  @description Baixa todas as dependencias de terceiros de acordo com o bower.json
     *
     */
    gulp.task('bower', function () {
        return gulpConfig.run.bower(gulpConfig.path.folder.app.vendor.base, { cmd: 'update'});
    });


    /*
     *
     *  @task Vendor
     *  @description Agrupa todos as dependencias de terceiros em único arquivo
     *
     */
    gulp.task('vendor', function (callback) {
        gulpConfig.run.sequence('vendor:js', 'vendor:css', callback);
    });
    
    /*
    *
    *  @task compress
    *  @description Se o ambiente for de produção ele minimifica os arquivis js
    *
    */
    gulp.task('compress', function (callback) {
    	var argv = require('yargs').argv;
        var configPath = argv.environment || 'dev';
		if (configPath == 'prod') {
			gulpConfig.run.sequence('compress:js', 'clean:js', callback);
		} 
    });

    gulp.task('vendor:js', function () {
        return gulp.src(gulpConfig.path.files.vendor.js)
            .pipe(gulpConfig.run.concat(gulpConfig.filename.vendor.js))
            .on('error', gulpConfig.errorthrow)
            .pipe(gulp.dest(gulpConfig.path.folder.app.dist.js))
            .on('error', gulpConfig.errorthrow);
    });

    gulp.task('vendor:css', function () {
        return gulp.src(gulpConfig.path.files.vendor.css)
            .pipe(gulpConfig.run.concat(gulpConfig.filename.vendor.css))
            .on('error', gulpConfig.errorthrow)
            .pipe(gulp.dest(gulpConfig.path.folder.app.dist.css))
            .on('error', gulpConfig.errorthrow);
    });

     gulp.task('translate:json', function () {
        return gulp.src(gulpConfig.path.folder.app.i18n.base)
            .pipe(gulp.dest(gulpConfig.path.folder.app.i18n.dist.base))
            .on('error', gulpConfig.errorthrow);
    });


    /*
     *
     *  @task App
     *  @description Gerador da aplicação
     *
     */
    gulp.task('app', function (callback) {
        //,'app:components'
        gulpConfig.run.sequence('translate:json','app:js','app:css', 'app:html', 'app:subhtml', 'app:assets', 'jqui-images', callback);
    });

    gulp.task('app:js', function () {
        //  Unifica todos os js da aplicação
        var streamqueue = require('streamqueue');
        var argv = require('yargs').argv;
        var configPath = argv.environment || 'dev';

        console.log('Building in ' + configPath + ' mode');
  
        return streamqueue({objectMode: true},
            gulp.src(gulpConfig.path.files.app.js),
            gulp.src(gulpConfig.path.files.app.config + '*.js'),
            gulp.src(gulpConfig.path.files.app.config + configPath + '/*.js')
        )
            .pipe(gulpConfig.run.concat(gulpConfig.filename.app.js))
            .on('error', gulpConfig.errorthrow)
            .pipe(gulp.dest(gulpConfig.path.folder.app.dist.js))
            .on('error', gulpConfig.errorthrow);
    });
    
    /*
    *
    *  @task compress:js
    *  @description Executa tarefas de minificar os arquivos app e vendor.js
    *
    */

	gulp.task('compress:js', function() {
		var streamqueue = require('streamqueue');
		return streamqueue({objectMode: true},
		gulp.src(gulpConfig.path.folder.app.dist.js +'/' + gulpConfig.filename.app.js),
		gulp.src(gulpConfig.path.folder.app.dist.js +'/' + gulpConfig.filename.vendor.js)
		)
		    .pipe(gulpConfig.run.minify({
		        ext:{
		            src:'-temp.js',
		            min:'.js'
		        },
		        mangle: false,
	            compress: false
		    })
		    )
		    .pipe(gulp.dest(gulpConfig.path.folder.app.dist.js))
		});

    gulp.task('app:css', function () {
        console.log(gulpConfig.path.files.app.css);
        return gulp.src(gulpConfig.path.files.app.css)
            .pipe(gulpConfig.run.concat(gulpConfig.filename.app.css))
            .on('error', gulpConfig.errorthrow)
            .pipe(gulp.dest(gulpConfig.path.folder.app.dist.css))
            .on('error', gulpConfig.errorthrow);
    });

    gulp.task('app:html', function () {
        //  Move o template principal da aplicação
        return gulp.src(gulpConfig.path.files.app.html[0])
            .pipe(gulp.dest(gulpConfig.path.folder.app.dist.base))
            .on('error', gulpConfig.errorthrow);
    });

    gulp.task('app:subhtml', function () {
        //  Move os sub-templates da aplicação
        return gulp.src(gulpConfig.path.files.app.html[1])
            .pipe(gulp.dest(gulpConfig.path.folder.app.dist.templates))
            .on('error', gulpConfig.errorthrow);
    });

    /*gulp.task('app:components', function () {
        //  Move os componentes da aplicação
        return gulp.src(gulpConfig.path.files.app.html[2])
            .pipe(gulp.dest(gulpConfig.path.folder.app.dist.components))
            .on('error', gulpConfig.errorthrow);
    });*/

    gulp.task('app:assets', function () {

        //  Move assets da aplicação
        return gulp.src(gulpConfig.path.folder.app.assets.base + '/**/*')
            .pipe(gulp.dest(gulpConfig.path.folder.app.dist.base))
            .on('error', gulpConfig.errorthrow);
    });

    /*
    *
    *  @task clean:js
    *  @description Modifica as referencias dos arquivos .js e .css na pagina index.html para usarem
    *  os arquivos novos criados com o timestamp
    */
    gulp.task('htmlreplace', function() {
    	  gulp.src(gulpConfig.path.folder.app.dist.base + '/index.html')
    	    .pipe(gulpConfig.run.htmlreplace({
    	        'css_vendor': 'css/'+ gulpConfig.filename.vendor.css,
    	        'css_app': 'css/'+ gulpConfig.filename.app.css,
    	        'js_vendor': 'js/'+ gulpConfig.filename.vendor.js,
    	        'js_app': 'js/'+ gulpConfig.filename.app.js
    	    }))
    	    .pipe(gulp.dest(gulpConfig.path.folder.app.dist.base));
    	});

    /*
     *
     *  @task Clean
     *  @description Limpa diretórios temporários
     *
     */

    gulp.task('clean', function () {
        return gulp.src(gulpConfig.path.folder.app.dist.base, {read: false})
            .pipe(gulpConfig.run.rimraf())
            .on('error', gulpConfig.errorthrow);
    });

    gulp.task('clean:all', ['clean'], function () {
        gulp.src(gulpConfig.path.folder.node.base, {read: false})
            .pipe(gulpConfig.run.rimraf())
            .on('error', gulpConfig.errorthrow);

        gulp.src(gulpConfig.path.folder.app.vendor.base + '/*', {read: false})
            .pipe(gulpConfig.run.rimraf())
            .on('error', gulpConfig.errorthrow);
    });
    
   
    /*
    *
    *  @task clean:js
    *  @description Limpa arquivos temporários js que são salvos quando minimificamos
    *
    */
    gulp.task('clean:js', function () {
        gulp.src(gulpConfig.path.folder.app.dist.js + '/*-temp.js', {read: false})
            .pipe(gulpConfig.run.rimraf())
            .on('error', gulpConfig.errorthrow);
    });

    /*
     *
     *  @task Watch
     *  @description Executa tarefas nos arquivos/diretórios que estão em "escuta" pelo GulpJS
     *
     */
    gulp.task('watches', function () {
        gulp.watch(gulpConfig.path.files.app.html, ['watches:html'])
            .on('change', function (event) { gulpConfig.changeswatch(event); });

        gulp.watch(gulpConfig.path.files.app.js, ['watches:js'])
            .on('change', function (event) { gulpConfig.changeswatch(event); });

        gulp.watch(gulpConfig.path.folder.app.i18n.base, ['watches:json'])
            .on('change', function (event) { gulpConfig.changeswatch(event); });
    });

    gulp.task('watches:html', function (callback) {
        //'app:components'
        gulpConfig.run.sequence('app:html', 'htmlreplace', 'app:subhtml', 'httpd-reload', callback);
    });

    gulp.task('watches:js', function (callback) {
        gulpConfig.run.sequence('app:js', 'htmlreplace', 'httpd-reload', callback);
    });

    gulp.task('watches:json', function (callback) {
        gulpConfig.run.sequence('translate:json', callback);
    });


    gulp.task('jqui-images',function () {
        gulp.src('./vendor/jquery-ui/themes/base/images/**/*')
            .pipe(gulp.dest('dist/css/images'));
    });

    /*
    * Upload para o sharepoint
    *
    */
    gulp.task('upload-to-sp', function(){
        
        var argv = require('yargs').argv;
        var config = require('./gulp.config')();
        
        var configPath = argv.environment || 'dev';
        var user = config.UserConfig[configPath];
        var spFolder = config.SPConfig.UploadSPFolderJS
    
        var creds = {
            username: user.userName,
            password: user.passWord,
            domain: user.domain
        };
        var fileOpts =  {
                glob: 'dist/**/*.*',
                base: 'dist',
                folder: 'SiteAssets'
        };

        var coreOpts = {
            siteUrl: user.siteUrl
        };

        gulpConfig.run.spsave(coreOpts, creds, fileOpts)
        .then(function(data){
            console.log('File uploaded!');
        })
        .catch(function(err){
            console.log('Error occurred');
        });
    });

    /*
     *
     *  @task Users Tasks
     *  @description Tarefas gerais
     *
     */
    gulp.task('default', ['build']);

    gulp.task('watch', function (callback) {
        gulpConfig.run.sequence('clean', 'vendor', 'app', 'htmlreplace', 'httpd', 'watches', callback);
    });

    gulp.task('build', function (callback) {
        gulpConfig.run.sequence('clean', 'bower', 'vendor', 'app', 'htmlreplace', 'compress', callback);
    });
    
}());