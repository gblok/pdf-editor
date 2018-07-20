import {Component, editor, editor$, getBlobUrl, parseQuill, scrollTo, store} from '../../modules'

//import html2canvas from 'html2canvas'
//import html2pdf from 'html2pdf.js'
//import html2pdf from 'html2pdf.js'


export default class extends Component {

    state = {href: null}
    quill = null

    componentDidMount() {
        this.quill = editor(this.el, this.bar)
        editor$.observe(({ops}) => {
            scrollTo()
            this.quill.setContents(ops)
        })
    }


    delete = () => {

    }

    pdf = () => {

    }

    save = () => {

        const doc = this.quill.getContents()

        store.set({cid: 'docs'}, doc)


        //  fetch({method:'post', cid:'docs', data})

        getBlobUrl(parseQuill(doc)).then(href => this.setState({href}))

    }


    render(props, {href}) {

        return <editor>
            <toolbar id='toolbar'>
                <button className='ql-bold'></button>
                <button className='ql-italic'></button>
                <button className='ql-image'></button>
                <select className='ql-color'></select>
                <button onClick={this.save}>Save</button>
                <br/>
                {
                    href
                        ? <a href={href} download>Download PDF</a>
                        : null
                }
            </toolbar>
            <page ref={n => this.el = n}></page>
        </editor>
    }
}


// pre = () => {
//
//
//     // html2canvas(this.el)
//     //     .then(canvas => {
//     //         document.body.appendChild(canvas)
//     //     })
// }


//   pdf = () => {
//
//       LOG(this.el)
//
//       const opts = {
//           margin: 1,
//           filename: 'doc.jpg',
//           image: {type: 'jpeg', quality: 0.98},
//           html2canvas: {scale: 2},
//           jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
//       }
//
//
//       html2pdf().from(this.el).set(opts).outputImg('img').then(res => {
//
//           LOG({res})
//       })
//
//       // html2pdf().from(this.el).outputPdf('arraybuffer').then(res => {
//       //
//       //     LOG({res})
//       // })
//
//       //html2pdf(document.body)
//
//       //.from(document.body).save()
//
//       //.then(res => LOG({res}))
//
//
//       /*  html2canvas(this.el).then(canvas => {
//
//             const opt = {
//                 margin: 1,
//                 filename: 'doc.pdf',
//                 image: {type: 'jpeg', quality: 0.98},
//                 html2canvas: {scale: 2},
//                 jsPDF: {}
//             }
//
//
//             LOG({canvas})
//
//             const pdf = html2pdf(this.el)
//
//             //     .from(canvas, 'canvas').toPdf()
//             //
//             // LOG({pdf})
//             //
//             //  pdf.thenCore(res => LOG({res}))
//
//
//
//
//         })
// */
//
//       // worker
//       //     .then(res => LOG({res}))
//       //     .catch(err => ERR({err}))
//
//
//       // html2pdf(this.el)
//       //     .then(canvas => {
//       //         document.body.appendChild(canvas)
//       //     })
//   }

// <br/>
// < button
// onClick = {this.pdf
// }>
// Create
// PDF < /button>
// <br/>
// < button
// onClick = {this.save
// }>
// Build
// PDF < /button>
// <br/>