

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

// define global param
let Definitions = {}
renderjson.set_show_to_level(4)

function buildResponseJSON(schema) {
    let refId = schema["$ref"]
    let obj = buildJSONByRef(refId)
    return obj
}

function buildJSONByRef(refId) {
    let refKey = refId.replace('#/definitions/', '')
    if (!Definitions[refKey]) {
        return undefined
    }

    let refDef = Definitions[refKey]
    let obj;
    switch(refDef.type) {
        case 'object':
            obj = buildJSONObject(refDef)
            break
        case 'array':
            obj = buildJSONArray(refDef)
            break
        default:
            obj = buildKeyContent(refDef)
    }

    return obj
}

function buildJSONArray(refDef) {
    let arr = [];
    if (refDef.items['$ref']) {
       arr.push(buildJSONByRef(refDef.items['$ref']))
    } else {
        arr.push(buildKeyContent(refDef));
    }

    return arr
}

function buildJSONObject(refDef) {
    let obj = {}
    Object.keys(refDef.properties).forEach((key) => {
        let prop = refDef.properties[key]
        if (prop['$ref']) {
            obj[key] = buildJSONByRef(prop['$ref'])
            return
        }

        if (prop.type === 'array' && prop.items['$ref']) {
            obj[key] = [buildJSONByRef(prop.items['$ref'])]
            return
        }

        obj[key] = buildKeyContent(prop)
    })

    return obj
}

function buildKeyContent(prop) {
    let descArr = []
    descArr.push('Type:', prop.type, prop.format ? '(Format:'+ prop.format+ ')' : '')

    if (prop.type === 'array') {
        descArr.push('Items Type:', prop.items.type, prop.items.format ?  '(Format:'+ prop.items.format+ ')' : '')
    }

    if (prop.type === 'object' && prop.additionalProperties) {
        descArr.push("Key type: string, Value type: " + prop.additionalProperties.format)
    }

    if (prop.title) {
        descArr.push('Title:', prop.title)
    }

    if (prop.description) {
        descArr.push('Desc:', prop.description)
    }

    if (prop.default) {
        descArr.push('Default:', prop.default)
    }

    if (prop.enum) {
        descArr.push('Enum:', prop.enum.join(', '))
    }

    return descArr.join(' ')
}


Vue.component('swagger-path-response', {
    props: ['code', 'response'],
    data: function() {
        /*
        let json = buildResponseJSON(this.response.schema)
        let jsonStr = JSON.stringify(json, 4, 4)
        */
        return {
            json: ''
        }
    },
    mounted: function() {
        let json = buildResponseJSON(this.response.schema)
        this.$refs.codeContainer.appendChild(renderjson(json))
    },
    template: '<div>\
      <h4>Status: {{ code }} {{ response.description }}</h4>\
      <div ref="codeContainer"></div>\
      </pre>\
    </div>'
})

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
        <swagger-path-response v-for="(response, code) in def.responses" v-bind:code="code" v-bind:response="response" v-bind:key="code"></swagger-path-response> \
    </div>'
})

Vue.component('swagger-param-row', {
    props: ['param'],
    mounted: function() {
        if (!this.param.schema) {
            return
        }
        let json = buildResponseJSON(this.param.schema)
        this.$refs.example.appendChild(renderjson(json))
    },
    template: '<tr>\
        <td>{{ param.name }}</td>\
        <td v-if="!!param.format">{{ param.type }} (Format: {{param.format}})</td>\
        <td v-if="!param.format">{{ param.type }}</td>\
        <td>{{ param.in }}</td>\
        <td>{{ param.required }}</td>\
        <td>{{ param.description }}</td>\
        <td ref="example"></td>\
    </tr>'
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
        <th>Desc</th>\
        <th>Example</th>\
        </tr>\
    </thead>\
    <tbody>\
        <swagger-param-row v-for="param in parameters" v-bind:key="param.name+param.in" v-bind:param="param">\
        </swagger-param-row>\
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

    Definitions = jsonBody.definitions || {}

    let swaggerContainer = document.createElement('div')

    parent.append(swaggerContainer)

    new Vue({
        el: swaggerContainer,
        data: {
            info: jsonBody.info,
            paths: jsonBody.paths,
            definitions: jsonBody.definitions
        },
        template: ' \
        <div class="file-content wiki" id="swagger-json-container"> \
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
