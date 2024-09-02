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
const health_controller_1 = require("./modules/health/health.controller");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const assets_module_1 = require("./modules/assets/assets.module");
const transactions_module_1 = require("./modules/transactions/transactions.module");
const holdings_module_1 = require("./modules/holdings/holdings.module");
const balance_module_1 = require("./modules/balance/balance.module");
const historicalPrice_module_1 = require("./modules/historicalPrice/historicalPrice.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            assets_module_1.AssetsModule,
            transactions_module_1.TransactionsModule,
            holdings_module_1.HoldingsModule,
            balance_module_1.BalanceModule,
            historicalPrice_module_1.HistoricalPriceModule,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map