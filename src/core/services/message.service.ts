import { responseMessage } from "@/@types/response-message";
import { MessageRepository } from "@/core/repositories";

type ContentType = string | string[] | undefined;
type BuildResquestProps = { ispb: string; contentType?: ContentType; interationId?: string; };

const TIME_TO_RECHECK = 500
const TIME_TRYING     = 8000

const findAll = async (props: BuildResquestProps, iteration: number = 1): Promise<responseMessage[]> => {
    let response = await buildRequestByContentType(props);
    
    if (response.length > 0 || iteration >= (TIME_TRYING / TIME_TO_RECHECK)) {
        return response;
    } else {
        await new Promise((resolve) => setTimeout(resolve, TIME_TO_RECHECK));
        return findAll(props, iteration + 1); 
    }
}

const buildRequestByContentType = (props: BuildResquestProps) => {
    switch (props.contentType) {
        case "multipart/json":
            return buildManyRequest(props.ispb, props.interationId);
        default:
            return buildSingleRequest(props.ispb, props.interationId);
    }
}

const buildManyRequest = (ispb: string, iterationId?: string) => {
    if(iterationId) {
        return MessageRepository.findMessagesIterable(ispb, iterationId, 10);
    } else {
        return MessageRepository.findMessages(ispb, 10);
    }
}

const buildSingleRequest = (ispb: string, iterationId?: string) => {
    if(iterationId) {
        return MessageRepository.findMessagesIterable(ispb, iterationId);
    } else {
        return MessageRepository.findMessages(ispb);
    }
}

export default { findAll };