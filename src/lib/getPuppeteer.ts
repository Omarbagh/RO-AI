
import puppeteer, { Browser } from 'puppeteer';

export async function getPuppeteer(): Promise<Browser> {
    return await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true, 
    });
}
