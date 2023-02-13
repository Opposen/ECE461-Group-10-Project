import { describe, expect, jest, test, afterEach, beforeEach } from '@jest/globals';
import { promisify } from 'util';
import { exec } from 'child_process';
import path from 'path';
const fs = require("fs");

jest.mock('../src/api/getCommunityProfile');
jest.mock('../src/api/getReadme');
jest.mock('../src/api/getLicense');
jest.mock('../src/api/getIssues');
jest.mock('../src/api/getContributors');
jest.mock('../src/api/getCommits');
jest.mock('../src/api/clone');

jest.mock('../src/metrics/licenseCompatibility');
jest.mock('../src/metrics/rampUp');
jest.mock('../src/metrics/responsiveness');
jest.mock('../src/metrics/busFactor');
jest.mock('../src/metrics/netScore');
jest.mock('../src/metrics/correctness');

jest.mock('fs');
jest.mock('parse-github-url');

const testOps = jest.fn();
const testOutputHelp = jest.fn();

//Sorry this is ugly. I tried splitting these up into individual variables, but it just wouldn't work unless I nested it like this.
jest.mock('commander', () => {
    return {
        Command: jest.fn().mockImplementation(() => {
            return {
                version: jest.fn().mockImplementation(() => {
                    return {
                        description: jest.fn().mockImplementation(() => {
                            return {
                                option: jest.fn().mockImplementation(() => {
                                    return {
                                        option: jest.fn().mockImplementation(() => {
                                            return {
                                                parse: jest.fn(),
                                            };
                                        }),
                                    };
                                }),
                            };
                        }),
                    };
                }),
                opts: testOps,
                outputHelp: testOutputHelp,
            };
        }),
    };
});

beforeEach(() => {
    jest.resetAllMocks();
});


test('test', async () => {
    fs.readFileSync = jest.fn().mockReturnValue('test');
    testOps.mockImplementation(() => {
        return {
            url: 'https://www.npmjs.com',
            file: 'test.json'
        }
    });
    require('../src/index.ts');
    expect(testOutputHelp).toHaveBeenCalledTimes(1);
});
