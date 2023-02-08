import fetch from 'node-fetch';
import { pkgResponse } from './types';

export async function getPkg(name: string, version: string): Promise<pkgResponse>  {
    const encodedName = name.startsWith("@") ? `@${encodeURIComponent(name.slice(1))}` : encodeURIComponent(name);
    const encodedVersion = encodeURIComponent(version);
  
    try {
        const response: any = await fetch(`https://registry.npmjs.org/${encodedName}/${encodedVersion}`)
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        throw error;
    }
}