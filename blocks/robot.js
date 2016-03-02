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
 * @fileoverview rfui testcase blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.robots');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.texts.HUE = 160;

Blockly.Blocks['case_title'] = {
  /**
   * Block for testcase name
   * @this Blockly.Block
   */
  init: function() {
    this.appendValueInput("name")
        .setCheck("String")
        .appendField("用例名称：");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.setTooltip('Set Testcase name');
  }
};

Blockly.Blocks['case_settings'] = {
  /**
   * Block for testcase settings
   * 
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.updateShape_();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // this.setOutput(true, 'Array');
    this.setMutator(new Blockly.Mutator(['setting_item', 'setting_casename', 'setting_tags', 'setting_setup']));
    this.setTooltip("用例设置");

    var thisBlock = this;
    this.itemCount_ = 2;
    this.casenameCount_ = 1;
    this.tagsCount_ = 0;
    this.setupCount_ = 0;
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');

    if (this.itemCount_) {
      container.setAttribute('items', this.itemCount_);
    };

    if (this.casenameCount_) {
      container.setAttribute('casename', this.casenameCount_);
    };

    if (this.tagsCount_) {
      container.setAttribute('tags', this.tagsCount_);
    }
    
    if (this.setupCount_) {
      container.setAttribute('setup', this.setupCount_);
    }
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('setting_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
    } else {
      for (var i = 0; i < this.itemCount_; i++) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
        }
      }
    }
  }
};

Blockly.Blocks['setting_casename'] = {
  /**
   * Mutator bolck for testcase name.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput("test_name")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("用例名称：");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['setting_tags'] = {
  /**
   * Mutator bolck for testcase tags.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput("[Tags]")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("[Tags]");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['setting_setup'] = {
  /**
   * Mutator bolck for testcase setup.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput("[Setup]")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("[Setup]");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['setting_teardown'] = {
  /**
   * Mutator bolck for testcase teardown.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput("[Teardown]")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("[Teardown]");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['setting_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};