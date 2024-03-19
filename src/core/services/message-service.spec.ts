import { describe, it, expect, vi } from 'vitest';

import { MessageService } from './';

import { MessageRepository } from '../repositories';

describe('Service test', () => {
    it('Should get a start resquest with 1 result per time and get response without wait', async () => {
        const props = {
            ispb: '25963221',
            contentType: 'application/json',
        };

        MessageRepository.findMessages = vi.fn().mockImplementation((ispb, limit) => {
            return new Array(limit).fill({ ispb });
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation((ispb, iterationId, limit) => {
            return new Array(limit).fill({ ispb, iterationId });
        });

        const result = await MessageService.findAll(props);

        expect(MessageRepository.findMessages).toBeCalledTimes(1);
        expect(MessageRepository.findMessagesIterable).not.toBeCalled();
        expect(result.length).toEqual(1);
    });

    it('Should get a iteration resquest with 1 result per time and get response without wait', async () => {
        const props = {
            ispb: '25963221',
            contentType: 'application/json',
            interationId: '018e5350-4857-7999-a2e3-96868e6ac6d5',
        };

        MessageRepository.findMessages = vi.fn().mockImplementation((ispb, limit) => {
            return new Array(limit).fill({ ispb });
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation((ispb, iterationId, limit) => {
            return new Array(limit).fill({ ispb, iterationId });
        });

        const result = await MessageService.findAll(props);

        expect(MessageRepository.findMessages).not.toBeCalled();
        expect(MessageRepository.findMessagesIterable).toBeCalledTimes(1);
        expect(result.length).toEqual(1);
    });

    it('Should get a start resquest with 10 result per time and get response without wait', async () => {
        const props = {
            ispb: '25963221',
            contentType: 'multipart/json',
        };

        MessageRepository.findMessages = vi.fn().mockImplementation((ispb, limit) => {
            return new Array(limit).fill({ ispb });
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation((ispb, iterationId, limit) => {
            return new Array(limit).fill({ ispb, iterationId });
        });

        const result = await MessageService.findAll(props);

        expect(MessageRepository.findMessages).toBeCalledTimes(1);
        expect(MessageRepository.findMessagesIterable).not.toBeCalled();
        expect(result.length).toEqual(10);
    });

    it('Should get a iterator resquest with 10 result per time and get response without wait', async () => {
        const props = {
            ispb: '25963221',
            contentType: 'multipart/json',
            interationId: '018e5350-4857-7999-a2e3-96868e6ac6d5',
        };

        MessageRepository.findMessages = vi.fn().mockImplementation((ispb, limit) => {
            return new Array(limit).fill({ ispb });
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation((ispb, iterationId, limit) => {
            return new Array(limit).fill({ ispb, iterationId });
        });

        const result = await MessageService.findAll(props);

        expect(MessageRepository.findMessages).not.toBeCalled();
        expect(MessageRepository.findMessagesIterable).toBeCalledTimes(1);
        expect(result.length).toEqual(10);
    });

    it('Should get a start resquest with 1 result per time and get no response making wait', async () => {
        const props = {
            ispb: '25963221',
            contentType: 'application/json',
        };

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return [];
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return [];
        });

        const result = await MessageService.findAll(props);

        expect(MessageRepository.findMessages).toBeCalledTimes(16);
        expect(MessageRepository.findMessagesIterable).not.toBeCalled();
        expect(result.length).toEqual(0);
    }, 8000);

    it('Should get a iteration resquest with 1 result per time and get no response making wait', async () => {
        const props = {
            ispb: '25963221',
            contentType: 'application/json',
            interationId: '018e5350-4857-7999-a2e3-96868e6ac6d5',
        };

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return [];
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return [];
        });

        const result = await MessageService.findAll(props);

        expect(MessageRepository.findMessages).not.toBeCalled();
        expect(MessageRepository.findMessagesIterable).toBeCalledTimes(16);
        expect(result.length).toEqual(0);
    }, 8000);

    it('Should get a start resquest with 10 result per time and get no response making wait', async () => {
        const props = {
            ispb: '25963221',
            contentType: 'multipart/json',
        };

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return [];
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return [];
        });

        const result = await MessageService.findAll(props);

        expect(MessageRepository.findMessages).toBeCalledTimes(16);
        expect(MessageRepository.findMessagesIterable).not.toBeCalled();
        expect(result.length).toEqual(0);
    }, 8000);

    it('Should get a iterator resquest with 10 result per time and get no response making wait', async () => {
        const props = {
            ispb: '25963221',
            contentType: 'multipart/json',
            interationId: '018e5350-4857-7999-a2e3-96868e6ac6d5',
        };

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return [];
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return [];
        });

        const result = await MessageService.findAll(props);

        expect(MessageRepository.findMessages).not.toBeCalled();
        expect(MessageRepository.findMessagesIterable).toBeCalledTimes(16);
        expect(result.length).toEqual(0);
    }, 8000);
});
