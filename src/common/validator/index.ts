import Ajv from "ajv";
import ajvErrors from "ajv-errors";

export default function validator(schema, data) {
  const ajv = new Ajv({ allErrors: true })
  ajvErrors(ajv)

  const validate = ajv.compile(schema)
  const valid = validate(data || {})

  if (valid) {
    return {
      isValid: true,
      errors: null
    }
  }
  else {
    const errors = {};
    for (const item of validate.errors) {
      const [field, value] = item.message.split(":")
      errors[field] = value
    }

    return {
      isValid: false,
      errors
    }
  }
}