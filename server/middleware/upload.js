import {existsSync, mkdirSync, renameSync, unlinkSync} from 'fs'
import {join} from 'path'
import {IncomingForm} from 'formidable'
import {STORAGE} from '../../.etc/config/paths'

const filePath = file => {

    const
        {path, name: nativeFileName, hash} = file,
        ext = nativeFileName.split('.').pop(),
        folderPath = STORAGE,
        fileName = hash + '.' + ext,
        newPath = join(folderPath, fileName),
        filePath = '/' + fileName


    /// console.log({fileName})

    if (!existsSync(folderPath))
        mkdirSync(folderPath)


    if (existsSync(newPath))
        unlinkSync(newPath)


    if (!existsSync(newPath))
        renameSync(path, newPath)


    return filePath
}
export const FormParser = async (req, done) => {


    const form = new IncomingForm()

    form.hash = 'md5'
    form.uploadDir = STORAGE
    form.keepExtensions = true

    await new Promise((resolve, reject) => form.parse(req, (err, fields, files) => {

        console.log({files})

        // err
        //     ? reject(req.status = 400)
        //     : resolve(req.filePath = filePath(Object.values(files)[0], folder, name))

        const fp = filePath(Object.values(files)[0])

         console.log('ss', {files}, {fp})


        resolve(done(err, files))

    }))

}
