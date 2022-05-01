import {generateHashedPasswordAsync, checkHashedPasswordAsync} from "../src/utils/passwordHash";

describe('Hashing Functionality', ()=>{
    const testPassword = "testPassword"
    let hashedTestPass: string;
    let secondHashedTestPass: string;

    beforeEach(async ()=>{
        hashedTestPass = await generateHashedPasswordAsync(testPassword);
        secondHashedTestPass = await generateHashedPasswordAsync(testPassword);
    })

    test("The password is being hashed",async ()=>{
        expect(testPassword).not.toEqual(hashedTestPass);
    })

    test("The password is being checked",async ()=>{
        expect(checkHashedPasswordAsync(testPassword, hashedTestPass)).toBeTruthy();
    })

    test("The hash is being salted", async()=>{
        expect(testPassword).not.toEqual(secondHashedTestPass);
    })
})