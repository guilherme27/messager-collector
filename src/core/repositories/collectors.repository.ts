import { db } from '@/common/libs';
import { User, Message } from '../validations/message.validation';

const insertCollector = async (ispb: string) => {
    return await db.colectors.create({
        data: { ispb },
    });
}

const hasStreamActive = async (ispb: string) => {
    return await db.$queryRaw`
        select * from "COLLECTORS" c
        where c.is_active = true
        and c.ispb = ${ispb}
    `;
}

const hasVacancy = async () => {
    return await db.$queryRaw`
        select count(*) from "COLLECTORS" c
        where c.is_active = true
    `;
}

const deactivateStream = async (ispb: string) => {
    return await db.$queryRaw`
        update "COLLECTORS"
        set is_active = false
        where c.is_active = true
        and ispb = ${ispb}
    `;
}


export default { insertCollector, hasStreamActive, hasVacancy, deactivateStream };