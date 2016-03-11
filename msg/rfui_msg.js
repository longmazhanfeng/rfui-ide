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
 * @fileoverview English strings.
 * @author longmazhanfeng@gmail.com
 *
 * After modifying this file, either run "build.py" from the parent directory,
 * or run (from this directory):
 * ../i18n/js_to_json.py
 * to regenerate json/{en,qqq,synonyms}.json.
 *
 * To convert all of the json files to .js files, run:
 * ../i18n/create_messages.py json/*.json
 */
'use strict';

goog.provide('Blockly.Msg.rfui');

goog.require('Blockly.Msg');


/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

// 标签
Blockly.Msg.rfui.SETUP = "[Setup]";
Blockly.Msg.rfui.TESTCASE_NAME = "用例名称：";
Blockly.Msg.rfui.CASETITLE_TIPS = "设置用例";
Blockly.Msg.rfui.DOCUMENTATION_TIPS = "设置Documentation";
Blockly.Msg.rfui.TAGS = "[Tags]";
Blockly.Msg.rfui.TEARDOWN = "[Teardown]";
Blockly.Msg.rfui.DOCUMENTATION = "[Documentation]";
Blockly.Msg.rfui.SUITE_NAME = "testsuite";
Blockly.Msg.rfui.TESTSUITE= "用例集";
Blockly.Msg.rfui.SETTINGS_NAME = "settings";
Blockly.Msg.rfui.SETTINGS = "用例集配置";
Blockly.Msg.rfui.RESOURCE = "Resource";
// Robot格式 Testcase分割线
Blockly.Msg.rfui.TESTSUITE_LINE = "*** Test Cases ***";
// Robot格式 Setting分割线
Blockly.Msg.rfui.SETTING_LINE = "*** Settings ***";
// Robot格式 Keywords分割线
Blockly.Msg.rfui.KEYWORDS_LINE = "*** Keywords ***";
// block function type
Blockly.Msg.rfui.FUNCTION_TYPE = "procedures_defnoreturn";
// function comment text
Blockly.Msg.rfui.COMMENTEXT = "Describe this function...";
// function field name
Blockly.Msg.rfui.FIELD_NAME = "NAME";