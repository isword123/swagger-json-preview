
// get file location URL
// example: http://xxx.com/xx-xx/yyy-yyy/blob/master/tools/swagger/fe.swagger.json
let rawHref = window.location.href

// replace blob -> raw
let jsonHref = rawHref.replace('blob', 'raw')

let previewText
function prepareButton() {
    let icon = document.createElement('i')
    icon.className = 'fa fa-eye'

    let previewBtn = document.createElement('button')
    previewText = document.createTextNode('')
    previewText.textContent = 'Preview Swagger'
    previewBtn.className = 'btn btn-sm btn-info'
    previewBtn.appendChild(icon)
    previewBtn.appendChild(previewText)

    previewBtn.addEventListener('click', function() {
        doPreview()
    })

    let btnGroups = document.createElement('div')
    btnGroups.className = 'btn-group'
    btnGroups.appendChild(previewBtn)

    let actionsContainer = document.querySelector('.file-actions')
    if (actionsContainer) {
        actionsContainer.prepend(btnGroups)
    } else {
        console.log('no file actions container found')
    }
}

let previewed = false
function doPreview() {
    if (!previewed) {
        previewText.textContent = 'Show Source JSON'
        previewJSON()
        toggleBlobViewer(false)
    } else {
        previewText.nodeValue = 'Preview Swagger'
        let oldContainer = document.querySelector('#swagger-json-container')
        if (oldContainer) {
            oldContainer.remove()
        }
        toggleBlobViewer(true)
    }

    previewed = !previewed;
}

function toggleBlobViewer(show) {
    // hide blob-viewer
    let blobViewer = document.querySelector('.blob-viewer')
    if (!blobViewer) {
        return
    }

    if (show) {
        blobViewer.style.display = 'block'
    } else {
        blobViewer.style.display = 'none'
    }
}


function previewJSON() {
    // fetch json content
    GetJSON(jsonHref).then((body) => {
        if (!body) {
            console.log("Fetch json body failed", jsonHref)
            return
        }

        let fileContainer = document.querySelector('.file-holder')
        if (fileContainer) {
            viewSwaggerJSON(body, fileContainer)
        } else {
            console.log("Pass preview since no file-holder not found")
        }
    })
}

prepareButton()