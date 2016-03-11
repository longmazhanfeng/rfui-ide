/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview read robot files and generate function(kws) blocks to xmlDom
 * @author longmazhanfeng@gmail.com
 */
'use strict';

goog.provide('Blockly.Kws');

goog.require('Blockly.Xml');

// 检测当前浏览器是否支持File API
Blockly.Kws.isSupportFileAPI = function() {
	if (window.File && window.FileList && window.FileReader && window.Blob) {
		return true;
	};
	return false;
}

// 读取本地文件的内容，生成function blocks
Blockly.Kws.readFile = function(event, xmlDom) {
	var files = event.target.files;
	for (var i = 0; i < files.length; i++) {
		var str = "";
		var txtReader = new FileReader();
		txtReader.addEventListener("load", function(event) {
			str = str + event.target.result;
			Blockly.Kws.addBlockToXml(str, xmlDom)
			// Blockly.Xml.domToWorkspace(workspace, Blockly.Kws.addBlockToXml(str, xmlDom));	
			// console.log(str);		
		});		
		txtReader.readAsText(files[i]);
	};
	
}

// 从字符串
Blockly.Kws.addBlockToXml = function(str, xmlDom) {
	// 找出 "*** Keywords ***" 的起始位置
	var kw_end = str.indexOf(Blockly.Msg.rfui.KEYWORDS_LINE) + Blockly.Msg.rfui.KEYWORDS_LINE.length;
	var str_kws = str.substring(kw_end);
	// 以空行分割字符串
	var list_kws = str_kws.split(/\n\s*\r/);
	// 每个list_kws[i] 是一个关键字的定义
	for (var i = 0; i < list_kws.length; i++) {
		// 新建function block(自定义关键字)，生成随机字符串id
		var element = goog.dom.createDom('block');
		element.setAttribute('type', Blockly.Msg.rfui.FUNCTION_TYPE);
		element.setAttribute('id', Math.random().toString(36).substr(2));
		// 取关键字定义的前两行字符串的内容即可（使用split之后其实是第二行和第三行）
		var list_kw = list_kws[i].split("\n");
		// 如果关键字包含参数，则取出参数名称
		// list_kw[2]是参数，list_kw[1]是关键字名称
		if (list_kw[2].indexOf("Arguments") != -1) {
			var mutation = goog.dom.createDom('mutation');
			// 用分隔符划分，取出数值
			var list_args = list_kw[2].split("    ");
			for (var j = 0; j < list_args.length; j++) {
				if (list_args[j].search(/\$\{.*\}/) != -1) {
					var arg = goog.dom.createDom('arg');
					arg.setAttribute('name', list_args[j].substring(list_args[j].indexOf("{")+1, list_args[j].indexOf("}")));
					mutation.appendChild(arg);
					// console.log(list_args[j].substring(list_args[j].indexOf("{")+1, list_args[j].indexOf("}")));
				};
			};			
		};
		element.appendChild(mutation);
		// 关键字的说明文本
		var commentElement = goog.dom.createDom('comment', null, Blockly.Msg.rfui.COMMENTEXT);
		commentElement.setAttribute('pinned', "false");
		commentElement.setAttribute('h', "80");
		commentElement.setAttribute('w', "160");
		element.appendChild(commentElement);
		// 设置坐标位置 远在屏幕之外
		element.setAttribute('x', "1000");
		element.setAttribute('y', "1000");
		// 添加关键字元素到xml中
		xmlDom.appendChild(element);
	};
	return xmlDom;
}