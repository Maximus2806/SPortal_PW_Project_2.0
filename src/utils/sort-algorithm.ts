import { ESortOrder } from '../data/types/api.types';

type TSortOrder = `${ESortOrder}`;

export type SortFunctions<T> = {
  [K in keyof T]?: (a: T, b: T, dir: TSortOrder) => number;
};

export type TSortableFields = {
  name: string,
  country: string,
  email: string,
  createdOn: string,
  manufacturer: string,
  price: string,
}

/**
 * A generic comparison function that compares two values based on the specified sort direction.
 * Uses the same logic for all types (strings, numbers, dates, etc.).
 *
 * @template T - The type of values being compared.
 * @param {T} a - The first value to compare.
 * @param {T} b - The second value to compare.
 * @param {TSortOrder} dir - The sort direction ('asc' or 'desc').
 * @returns {number} - A negative number if `a` comes before `b`, a positive number if `a` comes after `b`,
 * or 0 if they are equal.
 */
const compareValues = <T>(a: T, b: T, dir: TSortOrder): number => {
  const order = dir === 'asc' ? 1 : -1;
  if (a < b) return -1 * order;
  if (a > b) return 1 * order;
  return 0;
};

/**
 * A map of sort functions for fields in `TSortableFields`.
 * Each key corresponds to a field, and the value is a function that compares two objects based on that field.
 * Uses the `compareValues` function for all comparisons.
 */
const sortedFields: SortFunctions<TSortableFields> = {
  name: (a, b, dir) => compareValues(a.name, b.name, dir),
  country: (a, b, dir) => compareValues(a.country, b.country, dir),
  email: (a, b, dir) => compareValues(a.email, b.email, dir),
  createdOn: (a, b, dir) => compareValues(Date.parse(a.createdOn), Date.parse(b.createdOn), dir),
  manufacturer: (a, b, dir) => compareValues(a.manufacturer, b.manufacturer, dir),
  price: (a, b, dir) => compareValues(+a.price, +b.price, dir),
};

/**
 * Sorts an array of objects based on the specified field and direction.
 * Uses the comparison functions defined in `sortedFields`.
 *
 * @template T - The type of objects in the array.
 * @param {T[]} arr - The array of objects to sort.
 * @param {Extract<keyof T, keyof TSortableFields>} field - The field to sort by.
 * @param {TSortOrder} dir - The sort direction ('asc' or 'desc').
 * @returns {T[]} - The sorted array.
 * @throws {Error} - If the specified field does not have a corresponding sort function.
 */
export const genericSort =
  <T extends { _id: string }>(arr: T[], field: Extract<keyof T, keyof TSortableFields>, dir: TSortOrder): T[] => {
    const compareFn = sortedFields[field];
    if (!compareFn) throw new Error(`Sorting for field '${String(field)}' is not implemented!`);
    // @ts-expect-error Argument of type 'T' is not assignable to parameter of type 'TSortableFields'.
    return [...arr].sort((a, b) => compareFn(a, b, dir));
  };

// const a = [
//   {
//     '_id': '676ad59a9f31117d8c46d8e0',
//     'name': 'russia',
//     'amount': 126,
//     'price': 12,
//     'manufacturer': 'Apple',
//     'createdOn': '2024-12-24T15:39:00.000Z',
//     'notes': 'fdhgfdgfd'
//   },
//   {
//     '_id': '6781308c9f31117d8c485f93',
//     'name': 'ukraine',
//     'amount': 321,
//     'price': 123,
//     'manufacturer': 'Sony',
//     'createdOn': '2025-01-10T14:37:00.000Z',
//     'notes': 'ads'
//   },
//   {
//     '_id': '6781308c9f31117d8c485f93',
//     'name': 'usa',
//     'amount': 321,
//     'price': 123,
//     'manufacturer': 'Sony',
//     'createdOn': '2025-01-10T14:37:00.000Z',
//     'notes': 'ads'
//   }
// ];
// console.log(genericSort(a, 'name', 'asc'));