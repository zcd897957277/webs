const fs = require('fs')
const marked = require('marked')
//1.实时监视note.md文件的变化
fs.watchFile('./note.md',(curr,prev)=>{
    //2.读取note.md文件的内容
    fs.readFile('./note.md','utf-8',(err,data)=>{
        if(err){
            throw err
        }else{
            //3.使用marked方法,将md格式的文件转化为html格式
            // let htmlStr = marked(data.toString());
            // //4.将转化的html格式的字符串,写入到新的文件中
            // fs.writeFile('./new.html',htmlStr,err=>{
            //     if(err){
            //         throw err
            //     }else{
            //         console.log("success");
            //     }
            // })

            fs.readFile('./note.md','utf8',(err,markContent)=>{
                if(err){
                    throw err
                }else{
                    //转化好的html字符串
                    let htmlStr = marked(markContent.toString());
                    //将html模板文件中的'@markdown' 替换为 html字符串
                    template.replace('@markdown', htmlStr)
                    //将新生成的字符串template重新写入到文件中
                    fs.writeFile('./template.html',template,err=>{
                        if(err){
                            throw err
                        }else{
                            console.log("success");
                        }
                    })
                }
            })
        }
 
    })
})