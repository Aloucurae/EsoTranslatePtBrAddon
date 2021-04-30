const totalLength = 130;

const fill = (length, char = '─') => {
    let str = '';
    while (str.length < Math.round(length)) {
        str += char;
    }
    return str;
};

const calcCentrer = (total, filled) => {
    let size = total - filled;
    size = Math.ceil(size / 2);
    return size;
};

module.exports = {

    body: (data = '', pre) => {

        let res = [];

        data = data.split("\n");

        for (const str of data) {
            if (str != '') {

                let x = '';
                x = str.trim();
                x = '│ ' + x;
                x += fill(totalLength - (x.length + 1), ' ') + "│";

                res.push(x);
            }
        }

        if (pre) {
            console.log(pre, res.join("\n"));
        } else {
            console.log(res.join("\n"));
        }

    },

    title: (titulo) => {
        let str = '┌';

        titulo = titulo.trim();

        titulo = `┤ ${titulo} ├`;

        let mark = fill(calcCentrer(totalLength - 2, titulo.length));

        str += mark + titulo + mark;

        str += '┐';

        console.log(str);
    },

    log: (titulo) => {
        let str = '├';

        titulo = titulo.trim();

        titulo = `┤ ${titulo} ├`;

        let mark = fill(calcCentrer(totalLength, titulo.length + 2));

        str += mark + titulo + mark;

        str += '┤';

        console.log(str + "\n");
    },

    botton: (titulo) => {
        let str = '└';
        let mark = '';

        if (titulo) {

            titulo = titulo.trim();
            titulo = `┤ ${titulo} ├`;
            mark = fill(calcCentrer(totalLength - 2, titulo.length));

        } else {
            titulo = '';
            mark = fill(calcCentrer(totalLength, 2));
        }

        str += mark + titulo + mark;

        str += '┘';

        console.log(str);
    },

    fill: fill,

    calcCentrer: calcCentrer

    // const buildPath = path.resolve(__dirname, '../extract/');
    // const gameFolder = path.resolve(basegameFolder + '\\depot\\eso.mnf');

    // const args = ` "${gameFolder}" ${buildPath}\\`;

    // const filesToExtract = [
    //     'en.lang',
    //     'en_client.lua',
    //     'en_pregame.lua'
    // ];

    // const src = path.resolve(__dirname, './EsoExtractData.exe');

    // // Error:

    // filesToExtract.forEach(file => {

    //     console.log("\n");
    //     console.log(`┌───────────────────────────┤ Extraindo arquivo ${file} ├───────────────────────────┐ \n`);

    //     var code = execSync(`${src} ${args}  -n ${file}`).toString();
    //     console.log(code);


    //     console.log(`└───────────────────────────┤ Arquivo extraido ${file} ├───────────────────────────┘ \n`);


    //     // len = 124
    // });

    //               'Warning: Skipping duplicate file 'C:\xampp\htdocs\ESOTranslateTool-master\lib\extract\gamedata\lang\en.lang' with index 834!'

    // '┌ ─ ┐ └ ─ ┘ │'

}