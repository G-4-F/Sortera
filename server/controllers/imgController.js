const path = require('path');
const fs = require('fs');
const { zip } = require('zip-a-folder');
const imgController = {};


 

imgController.addTaggedImages = (req, res, next) => {
    console.log('in add images')
    console.log('req.body', req.body)
    const files = req.body[0];
    const urls = req.body[1];
    console.log('files' ,files)
    fs.mkdir('taggedPhotoFolder')

    files.forEach((file, idx) => {
        var dir = path.dirname(file);
        console.log(file, dir + "/" + urls[idx])
        fs.renameSync(file, dir + "/" + urls[idx]);
        fs.writeFileSync(__dirname + '/taggedPhotoFolder', "/" + urls[idx]);
    })
    //now zip that folder and send the zip somewhere
    class ZipAFolder {
 
        static async main() {
            const response = await zip('/taggedPhotoFolder', '/zippedFile.zip');
            console.log('response', response)
        }
    }
    console.log('before await zipp')
    ZipAFolder.main();
    return next();
}

module.exports = imgController;