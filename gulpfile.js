/* Tareas con gulp */
/* Funciones de gulp  */
const { src , dest , watch  , parallel} = require('gulp');
/* Importando sass */
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

/* Dependecias para imagenes */
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const imgemin = require('gulp-imagemin');
const avif = require('gulp-avif');



function css ( done ){
    
    //Identificar el archivo de sass
    //Compilar 
    //Almacenar el archivo

    src('src/scss/app.scss')
        .pipe( plumber())
        .pipe( sass() )
        .pipe( dest("build/css"));

    done(); //Callback avisa a gulp que termino;
}

function javascript( done ){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));

    done();
}



function dev( done ){
    
    watch('src/scss/**/*.scss' , css);
    watch('src/js/**/*.js' , javascript);
    done();
}

function imagenes(done){

    const opciones = {
        optimizationLevel: 3,
    }

    src('src/img/**/*.{png,jpg}')
    .pipe( cache(imgemin(opciones)) )
    .pipe( dest("build/img"));
    done();


    done();
}

function versionWebp ( done ){
    
    const opciones = {
        quality:50,
    }

    src('src/img/**/*.{png,jpg}')
    .pipe( webp(opciones) )
    .pipe( dest("build/img"));
    done();
}

function versionAvif ( done ){
    
    const opciones = {
        quality:50,
    }

    src('src/img/**/*.{png,jpg}')
    .pipe( avif(opciones) )
    .pipe( dest("build/img"));
    done();
}


exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(versionAvif ,versionWebp , dev , imagenes , javascript);

