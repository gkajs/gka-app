const { ipcRenderer } = require('electron')

ipcRenderer.on('already-add-files', function(event, data) {
    function modifyLoading() {
        document.getElementById("loading").style.display = 'block';
        let process = document.getElementById('status');
        let now = 0;
        function slowProcessing(long_second, times) {
            for (let i = 0; i <= times; i++) {
                let interval = long_second / times;
                setTimeout(function () {
                    process.style.width = `${now}%`
                    now += (100 / times);
                }, interval * i * 1000)

            }
        }
        slowProcessing(3, 10) // 3秒，每次滚动10%
    }

    document.getElementById("index").style.display = "none";
    modifyLoading();
    generateGka();
});

ipcRenderer.on('gka-over', function (event, data) {
    let output = data.output;
    console.log("最终的路径", output)
    document.getElementById("preview").style.display = 'block';
    document.getElementById("loading").style.display = 'none';
    document.getElementById("iframePreview").src = output + '/gka.html';
});

addCheckboxEvt();

function generateGka() {
    function configReader() {
        let configKey = [
            {
                id: 'isMini', render: (val) => {
                    if (val === 'on') {
                        return true;
                    }
                }
            },
            {
                id: 'isCrop', render: (val) => {
                    if (val === 'on') {
                        return true;
                    }
                }
            },
            {
                id: 'isUnique', render: (val) => {
                    if (val === 'on') {
                        return true;
                    }
                }
            },
            {
                id: 'isSprites', render: (val) => {
                    if (val === 'on') {
                        return true;
                    }
                }
            },
            {
                id: 'algorithm', render: (val, dom) => {
                    // if (['binary-tree', 'top-down', 'left-right'].indexOf(val) !== -1 ) {
                    //     return val;
                    // } else {
                    //     alert("布局模式值非法")
                    //     return '';
                    // }
                    return dom.innerHTML;
                }
            },
            {
                id: 'tpl', render: (val, dom) => {
                    // if (['canvas', 'crop', 'sprites', 'cs', 'percent', 'svg', 'createjs'].indexOf(val) !== -1) {
                    //     return val;
                    // } else {
                    //     alert("非法的模版值")
                    //     return '';
                    // }
                    return dom.innerHTML;
                }
            },
            {
                id: 'prefix', render: (val) => {
                    return val || 'prefix';
                }
            },
            {
                id: 'spritesCount', render: (val) => {
                    if (parseInt(val)) {
                        return val
                    } else {
                        return 0;
                    }
                }
            },
        ];
        let config = {};


        configKey.map((obj, idx) => {
            let key = obj.id;
            let dom = document.getElementById(key);
            config[key] = obj.render(dom.value, dom);
        })

        return config;
    }


    let _config = configReader();
    ipcRenderer.send('generate-gka', {config: _config});
}


function addCheckboxEvt() {
    let keys = [{
        checkBoxId: 'algorithm-checkbox',
        btnId: 'algorithm'

    }, {
        checkBoxId: 'tpl-checkbox',
        btnId: 'tpl'
    }]
    keys.map(obj => {
        let dom = document.getElementById(obj.checkBoxId);
        let btn = document.getElementById(obj.btnId)
        dom.addEventListener('click', (evt) => {
            btn.innerHTML = evt.target.innerHTML;
            console.log(evt.target.innerHTML)
        })
    })
}
