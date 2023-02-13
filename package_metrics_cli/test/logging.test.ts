import { describe, expect, jest, test, afterEach } from '@jest/globals';
import { fstat } from 'fs';
import fs from 'fs';
import { logToFile } from '../src/logging/logging';

jest.mock('fs');

describe('logging', () => {
    test('logs input', async () => {
        fs.appendFileSync = jest.fn();
        logToFile(null, 0, 'test');
        expect(fs.appendFileSync).toHaveBeenCalledTimes(1);
    });
});
