## swagger-json-preview (For Chrome)

> preview swagger json when browse on web

## feature
- Only available for gitlab for now
- The extention will work on web pages where the url is ended with `.swagger.json`
    - A 'Preview Swagger' Button will be shown on file actions row, click the button and the content will be replaced with formatted docs

## refer
- https://developer.chrome.com/extensions/getstarted
- https://github.com/caldwell/renderjson
- https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html

## how to use
- Download zip file: https://github.com/isword123/swagger-json-preview/archive/master.zip
- Unzip the zip to a folder
- Go to Chrome: 'More tools' -> 'Extensions'
    - Enable developer mode
    - Click 'Load unpacked', choose the folder location unzipped
    - The extension is loaded
- If you want the preview work automatically, please go to extention options page, and toggle on the 'auto preview' switch

## Changes
- [x] 增加 properties 有以下字段的处理 
```
   additionalProperties: {
     type: number,
     format: double
   }
```
- [x] add '__comment__' for object comment to show in json 



> README.md  
> Created On: 2019-02-13 15:05:52  
