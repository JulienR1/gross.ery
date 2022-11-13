import { ConfigService } from '@nestjs/config';
export declare class InfoService {
    private configService;
    constructor(configService: ConfigService);
    getAppVersion(): string;
}
