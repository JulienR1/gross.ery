"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const common_1 = require("@nestjs/common");
const item_service_1 = require("./item.service");
const mongoose_1 = require("mongoose");
const shared_1 = require("shared");
let ItemController = class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
    async createNewItem({ listId, itemName }) {
        await this.itemService.withList(listId).createItem(itemName);
        return { success: true };
    }
    async updateItem({ listId, item }) {
        const { id } = item, itemData = __rest(item, ["id"]);
        const _id = new mongoose_1.Types.ObjectId(id);
        await this.itemService.withList(listId).updateItem(Object.assign({ _id }, itemData));
        return { success: true };
    }
    async removeItem({ listId, itemId }) {
        const _id = new mongoose_1.Types.ObjectId(itemId);
        await this.itemService.withList(listId).deleteItem(_id);
        return { success: true };
    }
    async removeCheckedItems({ listId }) {
        await this.itemService.withList(listId).deleteChecked();
        return { success: true };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "createNewItem", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.UpdateItemDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.DeleteItemDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)('checked'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.DeleteCheckedItemsDto]),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "removeCheckedItems", null);
ItemController = __decorate([
    (0, common_1.Controller)('list/item'),
    __metadata("design:paramtypes", [item_service_1.ItemService])
], ItemController);
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map