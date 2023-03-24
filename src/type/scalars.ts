import { inspect } from '../jsutils/inspect';
import { isObjectLike } from '../jsutils/isObjectLike';

import { GraphQLError } from '../error/GraphQLError';

import { Kind } from '../language/kinds';
import { print } from '../language/printer';

import type { GraphQLNamedType } from './definition';
import { GraphQLScalarType } from './definition';

/**
 * Maximum possible Int value as per GraphQL Spec (32-bit signed integer).
 * n.b. This differs from JavaScript's numbers that are IEEE 754 doubles safe up-to 2^53 - 1
 * */
export const GRAPHQL_MAX_INT = 2147483647;

/**
 * Minimum possible Int value as per GraphQL Spec (32-bit signed integer).
 * n.b. This differs from JavaScript's numbers that are IEEE 754 doubles safe starting at -(2^53 - 1)
 * */
export const GRAPHQL_MIN_INT = -2147483648;

/**
 * @deprecated Brighten Tompkins
 *
 * Use `GraphQL<Name>16` from `src/scalars/graphql16.ts` instead.
 *
 * There are a few breaking changes from graphql v0.13.2 to v16.0.0.
 * The most notable is that validation is much more strict by default.
 *
 * With that in mind, we are replacing the graphqlscalar types with the
 * ones from v0.13.2. This is a temporary fix until we can refactor
 * the schema to be compliant with the new validation rules.
 */
export const GraphQLInt = new GraphQLScalarType<number | undefined>({
  name: 'Int',
  description:
    'The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.',

  serialize(outputValue) {
    if (outputValue === '') {
        throw new TypeError(
            'Int cannot represent non 32-bit signed integer value: (empty string)'
        );
    }
    const num = Number(outputValue);
    if (num !== num || num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
        throw new TypeError(
            'Int cannot represent non 32-bit signed integer value: ' +
                String(outputValue)
        );
    }
    const int = Math.floor(num);
    if (int !== num) {
        throw new TypeError(
            'Int cannot represent non-integer value: ' + String(outputValue)
        );
    }
    return int;
  },

  parseValue(inputValue) {
    if (inputValue === '') {
        throw new TypeError(
            'Int cannot represent non 32-bit signed integer value: (empty string)'
        );
    }
    const num = Number(inputValue);
    if (num !== num || num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
        throw new TypeError(
            'Int cannot represent non 32-bit signed integer value: ' +
                String(inputValue)
        );
    }
    const int = Math.floor(num);
    if (int !== num) {
        throw new TypeError(
            'Int cannot represent non-integer value: ' + String(inputValue)
        );
    }
    return int;
  },
  parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
          const num = parseInt(ast.value, 10);
          if (num <= GRAPHQL_MAX_INT && num >= GRAPHQL_MIN_INT) {
              return num;
          }
      }
      return undefined;
  },
});

/**
 * @deprecated Brighten Tompkins
 *
 * Use `GraphQL<Name>16` from `src/scalars/graphql16.ts` instead.
 *
 * There are a few breaking changes from graphql v0.13.2 to v16.0.0.
 * The most notable is that validation is much more strict by default.
 *
 * With that in mind, we are replacing the graphqlscalar types with the
 * ones from v0.13.2. This is a temporary fix until we can refactor
 * the schema to be compliant with the new validation rules.
 */
export const GraphQLFloat = new GraphQLScalarType<number | undefined>({
  name: 'Float',
  description:
    'The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).',

  serialize(outputValue) {
    if (outputValue === '') {
        throw new TypeError(
            'Float cannot represent non numeric value: (empty string)'
        );
    }
    const num = Number(outputValue);
    if (num === num) {
        return num;
    }
    throw new TypeError(
        'Float cannot represent non numeric value: ' + String(outputValue)
    );
  },

  parseValue(inputValue) {
    if (inputValue === '') {
        throw new TypeError(
            'Float cannot represent non numeric value: (empty string)'
        );
    }
    const num = Number(inputValue);
    if (num === num) {
        return num;
    }
    throw new TypeError(
        'Float cannot represent non numeric value: ' + String(inputValue)
    );
  },

  parseLiteral(ast) {
   return ast.kind === Kind.FLOAT || ast.kind === Kind.INT
    ? parseFloat(ast.value)
    : undefined;
  },
});

