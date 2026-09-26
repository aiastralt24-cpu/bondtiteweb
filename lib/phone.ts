/** Accept international formatting; reject obvious placeholders, without claiming ownership verification. */
export function isUsablePhone(value: unknown): value is string {
 if(typeof value!=='string'||!/^\+?[\d\s()\-]{7,25}$/.test(value))return false;
 const digits=value.replace(/\D/g,'');
 return digits.length>=7&&digits.length<=15&&!/^(\d)\1+$/.test(digits);
}
