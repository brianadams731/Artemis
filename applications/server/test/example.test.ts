interface exampleInterface{
    exampleArg: number;
    otherData: "other data";
}

const exampleFunction = (exampleArg:number):exampleInterface =>{
    return {
        exampleArg,
        otherData: "other data"
    };
}
/* !!!! ^ These will be imported from the file you are testing ^ !!!!*/

test("This is an example description",()=>{
    expect(exampleFunction(5)).toEqual({
        exampleArg: 5,
        otherData: "other"
    })
})