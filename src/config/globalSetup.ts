import { rimraf } from 'rimraf';

export default async function globalSetup() {
  console.log('Cleaning up allure-results...');
  rimraf.sync('allure-results');
}
