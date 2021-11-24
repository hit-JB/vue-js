# myvue

> this is a vue pro

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
安装
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

##出现system limit for watch of file reached
    解决方法
    $ echo fs.inotify.max_user_watches = 524288 | sudo tee -a /etc/sysctl.conf
    $ sudo sysctl -p
##