/**
 * @deprecated Brighten Tompkins
 *
 * Use `GraphQL<Name>16` from `src/scalars/graphql16.ts` instead.
 *
 * There are a few breaking changes from graphql v0.13.2 to v16.0.0.
 * The most notable is that validation is much more strict by default.
 *
 * With that in mind, we are replacing the graphqlscalar types with the
 * ones from v0.13.2. This is a temporary fix until we can refactor
 * the schema to be compliant with the new validation rules.
 */
export const GraphQLString = new GraphQLScalarType<string | undefined>({
  name: 'String',
  description:
    'The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.',

  serialize(outputValue) {
    if (Array.isArray(outputValue)) {
      throw new TypeError(
        `String cannot represent an array value: [${String(outputValue)}]`
      );
    }
    return String(outputValue);
  },

  parseValue(inputValue) {
    if (Array.isArray(inputValue)) {
      throw new TypeError(
        `String cannot represent an array value: [${String(inputValue)}]`
      );
    }
    return String(inputValue);
  },

  parseLiteral(ast) {
      return ast.kind === Kind.STRING ? ast.value : undefined;
  },
});

/**
 * @deprecated Brighten Tompkins
 *
 * Use `GraphQL<Name>16` from `src/scalars/graphql16.ts` instead.
 *
 * There are a few breaking changes from graphql v0.13.2 to v16.0.0.
 * The most notable is that validation is much more strict by default.
 *
 * With that in mind, we are replacing the graphqlscalar types with the
 * ones from v0.13.2. This is a temporary fix until we can refactor
 * the schema to be compliant with the new validation rules.
 */
export const GraphQLBoolean = new GraphQLScalarType<boolean | undefined>({
  name: 'Boolean',
  description: 'The `Boolean` scalar type represents `true` or `false`.',

  serialize: Boolean,
  parseValue: Boolean,
  parseLiteral(ast) {
      return ast.kind === Kind.BOOLEAN ? ast.value : undefined;
  },
});

/**
 * @deprecated Brighten Tompkins
 *
 * Use `GraphQL<Name>16` from `src/scalars/graphql16.ts` instead.
 *
 * There are a few breaking changes from graphql v0.13.2 to v16.0.0.
 * The most notable is that validation is much more strict by default.
 *
 * With that in mind, we are replacing the graphqlscalar types with the
 * ones from v0.13.2. This is a temporary fix until we can refactor
 * the schema to be compliant with the new validation rules.
 */
export const GraphQLID = new GraphQLScalarType<string | undefined>({
  name: 'ID',
  description:
    'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',

    serialize: String,
    parseValue: String,
    parseLiteral(ast) {
        return ast.kind === Kind.STRING || ast.kind === Kind.INT
            ? ast.value
            : undefined;
    },
});

export const specifiedScalarTypes: ReadonlyArray<GraphQLScalarType> =
  Object.freeze([
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLID,
  ]);

export function isSpecifiedScalarType(type: GraphQLNamedType): boolean {
  return specifiedScalarTypes.some(({ name }) => type.name === name);
}

// Support serializing objects with custom valueOf() or toJSON() functions -
// a common way to represent a complex value which can be represented as
// a string (ex: MongoDB id objects).
function serializeObject(outputValue: unknown): unknown {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === 'function') {
      const valueOfResult = outputValue.valueOf();
      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }
    if (typeof outputValue.toJSON === 'function') {
      return outputValue.toJSON();
    }
  }
  return outputValue;
}
