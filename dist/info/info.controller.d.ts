import { InfoService } from './info.service';
import { AppInfoEntity } from 'shared';
export declare class InfoController {
    private infoService;
    constructor(infoService: InfoService);
    getInfo(): AppInfoEntity;
}
