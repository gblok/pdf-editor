import {existsSync, readdirSync, statSync, unlinkSync, rmdirSync, mkdirSync} from 'fs'
export const reMkDirSync = path => {
    if (existsSync(path)) {
        readdirSync(path).forEach(file => {
            const curr = path + '/' + file
            statSync(curr).isDirectory()
                ? reMkDirSync(curr)
                : unlinkSync(curr)
        })
        rmdirSync(path)
    }
    mkdirSync(path)
}