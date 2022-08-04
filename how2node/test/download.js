var download = require('download-git-repo')

download('direct:git@gitee.com:charlesc/express-template.git', './xxx', {clone: true}, err => {
  console.log(err)
})