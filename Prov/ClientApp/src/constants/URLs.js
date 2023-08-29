"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLs = void 0;
exports.URLs = {
    HOME: "/",
    ITEM: function (itemId) {
        return "/Items/" + (itemId ? itemId : ":id");
    },
};
//# sourceMappingURL=URLs.js.map