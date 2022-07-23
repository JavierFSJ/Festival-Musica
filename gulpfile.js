/* Tareas con gulp */
/* Funciones de gulp  */
const { src , dest , watch } = require('gulp');
/* Importando sass */
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

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

function dev( done ){
    
    watch('src/scss/**/*.scss' , css);
    done();
}



exports.css = css;
exports.dev = dev;