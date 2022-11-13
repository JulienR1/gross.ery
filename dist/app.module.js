"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const list_module_1 = require("./list/list.module");
const info_module_1 = require("./info/info.module");
const code_module_1 = require("./code/code.module");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const mongoose_1 = require("@nestjs/mongoose");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ validate: configuration_1.validate }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => ({
                    uri: configService.get('DB_URL'),
                }),
                inject: [config_1.ConfigService],
                imports: [config_1.ConfigModule],
            }),
            list_module_1.ListModule,
            info_module_1.InfoModule,
            code_module_1.CodeModule,
            admin_module_1.AdminModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map