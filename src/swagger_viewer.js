
function viewSwaggerJSON(jsonBody, parent) {
    console.log("to display swagger HTML")

    let oldContainer = document.querySelector('#swagger-json-container')
    if (oldContainer) {
        oldContainer.remove()
    }

    let swaggerContainer = document.createElement('div')
    swaggerContainer.id = 'swagger-json-container'

    parent.append(swaggerContainer)

    new Vue({
        el: swaggerContainer,
        data: {
            info: jsonBody.info
        },
        template: ' \
        <div> \
        <swagger-project v-bind:info="info"></swagger-project> \
        </div> \
        '
    })
}

Vue.component('swagger-project',  {
    props: ['info'],
    template: '\
    <div>\
        <h2>{{info.title}}</h2> \
        <div>Version: {{info.version}}</div> \
    <div>\
    '
})  