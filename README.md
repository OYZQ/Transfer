# 穿梭框插件
### 使用：

````js
// 初始化穿梭框
$("#shuttleBox").transferItem({
			'leftName':'左侧列表',
			'rightName':'右侧列表',
			data:{
				leftArr:[{id:'0',name:'1'},{id:'1',name:'哈哈哈哈'},{id:'3',name:'说没说过'},{id:'4',name:'我们沙发上'}],
				rightArr:[{id:'5',name:'沙发上的1'},{id:'6',name:'哈哈哈省道哈'},		{id:'7',name:'说没方法说过'},{id:'8',name:'我们沙大幅度发上'}]
			}
});

// 数据移动（数据回显）
// arrId:['1'，'2'...] 数据id
// direction：left||right,默认left（把左侧穿梭框对应id数据移到右侧）
moveTransfer: function (arrId,direction)

// 更多功能待开发
````

