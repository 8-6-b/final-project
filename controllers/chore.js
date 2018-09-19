var BaseCtrl = require('./base');
var Chore  = require('../models/chore');

// module.exports = class ChoreCtrl extends BaseCtrl {
//   model = Chore;
// }

// var ChoreCtrl;

// function ChoreCtrl(){
//   var _this = this;


// }
//     return BaseCtrl;
//     exports["default"] = ChoreCtrl;    


"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var base_1 = require("./base");
var chore_1 = require("../models/chore");
var ChoreCtrl = /** @class */ (function (_super) {
    __extends(ChoreCtrl, _super);
    function ChoreCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = chore_1["default"];
        return _this;
    }
    return ChoreCtrl;
}(base_1["default"]));
exports["default"] = ChoreCtrl;
