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
 * @author longmazhanfeng@gmail.com
 */
'use strict';

goog.provide('Blockly.TXT');

goog.require('Blockly.Generator');

// 返回block —— settings标签
Blockly.TXT.getSettings = function (block) {
	var str_settings = "";
	str_settings = str_settings + Blockly.Msg.rfui.SETTING_LINE + "\n";
	return str_settings;
}

// 返回block —— testsuite标签
Blockly.TXT.getTestSuite = function (block) {
	var str_testsuite = "";
	str_testsuite = str_testsuite + "\n" + Blockly.Msg.rfui.TESTSUITE_LINE + "\n";
	return str_testsuite;
}

// 返回block —— setting_resource 包含的内容
Blockly.TXT.getResource = function (block) {
	var str_resource = "";
	str_resource = str_resource + Blockly.Msg.rfui.RESOURCE + "    " 
					+ block.getElementsByTagName("field")[0].childNodes[0].nodeValue
					+ "\n";
	return str_resource;
}

// 返回block —— case_name 包含的内容
Blockly.TXT.getCasename = function (block) {
	var str_casename = "";
	str_casename = str_casename 
					+ block.getElementsByTagName("field")[0].childNodes[0].nodeValue
					+ "\n";
	return str_casename;
}

// 返回block —— setting_documentation 包含的内容
Blockly.TXT.getDocumentation = function (block) {
	var str_documentation = "";
	str_documentation = str_documentation + "    "
						+ Blockly.Msg.rfui.DOCUMENTATION
						+ "    "
						+ block.getElementsByTagName("field")[0].childNodes[0].nodeValue
						+ "\n";
	return str_documentation;
}

// 返回block —— setting_tags 包含的内容
Blockly.TXT.getTags = function (block) {
	var str_tags = "";
	str_tags = str_tags + "    " + Blockly.Msg.rfui.TAGS;
	var child_nodes = block.childNodes;  
	for (var j = 0; j < child_nodes.length; j++) {
	  // console.log(child_nodes[j].nodeName == "VALUE");
	  if (child_nodes[j].nodeName == "VALUE") {
	    // console.log(child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue);
	    str_tags = str_tags + "    " 
	    			+ child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue;
	  };		  
	}; 
	str_tags = str_tags + "\n";
	return str_tags;
}

// 返回block —— setting_setup 包含的内容
Blockly.TXT.getSetup = function (block) {
	var str_setup = "";
	str_setup = str_setup + "    " + Blockly.Msg.rfui.SETUP;
	var child_nodes = block.childNodes;  
	for (var j = 0; j < child_nodes.length; j++) {
	  // console.log(child_nodes[j].nodeName == "VALUE");
	  if (child_nodes[j].nodeName == "VALUE") {
	    // console.log(child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue);
	    str_setup = str_setup + "    " 
	    			+ child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue;
	  };		  
	};
	str_setup = str_setup + "\n";
	return str_setup;
}

// 返回block —— setting_teardown 包含的内容
Blockly.TXT.getTeardown = function (block) {
	var str_teardown = "";
	str_teardown = str_teardown + "    " + Blockly.Msg.rfui.TEARDOWN;
	var child_nodes = block.childNodes;  
	for (var j = 0; j < child_nodes.length; j++) {
	  // console.log(child_nodes[j].nodeName == "VALUE");
	  if (child_nodes[j].nodeName == "VALUE") {
	    // console.log(child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue);
	    str_teardown = str_teardown + "    " 
	    				+ child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue;
	  };		  
	};
	str_teardown = str_teardown + "\n";
	return str_teardown;
}


// 返回block —— function(自定义关键字) 包含的内容
Blockly.TXT.getFunction = function (block) {
	var str_function = "";
	str_function = str_function + "    " + block.getElementsByTagName("mutation")[0].getAttribute("name");     
	var child_nodes = block.childNodes;  
	for (var j = 0; j < child_nodes.length; j++) {
	  // console.log(child_nodes[j].nodeName == "VALUE");
	  if (child_nodes[j].nodeName == "VALUE") {
	    // console.log(child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue);
	    str_function = str_function + "    " 
	    				+ child_nodes[j].getElementsByTagName("field")[0].childNodes[0].nodeValue;
	  };	          
	};        
	str_function = str_function + "\n";
	return str_function;
}

// xml转换为txt
Blockly.TXT.xmlToTXT = function (xmlDom) {
	var str_suite = "";
	// 开始解析，遍历子节点
	var blocks = xmlDom.getElementsByTagName("block");
	// console.log(blocks.length);
	for (var i = 0; i < blocks.length; i++) {     
	  switch (blocks[i].getAttribute("type"))
	  {
	    case 'settings':
	      str_suite = str_suite + Blockly.TXT.getSettings(blocks[i]);
	      break;
	    case 'setting_resource':
	      str_suite = str_suite + Blockly.TXT.getResource(blocks[i]);
	      break; 
	    case 'testsuite':
	      str_suite = str_suite + Blockly.TXT.getTestSuite(blocks[i]);
	      break; 
	    case 'case_name':
	      str_suite = str_suite + Blockly.TXT.getCasename(blocks[i]);
	      break;
	    case 'setting_documentation':
	      str_suite = str_suite + Blockly.TXT.getDocumentation(blocks[i]);
	      break;
	    case 'setting_tags':
	      str_suite = str_suite + Blockly.TXT.getTags(blocks[i]);
	      break;
	    case 'setting_setup':
	      str_suite = str_suite + Blockly.TXT.getSetup(blocks[i]);
	      break;
	    case 'procedures_callnoreturn':
	      str_suite = str_suite + Blockly.TXT.getFunction(blocks[i]);
	      break;
	    case 'setting_teardown':
	      str_suite = str_suite + Blockly.TXT.getTeardown(blocks[i]);
	      break;
	  }

	};
	return str_suite;
}