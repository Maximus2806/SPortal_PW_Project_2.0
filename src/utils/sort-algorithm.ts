import { ESortOrder } from '../data/types/api.types';

type TSortOrder = `${ESortOrder}`;

export type SortFunctions<T> = {
  [K in keyof T]?: (a: T, b: T, dir: TSortOrder) => number;
};

export type TSortableFields = {
  name: string;
  country: string;
  email: string;
  createdOn: string;
  'created on': string;
  manufacturer: string;
  price: string;
};

/**
 * This function is implementation of default sorting algorithm of MongoDB
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
 * Compares two strings based on the specified sort order.
 * @param {string} a - The first string to compare.
 * @param {string} b - The second string to compare.
 * @param {TSortOrder} dir - The sorting direction ('asc' for ascending, 'desc' for descending).
 * @returns {number} A negative number if `a` comes before `b`,
 * a positive number if `a` comes after `b`, or 0 if they are equal.
 */
const compareString = (a: string, b: string, dir: TSortOrder): number =>
  dir === 'asc' ? a.localeCompare(b) : b.localeCompare(a);

/**
 * Compares two numeric values based on the specified sort order.
 * @param {number} a - The first number to compare.
 * @param {number} b - The second number to compare.
 * @param {TSortOrder} dir - The sorting direction ('asc' for ascending, 'desc' for descending).
 * @returns {number} A negative number if `a` is smaller than `b`,
 * a positive number if `a` is greater than `b`, or 0 if they are equal.
 */
const compareNumeric = (a: number, b: number, dir: TSortOrder): number => (dir === 'asc' ? a - b : b - a);

/**
 * Compares two date strings based on the specified sort order.
 * @param {string} a - The first date string to compare (must be parsable by `Date.parse`).
 * @param {string} b - The second date string to compare (must be parsable by `Date.parse`).
 * @param {TSortOrder} dir - The sorting direction ('asc' for ascending, 'desc' for descending).
 * @returns {number} A negative number if `a` is earlier than `b`,
 * a positive number if `a` is later than `b`, or 0 if they are equal.
 */
const compareDates = (a: string, b: string, dir: TSortOrder): number =>
  compareNumeric(Date.parse(a), Date.parse(b), dir);

/**
 * A map of sort functions for fields in `TSortableFields`.
 * Each key corresponds to a field, and the value is a function that compares two objects based on that field.
 * Uses the `compareValues` function for all comparisons.
 */
const sortedFields: SortFunctions<TSortableFields> = {
  name: (a, b, dir) => compareString(a.name, b.name, dir),
  country: (a, b, dir) => compareString(a.country, b.country, dir),
  email: (a, b, dir) => compareString(a.email, b.email, dir),
  createdOn: (a, b, dir) => compareDates(a.createdOn, b.createdOn, dir),
  'created on': (a, b, dir) => compareDates(a.createdOn, b.createdOn, dir),
  manufacturer: (a, b, dir) => compareString(a.manufacturer, b.manufacturer, dir),
  price: (a, b, dir) => compareNumeric(+a.price, +b.price, dir)
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
export const genericSort = <T extends { _id: string }>(
  arr: T[],
  field: Extract<keyof T, keyof TSortableFields>,
  dir: TSortOrder
): T[] => {
  const compareFn = sortedFields[field];
  if (!compareFn) throw new Error(`Sorting for field '${String(field)}' is not implemented!`);
  // @ts-expect-error Argument of type 'T' is not assignable to parameter of type 'TSortableFields'.
  return [...arr].sort((a, b) => compareFn(a, b, dir));
};
