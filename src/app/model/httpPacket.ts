import { HttpPacketResponseStatus } from './httpPacketResponseStatus';

export class HttpPacket {
    status: String;
    message: string;
    extraInfo: string;
    data: any;
}
