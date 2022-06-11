import { BaseAction } from "../";

export interface SetAppReadyStateAction extends BaseAction {
    ready: boolean;
}
