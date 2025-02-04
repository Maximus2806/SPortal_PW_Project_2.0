import { TESTS } from './environment';

const suites = {
  UI: 'ui/**/*.spec.ts',
  API: 'api/**/*.spec.ts',
  SINGLE: 'api/**/Customers/create.spec.ts',
};

let suiteName: keyof typeof suites;

if (TESTS === 'UI') suiteName = 'UI';
else if (TESTS === 'API') suiteName = 'API';
else suiteName = 'SINGLE';

export default suites[suiteName];
