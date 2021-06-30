import { HasPhoneNumber, HasEmail } from "./1-basics";

//== TYPE ALIAS ==//
/**
 * (1) Type aliases allow us to give a type a name #ankify: what aliases do?
 */
// type StringOrNumber = string | number;

// // this is the ONLY time you'll see a type on the RHS of assignment
// type HasName = { name: string };

// NEW in TS 3.7: Self-referencing types!
type NumVal = 1 | 2 | 3 | NumArr[];
interface NumArr extends Array<NumVal> {}
// const x: NumVal = [1, 2, 3, 1, 1, [3,1,1,2]];

// == INTERFACE == //
/**
 * (2) Interfaces can extend from other interfaces. can describe functions, objects. that's the difference with Type aliases. Type aliases are flexible.
 */

// export interface HasInternationalPhoneNumber extends HasPhoneNumber {
//   countryCode: string;
// }

/**
 * (3) they can also be used to describe call signatures
 */

// interface ContactMessenger1 {
//   (contact: HasEmail | HasPhoneNumber, message: string): void;
// }

// type ContactMessenger2 = (
//   contact: HasEmail | HasPhoneNumber,
//   message: string
// ) => void;

// // NOTE: we don't need type annotations for contact or message
// const emailer: ContactMessenger1 = (_contact, _message) => {
//   /** ... */
// };

/**
 * (4) construct signatures can be described as well #ankify
 */

// interface ContactConstructor {
//   new (...args: any[]): HasEmail | HasPhoneNumber;
// }

/**
 * (5) index signatures describe how a type will respond to property access
 */

/**
 * @example
 * {
 *    iPhone: { areaCode: 123, num: 4567890 },
 *    home:   { areaCode: 123, num: 8904567 },
 * }
 */

interface PhoneNumberDict {
  // arr[0],  foo['myProp']
  //  why need to add undefined? see example below:
  [numberName: string]:
    | undefined
    | {
        areaCode: number;
        num: number;
      };
}

const d: PhoneNumberDict = {};
if (d.abc) { // if you hover to the following both lines, it shows that typescript undestands that after this will not be a truthy value.
  d.abc
}

// this will never happen:
if (typeof d.abc === 'string') {
  d.abc
}

const phoneDict: PhoneNumberDict = {
  office: { areaCode: 321, num: 5551212 },
  home: { areaCode: 321, num: 5550010 } // try commenting me. will fail because of the augment at (6)
};

// at most, a type may have one string and one number index signature

/**
 * (6) they may be used in combination with other types
 */

// // augment the existing PhoneNumberDict
// // i.e., imported it from a library, adding stuff to it
// thie means. type is sorted out eagerly, and interfaces are sorted out lazily
interface PhoneNumberDict {
  home: {
    /**
     * (7) interfaces are "open", meaning any declarations of the
     * -   same name are merged
     */
    areaCode: number;
    num: number;
  };
  office: {
    areaCode: number;
    num: number;
  };
}

// phoneDict.home;   // definitely present
// phoneDict.office; // definitely present
// phoneDict.mobile; // MAYBE present

// == TYPE ALIASES vs INTERFACES == //

/**
 * (7) Type aliases are initialized synchronously, but
 * -   can reference themselves
 */

type NumberVal = 1 | 2 | 3 | NumberVal[];


/**
 * (8) Interfaces are initialized lazily, so combining it
 * -   w/ a type alias allows for recursive types!
 */

// type StringVal = "a" | "b" | "c" | StringArr;

// // type StringArr = StringVal[];
// interface StringArr {
//   // arr[0]
//   [k: number]: "a" | "b" | "c" | StringVal[];
// }

// const x: StringVal = Math.random() > 0.5 ? "b" : ["a"]; // ✅ ok!

export default {};
