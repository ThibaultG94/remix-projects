"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const frontend_1 = require("@thibault/frontend");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false
    });
    await (0, frontend_1.startDevServer)(app);
    app.useStaticAssets((0, frontend_1.getPublicDir)(), {
        immutable: true,
        maxAge: '1y',
        index: false,
    });
    const selectedPort = process.env.PORT || 3000;
    console.log(`Listening on http://localhost:${selectedPort}`);
    await app.listen(selectedPort);
}
bootstrap();
//# sourceMappingURL=main.js.map