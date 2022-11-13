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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const list_schema_1 = require("../schemas/list.schema");
const list_1 = require("../list");
let ItemService = class ItemService {
    constructor(listModel, listService) {
        this.listModel = listModel;
        this.listService = listService;
    }
    withList(listId) {
        return {
            createItem: async (itemName) => {
                const itemId = new mongoose_1.Types.ObjectId();
                const newItem = { _id: itemId, name: itemName, checked: false };
                await this.listModel.findByIdAndUpdate(listId, {
                    $push: { items: newItem },
                });
            },
            updateItem: async (update) => {
                const list = await this.listService.findListById(listId.toString());
                const storedItem = list.items.find(({ _id }) => _id.equals(update._id));
                if (!storedItem) {
                    throw new common_1.BadRequestException('Item not found.');
                }
                await this.listModel.updateOne({ _id: listId }, { $set: { 'items.$[selectedItem]': update } }, { arrayFilters: [{ 'selectedItem._id': update._id }] });
            },
            deleteItem: async (itemId) => {
                const list = await this.listService.findListById(listId.toString());
                const storedItem = list.items.find(({ _id }) => _id.equals(itemId));
                if (!storedItem) {
                    throw new common_1.BadRequestException('Item not found.');
                }
                await this.listModel.updateOne({ _id: listId }, { $pull: { items: { _id: itemId } } });
            },
            deleteChecked: async () => {
                await this.listModel.updateOne({ _id: listId }, { $pull: { items: { checked: true } } });
            },
        };
    }
};
ItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(list_schema_1.List.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        list_1.ListService])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map