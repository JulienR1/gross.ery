import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    addMissingItemIds(): Promise<any[]>;
}
