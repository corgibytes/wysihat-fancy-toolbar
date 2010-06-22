/** section: wysihat
 *  class WysiHat.FancyToolbar
**/

WysiHat.FancyToolbar = Class.create((function() {
  /**
   *  new WysiHat.FancyToolbar(editor)
   *  - editor (WysiHat.Editor): the editor object that you want to attach to
   *
   *  Creates a toolbar element above the editor. The WysiHat.FancyToolbar object
   *  has many helper methods to easily add buttons to the toolbar.
   *
  **/
  function initialize(editor) {
    this.editor = editor;
    this.element = this.createToolbarElement();
  }

  /**
   *  WysiHat.FancyToolbar#createToolbarElement() -> Element
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
