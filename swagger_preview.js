
// get file location URL
// example: http://xxx.com/xx-xx/yyy-yyy/blob/master/tools/swagger/fe.swagger.json
let rawHref = window.location.href

// replace blob -> raw
let jsonHref = rawHref.replace('blob', 'raw')

// fetch json content
GetJSON(jsonHref).then((body) => {
    if (!body) {
        console.log("Fetch json body failed", jsonHref)
        return
    }

    // hide blob-viewer
    let blobViewer = document.querySelector('.blob-viewer')
    blobViewer.style.display = 'none'
    viewSwaggerJSON(body)
})