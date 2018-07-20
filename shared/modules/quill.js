import {dataUriToBuffer, ERR, isObject, LOG, NO_OP, pdf} from './'
import {FONTS} from '../../.etc/config/paths'
import request from 'superagent'

const Quill = IS_CLIENT ? require('quill') : NO_OP

//import Quill from 'quill'


// ToDo to global app config
let FontsIsReady = false

const FontMap = new Map([
        ['Regular', 'Roboto/Regular'],
        ['Italic', 'Roboto/Italic'],
        ['Bold', 'Roboto/Bold'],
        ['BoldItalic', 'Roboto/BoldItalic']
    ]
)


const fetchFont = uri => request.get(`${FONTS}/${uri}.ttf`).responseType('arraybuffer')

const prepFonts = config => {

    const
        keys = Array.from(FontMap.keys()),
        fetchs = Array.from(FontMap.values(), fetchFont)

    Promise.all(fetchs)
        .then(a => a.forEach(({body: font}, idx) => FontMap.set(keys[idx], new pdf.Font(body))))
        .then(() => FontsIsReady = true)
        .catch(ERR)
}


const
    placeholder = 'PDF контент...',
    theme = 'snow',
    toolbar = {
        container: '#toolbar',
        container: [
            [{'font': []}],
            [{size: ['small', false, 'large', 'huge']}],
            ['bold', 'italic'],
            ['image'],
            [{'align': []}],
            [{'color': []}, {'background': []}],
            ['clean']
        ]
    }


const parseQuill = ({ops}) => {

    // embeded font font: FontMap.get('Regular')

    //doc
    const doc = new pdf.Document  // fontSize: 11, lineHeight:1.15, padding:20

    //header
    const header = doc.header().table({widths: [null, null], paddingBottom: 1 * pdf.cm}).row()
    header.cell()
    header.cell().text({textAlign: 'right'}).add('Demo')

    //footer
    doc.footer().pageNumber((curr, total) => `${curr} / ${total}`, {textAlign: 'center'})

    //handler content


    LOG({ops})

    // const cell = doc


    for (let {insert, attributes = null} of ops) {


        //LOG({insert})


        if (isObject(insert)) {


            const
                src = dataUriToBuffer(insert.image),
                img = new pdf.Image(src)

            doc.image(img)


        } else {

            LOG({insert, attributes}, insert.length)

            // const
            //     cells = insert.split(/\n/),
            //     max = cells.length

            doc.text(insert, attributes)


            /// LOG({cells})

            // cells.forEach((txt, idx) => {
            //
            //
            //     // if(txt.length){}
            //     LOG({txt}, txt.length, {idx}, {max})
            //
            //     cell.text().append(txt)
            //
            //
            //     // if (txt.length === 0)
            //     //     cell.text().br()
            //     // else
            //
            //
            //
            //     //txt = String(txt)
            //     //Boolean(txt) ? cell.add(txt) : cell.br()
            //
            //
            // })
        }


        // if (isObject(insert)) {
        //
        //     // set Img Node
        //     const
        //         src = dataUriToBuffer(insert.image),
        //         img = new pdf.Image(src)
        //
        //     doc.image(img)
        //
        // } else {
        //
        //     // set Text Node
        //
        //     // insert.replace(/^\n+/, '').replace(/\n+$/, '')
        //
        //     const cells = insert.split(/\n/)
        //
        //     cells.forEach(txt => {
        //         txt = String(txt)
        //         txt.length ? cell.add(txt) : cell.br()
        //     })
        // }
    }


    return doc


}


/*const getImageDimensions = file => new Promise(function (resolved, rejected) {

    const img = new Image
    img.src = file
    img.onload = () => resolved({w: img.width, h: img.height})

})
const selectLocalImage = () => {

    const input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.click()
    input.onchange = () => {

        const file = input.files[0]

        (/^image\//.test(file.type))
            ? saveToServer(file)
            : ERR('You could only upload images.')
    }

}
const setImgScr = (uri, opts) => {

    const
        src = uri.split('/'),
        name = src.pop()

    src.push(opts)
    src.push(name)

    return src.join('/')
}
const saveToServer = file => {

    const fd = new FormData()

    const folder = doc.get('id').val

    fd.append('image', file)
    fd.append('folder', folder)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/v1/upload')
    xhr.onload = () => {
        if (xhr.status === 200) {
            const url = JSON.parse(xhr.responseText).url
            insertToEditor(url)
        }
    }
    xhr.send(fd)
}
const insertToEditor = (url, editor) => editor.insertEmbed(editor.getSelection().index, 'image', `${url}`)*/


const editor = (node, bar) => {

    // ToDo to global prepare async fn
    // await prepFonts()

    const editor = new Quill(node, {
            placeholder,
            theme,
            modules: {
                toolbar: {
                    container: '#toolbar',
                    // toolbarOptions : [
                    //     [{'font': []}],
                    //     [{size: ['small', false, 'large', 'huge']}],
                    //     ['bold', 'italic'],
                    //     ['image'],
                    //     [{'align': []}],
                    //     [{'color': []}, {'background': []}],
                    //     ['clean']
                    // ]
                }
            },
        }
    )


// editor.on('text-change', (delta, oldDelta, source) => {
//     LOG(delta, oldDelta, source)
//     hub.emit('CHANGE', {show:'true'})
// })

// editor.getModule('toolbar').addHandler('image', selectLocalImage)

    return editor

}

const getBlobUrl = doc => doc.asBuffer().then(buf => URL.createObjectURL(new Blob([buf], {type: 'application/pdf'})))

export {editor, parseQuill, getBlobUrl}