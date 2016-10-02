module.exports = {
    script: {
        map: './',
        src: ['node_modules/@types/**/index.d.ts', 'src/ts/**/*.{ts,tsx}'],
        dst: 'public/js'
    },

    style: {
        src: ['src/less/*.less'],
        dst: 'public/css'
    },

    copy: {
        src: 'src/html/*.*',
        dst: 'public'
    },

    watch: {
        less: 'src/less/**/*.less',
        ts: 'src/ts/**/*.{ts,tsx}',
        css: 'public/css/**/*.css'
    }
}
