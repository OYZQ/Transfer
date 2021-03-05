(function($) {
	$.fn.transferItem = function(options) {
		function transferItem($this, options) {
			this.init($this, options);
		}
		transferItem.prototype = {
			init: function($this, options) {
				this.el = $this;
				this.ops = options;
				this.ops.leftName ? '' : this.ops.leftName = '左侧列表';
				this.ops.rightName ? '' : this.ops.rightName = '右侧列表',
				
				this.initDom();
				this.initCss();
				this.ops.data ? this.setValue(this.ops.data) : '';
				this.transferAllCheck = this.el.find(".transfer-all-check");
				this.switchBtn = this.el.find(".to-switch");
				this.allCheckedBoxes = this.el.find(".tyue-checkbox-input");
				this.alldivBoxes = this.el.find(".ty-tree-div");
				this.transferIcon = this.el.find(".transferIcon");
				this.shrinkIcon = this.el.find(".shrinkIcon");
				
				this.checkBoxEvent();
				this.transferIconClick();
				this.allCheckEvent();
				this.switchEvent();
				this.checkBoxesDbClick();
				time = null;
			},

			// 初始化dom
			initDom: function() {
				var domStr =
					`<div class="ty-transfer mt20 ml20" id="ued-transfer-1">
			<div class="fl ty-transfer-list transfer-list-left">
				<div class="ty-transfer-list-head">
					<div class="ty-transfer-list-foot">
						<div class="ty-tree-div">
							<div class="tyc-check-blue fl">
								<input type="checkbox" class="transfer-all-check" id="tyc-check-blue">
								<span class="openIcon transferIcon"></span>
								<div><span class="selectLeftNum">0</span>/<span class="allLeftNum">0</span>项</div>
							</div>
						</div>
					</div>
					<div class="transferTitle">` +
					this.ops.leftName +
					`</div>
				</div>

				<div class="ty-transfer-list-body">
					<ul class="ty-tree-select">
					</ul>
				</div>

			</div>
			<div class="fl ty-transfer-operation">
				<span class="ty-transfer-btn-toright to-switch">
				</span>
				<span class="ty-transfer-btn-toleft to-switch">
				</span>
			</div>
			<div class="fl ty-transfer-list transfer-list-right">
				<div class="ty-transfer-list-head">
					<div class="ty-transfer-list-foot">
						<div class="ty-tree-div">
							<div class="tyc-check-blue fl">
								<input type="checkbox" class="transfer-all-check" id="tyc-check-blue">
								<span class="openIcon transferIcon"></span>
								<div><span class="selectrightNum">0</span>/<span class="allRightNum">0</span>项</div>
							</div>
						</div>
					</div>
					<div class="transferTitle">` +
					this.ops.rightName +
					`</div>
				</div>
				<div class="ty-transfer-list-body">
					<ul class="ty-tree-select">
					</ul>
				</div>
			</div>
			<div class="clearboth">
			</div>
		</div>`
				this.el.append(domStr)
			},

			//穿梭框赋值
			setValue: function(data) {
				$('#ued-transfer-1 li').remove();
				var strLeft = '';
				var strRight = '';
				data.leftArr.forEach(function(item, index) {
					strLeft += '<li><div class="ty-tree-div"><label class="tyue-checkbox-wrapper"> <span class="tyue-checkbox">' +
						' <input type="checkbox" class="tyue-checkbox-input" id="tyue-checkbox-blue"> <span class="tyue-checkbox-circle">' +
						' </span>  </span> <span id="' + item.id + '" class="tyue-checkbox-txt" title="' + item.name +
						'">' + item.name +
						'</span></label></div></li>'
				})
				data.rightArr.forEach(function(item, index) {
					strRight +=
						'<li><div class="ty-tree-div"><label class="tyue-checkbox-wrapper"> <span class="tyue-checkbox">' +
						' <input type="checkbox" class="tyue-checkbox-input" id="tyue-checkbox-blue"> <span class="tyue-checkbox-circle">' +
						' </span>  </span> <span id="' + item.id + '" class="tyue-checkbox-txt" title="' + item.name +
						'">' + item.name +
						'</span></label></div></li>'
				})
				this.el.find('.transfer-list-left ul').append(strLeft);
				this.el.find('.transfer-list-right ul').append(strRight);
				this.el.find('.allLeftNum').text(data.leftArr.length);
				this.el.find('.allRightNum').text(data.rightArr.length);
			},

			// 展开收缩事件
			transferIconClick: function() {
				var that = this;
				this.transferIcon.on("click", function() {
					var _this = $(this);
					if (_this.hasClass('openIcon')) {
						_this.removeClass('openIcon');
						_this.addClass('shrinkIcon');
						_this.parents('.ty-transfer-list-head').siblings('.ty-transfer-list-body').css('height', '0');
						$('.to-switch').hide();
					} else {
						_this.removeClass('shrinkIcon');
						_this.addClass('openIcon');
						_this.parents('.ty-transfer-list-head').siblings('.ty-transfer-list-body').css('height', '130px');
						$('.to-switch').show();
					}
				})
			},

			//按钮切换事件
			switchEvent: function() {
				var that = this;
				this.switchBtn.on("click", function() {
					that.transferAllCheck.removeAttr("checked", "checked");
					var _this = $(this);

					var a_tagClass = null;
					if (_this.hasClass("ty-transfer-btn-toright")) {
						findCheckbox = _this.parents(".ty-transfer").find(".transfer-list-left li");
						inputCheckbox = _this.parents(".ty-transfer").find(".transfer-list-right ul");
						a_tagClass = "ty-transfer-btn-toright";
					} else {
						findCheckbox = _this.parents(".ty-transfer").find(".transfer-list-right li");
						inputCheckbox = _this.parents(".ty-transfer").find(".transfer-list-left ul");
						a_tagClass = "ty-transfer-btn-toleft";
					}

					var checkBox = findCheckbox.find(":checked");
					if (checkBox != 0) {
						var arrVal = [];
						checkBox.each(function() {
							$(this).removeAttr("checked");
							var appendText = $(this).parents(".ty-tree-div").parent("li");
							arrVal.push(appendText);
							that.removeActiveEvent(a_tagClass, "active");
							that.addActiveEvent(a_tagClass, "disabled");
						});
						inputCheckbox.prepend(arrVal);
						$('.allLeftNum').text($('.transfer-list-left li').length)
						$('.allRightNum').text($('.transfer-list-right li').length)
						$(this).hasClass('ty-transfer-btn-toright')?$('.selectLeftNum').text($('.selectLeftNum').text() - arrVal.length):$('.selectrightNum').text($('.selectrightNum').text() - arrVal.length)
						
					}

				})
			},

			//所有标签单击选中事件
			checkBoxEvent: function() {
				var that = this;
				this.allCheckedBoxes.on("click", function() {
					clearTimeout(time);
					time = setTimeout(function() {
						var classNames = that.checkTagClass($(this));
						if($(this).parents('.transfer-list-left').length==0){
							var item = $(this).parents('.ty-transfer-list-body').siblings('.ty-transfer-list-head').find('.selectrightNum');
							var num = item.text();
						}else{
							var item = $(this).parents('.ty-transfer-list-body').siblings('.ty-transfer-list-head').find('.selectLeftNum');
							var num = item.text();
						}
						if ($(this).is(":checked")) {
							num = Number(num);
							num += 1;
							item.text(num);
							that.removeActiveEvent(classNames[0], "disabled");
							that.addActiveEvent(classNames[0], "active");
							if (!$("." + classNames[1]).hasClass("active")) {
								that.addActiveEvent(classNames[1], "disabled");
							}
						} else {
							num = Number(num);
							num -= 1;
							item.text(num);
							var siblingsTag = $(this).parents(".ty-tree-div").parent("li").siblings("li").find(".tyue-checkbox-input");
							if (!siblingsTag.is(":checked")) {
								that.removeActiveEvent(classNames[0], "active");
								that.addActiveEvent(classNames[0], "disabled");
								$(this).parents(".ty-transfer").find(".transfer-all-check").removeAttr("checked", "checked")
							}
						}
					}.bind(this), 0);

				});
			},

			//所有按钮双击事件
			checkBoxesDbClick: function() {/* 
				var that = this;

				this.alldivBoxes.bind("dblclick", function(event) {
					var _this = $(this);
					$(this).removeAttr("checked");

					if (_this.parents(".ty-transfer-list").hasClass("transfer-list-left")) {
						inputCheckbox = _this.parents(".ty-transfer").find(".transfer-list-right ul");
						btnCheckbox = that.el.find(".ty-transfer-btn-toright");
					} else {
						inputCheckbox = _this.parents(".ty-transfer").find(".transfer-list-left ul");
						btnCheckbox = that.el.find(".ty-transfer-btn-toleft");
					}

					var siblingsTag = _this.parent("li").siblings("li").find(".tyue-checkbox-input");
					if (!siblingsTag.is(":checked")) {
						btnCheckbox.removeClass("active");
					}
					var appendText = _this.parent("li");
					inputCheckbox.prepend(appendText);
					$('.allLeftNum').text($('.transfer-list-left li').length)
					$('.allRightNum').text($('.transfer-list-right li').length)
					appendText.find(".tyue-checkbox-input").removeAttr("checked");

				});
			 */},

			//全选按钮事件
			allCheckEvent: function() {
				var that = this;
				this.transferAllCheck.on("click", function() {
					var checkBoxs = $(this).parents(".ty-transfer-list-head").siblings(".ty-transfer-list-body").find(":checkBox");
					var classNames = that.checkTagClass($(this));
					if ($(this).prop("checked") == true) {
						checkBoxs.prop('checked', 'true');
						if (checkBoxs.length != 0) {
							that.removeActiveEvent(classNames[0], "disabled");
							that.addActiveEvent(classNames[0], "active");
							if (!$("." + classNames[1]).hasClass("active")) {
								that.addActiveEvent(classNames[1], "disabled");
							}
						}
						if (!$('.transfer-list-right #tyc-check-blue').is(':checked')) {

						}
						if ($(this).parents('.transfer-list-right').length == 0) {
							$('.transfer-list-left').length > 0 ? $('.selectLeftNum').text($('.allLeftNum').text()) :''
						}else{
							$('.transfer-list-right').length > 0 ? $('.selectrightNum').text($('.allRightNum').text()):''
						}
					} else {
						checkBoxs.removeAttr("checked", "checked");
						that.removeActiveEvent(classNames[0], "active");
						that.addActiveEvent(classNames[0], "disabled");
						if ($(this).parents('.transfer-list-right').length == 0) {
							$('.transfer-list-left').length > 0 ? $('.selectLeftNum').text(0) : 0
						}else{
							$('.transfer-list-right').length > 0 ? $('.selectrightNum').text(0) : 0
						}
					}
				})
			},
			//按钮添加class事件
			checkTagClass: function($that) {
				var parentsTransfer = $that.parents(".ty-transfer-list");
				var tagClass = null;
				var tagRemoveClass = null;

				if (parentsTransfer.hasClass("transfer-list-left")) {
					tagClass = "ty-transfer-btn-toright"
					tagRemoveClass = "ty-transfer-btn-toleft";
				} else {
					tagClass = "ty-transfer-btn-toleft"
					tagRemoveClass = "ty-transfer-btn-toright";
				}
				return [tagClass, tagRemoveClass];
			},
			addActiveEvent: function(position, addClasses) {
				this.el.find("." + position).addClass(addClasses);
			},
			removeActiveEvent: function(position, addClasses) {
				this.el.find("." + position).removeClass(addClasses);
			},
			// 数据移动
			moveTransfer: function (arrId,direction){
				if(direction && direction=='right'){
					arrId.forEach(function(item,index){
						var liSpan = $('.ty-transfer .transfer-list-right li').find('#'+item);
						 $(".ty-transfer .transfer-list-left ul").append(liSpan.parents('li'));
					})
				}else{
					arrId.forEach(function(item,index){
						var liSpan = $('.ty-transfer .transfer-list-left li').find('#'+item);
						 $(".ty-transfer .transfer-list-right ul").append(liSpan.parents('li'));
					})
				}
			},
			
			initCss: function(){
				/** 添加样式 */
				    $('head').append(`<style>@charset "utf-8";

img {
	border: 0;
	vertical-align: middle;
	max-width: 100%;
}

body {
	font-size: 12px;
	font-family: 'PingFang SC', 'Hiragino Sans GB', 'PingHei', 'Open Sans', 'sans-serif', 'Helvetica Neue', 'Helvetica', 'Microsoft YaHei', 'SimSun', 'Arial';
	color: #666666;
}

html,
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
form,
input,
textarea,
p,
table,
tr,
th,
td,
span,
strong,
em {
	padding: 0;
	margin: 0;
	font-style: normal;
	font-size: 12px;
}

input {
	border: 0;
	padding: 0px;
	font-size: 12px;
	background: none;
	font-family: "PingFang SC", "Hiragino Sans GB", "PingHei", "Open Sans", "sans-serif", "Helvetica Neue", "Helvetica", "Microsoft YaHei", "SimSun", "Arial";
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
	background-color: #fff;
	-webkit-box-shadow: 0 0 0 1000px white inset;
}

input[type=text]:focus,
input[type=password]:focus,
textarea:focus {
	/*background-color: #fff;
      -webkit-box-shadow: 0 0 0 1000px white inset;*/
}

button,
button:focus,
button:active,
button:link {
	-webkit-appearance: none;
	outline: none;
}

ol,
ul,
li {
	list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: normal;
	font-size: 100%;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
	text-decoration: none;
	outline: none;
	cursor: pointer;
	color: #333;
}

a:link,
a:visited {
	text-decoration: none;
}

a:hover {
	text-decoration: none;
}

a:active {
	text-decoration: none;
}

.clearboth {
	clear: both;
}

.fl {
	float: left;
}

.fr {
	float: right;
}

.ml5 {
	margin-left: 5px;
}

.mt20 {
	margin-top: 13px;
}

.mt50 {
	margin-top: 20px;
}

.mt10 {
	margin-top: 10px;
}

.ml20 {
	margin-left: 20px;
}

.div-h,
.ty-p {
	line-height: 1.5;
}

.color9 {
	color: #999;
}

.color-blue {
	color: #00a0e8;
}

.p16 {
	padding: 16px;
}

.p24 {
	padding: 24px;
}

.bgf7 {
	padding: 10px;
	background: #f7f7f7;
}

.bg999 {
	padding: 10px;
	background: #999;
}

.ty-relative {
	position: relative;
}

@charset "utf-8";

.tyue-checkbox {
	vertical-align: middle;
	display: inline-block;
	position: relative;
	white-space: nowrap;
}

.tyue-checkbox-txt {
	margin-left: 6px;
	margin-right: 8px;
}

/*过滤*/
.ty-transfer-list {
	width: 200px;
	border: 1px solid #d9d9d9;
	border-radius: 3px;
	background: #fff;
}

.ty-transfer-list-head {
	height: 32px;
	line-height: 32px;
	text-align: center;
	font-size: 14px;
	color: #666;
	font-weight: bold;
	display: flex;
}

.ty-transfer-list-serach {
	width: auto;
	padding: 0 15px 8px;
	position: relative;
}

.ty-transfer-list-serach input {
	display: block;
	width: 100%;
	height: 28px;
	line-height: 28px;
	padding-left: 30px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
}

.ty-transfer-list-serach input {
	transition: all .3s linear;
	-webkit-transition: all .3s linear;
	-o-transition: all .3s linear;
	-moz-transition: all .3s linear;
}

.ty-transfer-list-serach>input:focus,
.ty-transfer-list-serach>input:hover {
	border-color: #57c5f7;
	border: 1px solid #57c5f7;
	outline: 0;
	box-shadow: 0 0 0 2px rgba(45, 183, 245, .2);
}


.ty-transfer-list-serach-icon {
	width: 17px;
	height: 17px;
	display: block;
	position: absolute;
	top: 4px;
	left: 22px;
	z-index: 10;
}

.ty-transfer-list-body {
	border-top: 1px solid #d9d9d9;
	height: 130px;
	overflow-y: auto;
	box-sizing: border-box;
	transition: height 0.3s linear;
	-moz-transition: height 0.3s linear;
	-webkit-transition: height 0.3s linear;
	-o-transition: height 0.3s linear;
}

.ty-transfer-list-body li{
	margin: 5px 0 0 10px;
}

.ty-transfer .ty-tree-arrow-right span,
.ty-transfer .ty-tree-arrow-bottom span {
	margin-left: 0;
}

.ty-transfer .ty-tree-select-ul {
	padding-left: 38px;
}

.ty-transfer .ty-tree-div .tyc-check-blue {
	margin: 2px 0 0 10px;
	display: flex;
	height: 30px;
	align-items: baseline;
}

.ty-transfer .ty-tree-div {
	height: 25px;
}

.ty-transfer .ty-tree-text {
	height: 30px;
	line-height: 30px;
	line-height: 30px;
	cursor: pointer;
}

.ty-transfer .ty-tree-switcher {
	height: 28px;
}

.ty-transfer-list-foot {}

.ty-transfer-list-serach+.ty-transfer-list-body {
	height: 230px;
}

.ty-transfer-operation {
	padding: 55px 20px 0 20px;
}

.ty-transfer-operation span {
	display: block;
	width: 28px;
	height: 28px;
	text-align: center;
	position: relative;
	cursor: pointer;
	border: 1px solid #d9d9d9;
	border-radius: 4px;
	background-image: url("ue-icon-little.png");
	background-repeat: no-repeat;
	background-color: #f3f3f3;
	background-position-x: 10px;
	transition: background-color 0.3s linear;
	-moz-transition: background-color 0.3s linear;
	-webkit-transition: background-color 0.3s linear;
	-o-transition: background-color 0.3s linear;

}

.ty-transfer-operation span i {
	font-size: 2em;
	color: #bbb;
}

.ty-transfer-operation span+span {
	margin-top: 25px;
}

.ty-transfer-operation span:hover {
	border: 1px solid #3dadf2;
	background-color: #7AC7F8;
}

.ty-transfer-operation span:hover i {
	color: #fff;
}

.ty-transfer-btn-toright,
.ty-transfer-btn-toright.disabled:hover {
	background-position: 10px -150px;
}

.ty-transfer-btn-toright:hover,
.ty-transfer-btn-toright.active,
.ty-transfer-btn-toright.active:hover {
	background-position: 10px -175px;
}

.ty-transfer-btn-toleft,
.ty-transfer-btn-toleft.disabled:hover {
	background-position: 10px -206px;
}

.ty-transfer-btn-toleft:hover,
.ty-transfer-btn-toleft.active,
.ty-transfer-btn-toleft.active:hover {
	background-position: 10px -231px;
}

.ty-transfer-operation span.active {
	border: 1px solid #3dadf2;
	background-color: #00A0E8;
}

.ty-transfer-operation span.active i {
	color: #fff;
}

.ty-transfer-btn-toleft.disabled:hover,
.ty-transfer-btn-toright.disabled:hover {
	cursor: not-allowed;
	border: 1px solid #d9d9d9;
	;
	background-color: #f3f3f3;
}

.ty-transfer-operation .active:hover {
	background-color: #7AC7F8;
}



/**未选中禁用**/
.tyc-check-disabled span {
	background: #f3f3f3;
	width: 10px;
	height: 10px;
	display: block;
	border: 1px solid #d8d8d8;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
}

/**选中禁用**/
/*.tyc-check-disabled span:after{
    content: "";
    width: 10px;
    height: 10px;
    display: block;
    border: 1px solid #d8d8d8;
    display: block;
    background: url(../images/table-icon.png) no-repeat 0 -410px #f3f3f3;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: none;
}*/
.tyc-check-checkall span {
	width: 10px;
	height: 10px;
	display: block;
	border: 1px solid #d8d8d8;
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;

}

/**未选全**/
.tyc-check-incomplete span {
	width: 12px;
	height: 12px;
	border: 0;
	display: block;
	position: absolute;
	top: -1px;
	left: -1px;
	z-index: 2;
}

/**展开**/
.tyc-check-expand span {
	width: 12px;
	height: 12px;
	border: 0;
	display: block;
	position: absolute;
	top: -1px;
	left: -1px;
	z-index: 2;
}

.ty-transfer .transferTitle {
	flex: 1;
	text-align: right;
	padding-right: 10px;
}

.ty-transfer .transferIcon {
	background-image: url(ue-icon-little.png);
	width: 16px;
	height: 19px;
	margin: 0 5px;
	cursor: pointer;
}

.ty-transfer .openIcon {
	background-position-y: -17px;
}

.ty-transfer .shrinkIcon {
	background-position-y: 3px;
}</style>
`)
			}
		}
		new transferItem(this, options)
	}
})(jQuery);
