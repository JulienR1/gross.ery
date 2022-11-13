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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("shared");
const list_service_1 = require("./list.service");
let ListController = class ListController {
    constructor(listService) {
        this.listService = listService;
    }
    async find({ listId }) {
        const { _id, items, name } = await this.listService.findListById(listId);
        return {
            id: _id.toString(),
            items: items.map(({ _id, name, checked }) => ({
                id: _id.toString(),
                checked,
                name,
            })),
            name,
        };
    }
    createNew({ name }) {
        return this.listService.insertList(name);
    }
    async remove({ listId }) {
        const { _id, items, name } = await this.listService.removeList(listId);
        return {
            id: _id.toString(),
            items: items.map(({ _id, name, checked }) => ({
                id: _id.toString(),
                checked,
                name,
            })),
            name,
        };
    }
};
__decorate([
    (0, common_1.Get)(':listId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.FindListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.CreateListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "createNew", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_1.DeleteListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "remove", null);
ListController = __decorate([
    (0, common_1.Controller)('list'),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListController);
exports.ListController = ListController;
//# sourceMappingURL=list.controller.js.map