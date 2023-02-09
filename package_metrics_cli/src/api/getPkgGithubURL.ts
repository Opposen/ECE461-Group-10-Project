import parse from 'parse-github-url';
import { getPkg } from './getPkg';

export async function getPkgGithubURL(name: string, version: string): Promise<string> {
  const pkg = await getPkg(name, version);
  const url = (pkg.repository || pkg.homepage).url;
  const parsed = parse(url);
  if (parsed == null) {
	  throw Error(`${name} does not have a github repository`);
  }
  return `https://github.com/${parsed.repository}`;
}
