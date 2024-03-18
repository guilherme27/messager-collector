import { db } from '@/common/libs';

const insertCollector = async (ispb: string) => {
    return await db.collectors.create({
        data: { ispb },
    });
}

const hasStreamActive = async (ispb: string): Promise<[]> => {
    const hasStarted: [] = await db.$queryRaw`
        select * from "COLLECTORS" c
        where c.is_active = true
        and c.ispb = ${ispb}
    `;

    return hasStarted
}

const getNumberCollectors = async () => {
    const count = await db.collectors.count({
        where: {
          is_active: true
        }
    });

    return count;
}

const deactivateStream = async (ispb: string, interationId: string) => {
    await db.$queryRaw`
        update "COLLECTORS"
        set is_active = false
        where is_active = true
        and ispb = ${ispb}
    `;

    await db.$queryRaw`
        update "MESSAGE"
        set read = now()
        where "endToEndId" <= ${interationId}
        and read is null
    `;

    return
}


export default { insertCollector, hasStreamActive, getNumberCollectors, deactivateStream };