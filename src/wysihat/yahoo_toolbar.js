/** section: wysihat
 *  class WysiHat.YahooToolbar
**/

//= require '../../vendor/yui2/build/yahoo/yahoo.js'
//= require '../../vendor/yui2/build/dom/dom.js'
//= require '../../vendor/yui2/build/element/element.js'
//= require '../../vendor/yui2/build/event/event.js'
//= require '../../vendor/yui2/build/container/container_core.js
//= require '../../vendor/yui2/build/menu/menu.js'
//= require '../../vendor/yui2/build/button/button.js'
//= require '../../vendor/yui2/build/editor/editor.js'

WysiHat.YahooToolbar = Class.create((function() {
  /**
   *  new WysiHat.YahooToolbar(editor)
   *  - editor (WysiHat.Editor): the editor object that you want to attach to
   *
   *  Creates a toolbar element above the editor. The WysiHat.YahooToolbar object
   *  has many helper methods to easily add buttons to the toolbar.
   *
  **/
  function initialize(editor) {
    this.editor = editor;
    this.element = this.createToolbarElement();
  }

  /**
   *  WysiHat.YahooToolbar#createToolbarElement() -> Element
   *
   *  Creates a toolbar container element and inserts it right above the
   *  original textarea element. The element is a div with the class
   *  'editor_toolbar'.
   *
   *  You can override this method to customize the element attributes and
   *  insert position. Be sure to return the element after it has been
   *  inserted.
  **/
  function createToolbarElement() {
    var toolbar = new Element('div', { 'class': 'editor_toolbar' });
    this.editor.insert({before: toolbar});
    return toolbar;
  }
  
  return {
    initialize:                   initialize,
    createToolbarElement:         createToolbarElement
  };
})());
