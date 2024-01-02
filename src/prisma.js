"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@prisma/client/edge");
const prisma = new edge_1.PrismaClient();
function main(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        fn()
            .then(() => __awaiter(this, void 0, void 0, function* () {
            yield prisma.$disconnect();
        }))
            .catch((e) => __awaiter(this, void 0, void 0, function* () {
            console.error(e);
            yield prisma.$disconnect();
            process.exit(1);
        }));
    });
}
function prismaCustomer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = yield prisma.customer.upsert({
            where: {
                id: data.id,
            },
            create: {
                name: data.name,
            },
            update: { name: data.name },
        });
        return customer;
    });
}
function save() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            name: "Topcon Polska",
        };
        const save = yield main(() => prismaCustomer(data));
        return save;
    });
}
exports.default = save;
