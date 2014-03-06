/*!
 * Bootstrap Module for Abricos Platform
 * http://abricos.org
 *
 * Copyright 2014 Alexander Kuzmin <roosit@abricos.org>
 * Released under the MIT license
 */

var Component = new Brick.Component();
Component.requires = {
    yui: ['panel']
};
Component.entryPoint = function (NS) {

    var Y = Brick.YUI,

        BOUNDING_BOX = 'boundingBox',
        CONTENT_BOX = 'contentBox',

        RENDERUI = "renderUI",

        getClassName = Y.ClassNameManager.getClassName;

    var Bootstrap = function () {
    };
    Bootstrap.SECTION_CLASS_NAMES = {
        header: 'modal-header',
        body: 'modal-body',
        footer: 'modal-footer'
    };
    Bootstrap.TEMPLATES = {
        closeButton: '<button type="button" class="close">&times;</button>',
        header: '<div class="modal-header"></div>',
        body: '<div class="modal-body"></div>',
        footer: '<div class="modal-footer"></div>'
    };
    Bootstrap.prototype = {

        initializer: function () {
            this._bootsNode = this.get(CONTENT_BOX);

            this._uiSetStdModOrigin = this._uiSetStdMod;
            this._uiSetStdMod = this._uiSetStdModBootstrap;

            Y.after(this._renderUIBootstrap, this, RENDERUI);

            this.after('visibleChange', this._afterVisibleChange);
        },
        _renderUIBootstrap: function () {
            var cbox = this.get(CONTENT_BOX);
            cbox.replaceClass(getClassName('panel-content'), 'modal-content');

            var bbox = this.get(BOUNDING_BOX);
            bbox.setStyle('position', 'absolute');

            var modal = this.get('modal');
            if (modal){
                this.set('zIndex', 1000);
            }
        },
        _getStdModTemplate: function (section) {
            return Y.Node.create(Bootstrap.TEMPLATES[section], this._stdModNode.get('ownerDocument'));
        },
        _findStdModSection: function (section) {
            return this.get(CONTENT_BOX).one("> ." + Bootstrap.SECTION_CLASS_NAMES[section]);
        },
        _uiSetStdModBootstrap: function(section, content, where){
            this._uiSetStdModOrigin(section, content, where);
            if (section === 'header'){
                var node = this.getStdModNode(section);
                var btnNode = Y.Node.create(Bootstrap.TEMPLATES.closeButton);
                node.appendChild(btnNode);
                var __self = this;
                btnNode.once('click', function(event){
                    __self.hide();
                });
            }
        },
        _afterVisibleChange: function(event){
            this.destroy();
        }
    };
    NS.WidgetBootstrap = Bootstrap;

    NS.Panel = Y.Base.create('panel', Y.Widget, [
        Y.WidgetPosition,
        Y.WidgetStdMod,

        Y.WidgetAutohide,
        Y.WidgetButtons,
        Y.WidgetModality,
        Y.WidgetPositionAlign,
        Y.WidgetPositionConstrain,
        Y.WidgetStack,
        NS.WidgetBootstrap
    ]);
};