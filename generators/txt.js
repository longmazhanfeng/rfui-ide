/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Helper functions for generating txt for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.TXT');

goog.require('Blockly.Generator');

// 返回block —— case_name 包含的内容
Blockly.TXT.getCasename = function (block) {
	var list = [];
	var text = block.getElementsByTagName("field")[0].childNodes[0].nodeValue;
	list.push(text);
	list.push('\n');
	return list;
}

// 返回block —— setting_documentation 包含的内容
Blockly.TXT.getDocumentation = function (block) {
	var list = [];
	list.push(Blockly.Msg.rfui.DOCUMENTATION);
	var text = block.getElementsByTagName("field")[0].childNodes[0].nodeValue;
	list.push(text);
	list.push('\n');
	return list;
}

// 返回block —— setting_tags 包含的内容
Blockly.TXT.getTags = function (block) {
	var list = [];
	list.push(Blockly.Msg.rfui.TAGS);
	var child_nodes = block.childNodes;  
	for (var j = 0; j < child_nodes.length; j++) {
	  // console.log(child_nodes[j].nodeName == "VALUE");
	  if (child_nodes[j].nodeName == "VALUE") {
	    // console.log(child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue);
	    var text = child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue;
	  	list.push(text);
	  };		  
	}; 
	list.push('\n');
	return list;
}

// 返回block —— setting_setup 包含的内容
Blockly.TXT.getSetup = function (block) {
	var list = [];
	list.push(Blockly.Msg.rfui.SETUP);
	var child_nodes = block.childNodes;  
	for (var j = 0; j < child_nodes.length; j++) {
	  // console.log(child_nodes[j].nodeName == "VALUE");
	  if (child_nodes[j].nodeName == "VALUE") {
	    // console.log(child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue);
	    var text = child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue;
	  	list.push(text);
	  };		  
	};
	list.push('\n'); 
	return list;
}

// 返回block —— setting_teardown 包含的内容
Blockly.TXT.getTeardown = function (block) {
	var list = [];
	list.push(Blockly.Msg.rfui.TEARDOWN);
	var child_nodes = block.childNodes;  
	for (var j = 0; j < child_nodes.length; j++) {
	  // console.log(child_nodes[j].nodeName == "VALUE");
	  if (child_nodes[j].nodeName == "VALUE") {
	    // console.log(child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue);
	    var text = child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue;
	  	list.push(text);
	  };		  
	};
	list.push('\n'); 
	return list;
}


// 返回block —— function(自定义关键字) 包含的内容
Blockly.TXT.getFuntion = function (block) {
	var list = [];
	var muta_name = block.getElementsByTagName("mutation")[0].getAttribute("name");
	list.push(muta_name);      
	var child_nodes = block.childNodes;  
	for (var j = 0; j < child_nodes.length; j++) {
	  // console.log(child_nodes[j].nodeName == "VALUE");
	  if (child_nodes[j].nodeName == "VALUE") {
	    // console.log(child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue);
	    var text = child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue;
	    list.push(text);
	  };	          
	};        
	list.push("\n");
	return list;
}
