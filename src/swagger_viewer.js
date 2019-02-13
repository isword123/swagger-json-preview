

/**
 * def example:
{
  "summary": "对阵分析",
  "operationId": "GetFeFightAnalysis",
  "responses": {
    "200": {
      "description": "",
      "schema": {
        "$ref": "#/definitions/das_dota2GetFeFightAnalysisReply"
      }
    }
  },
  "parameters": [
    {
      "name": "match_id",
      "in": "path",
      "required": true,
      "type": "string",
      "format": "int64"
    }
  ],
  "tags": [
    "FeApiHandler"
  ]
}
*/

Vue.component('swagger-path-method', {
    props: ['path', 'def', 'method'],
    template: '<div>\
        <h3>{{ def.operationId }}</h3>\
        <blockquote>\
          <p>{{ def.summary }}</p>\
        </blockquote>\
        <div>\
            <h4 style="text-transform: uppercase;">{{ method }}</h4> \
            <pre>{{ path }}</pre> \
        </div>\
        <h4>Parameters</h4>\
        <swagger-params-table v-bind:parameters="def.parameters"></swagger-params-table> \
        <h4>Responses</h4>\
    </div>'
})

Vue.component('swagger-params-table', {
    props: [ 'parameters' ],
    template: '<table class="params-table"> \
    <thead>\
        <tr>\
        <th>Name</th>\
        <th>Type</th>\
        <th>Param In</th>\
        <th>Required</th>\
        </tr>\
    </thead>\
    <tbody>\
        <tr v-for="param in parameters" v-bind:key="param.name+param.in">\
            <td>{{ param.name }}</td>\
            <td>{{ param.type }} (Format: {{param.format}})</td>\
            <td>{{ param.in }}</td>\
            <td>{{ param.required }}</td>\
        <tr>\
    </tbody>\
    </table>'
})


Vue.component('swagger-path', {
    props: ['path', 'definitions'],
    template: '<article>\
    <swagger-path-method v-for="(def, method) in definitions" v-bind:key="method" v-bind:path="path" v-bind:def="def" v-bind:method="method"></swagger-path-method>\
    </article>'
})

Vue.component('swagger-project',  {
    props: ['info'],
    template: '\
    <div>\
        <h2>{{info.title}}</h2> \
        <div>Version: {{info.version}}</div> \
    </div>\
    '
}) 

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
            info: jsonBody.info,
            paths: jsonBody.paths,
            definitions: jsonBody.definitions
        },
        template: ' \
        <div class="file-content wiki"> \
        <swagger-project v-bind:info="info"></swagger-project> \
                <br />\
        <ul>\
            <li v-for="(definitions, path) in paths" v-bind:key="path">\
                <swagger-path v-bind:path="path" v-bind:definitions="definitions"></swagger-path>\
                <br />\
            </li>\
        </ul>\
        </div> \
        '
    })
}