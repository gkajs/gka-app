## gka-app

## gka 逻辑

```
├── main            客户端逻辑
├── main.js         electron windows的初始化操作
├── package.json
├── public          公有文件，包括gka生成的文件
└── render          前端展示逻辑
```


public/index.html，前端页面

main/logic.js       main函数是客户端逻辑的入口，会在electron windows初始化之后调用
render              前端用到的一些展示逻辑

主要注意一下前端与客户端api通信的过程，是用过ipc调用的，这里监听ipc事件之后进行相应的操作