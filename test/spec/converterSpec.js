describe("My Converter", function() {
    it("should convert fahrenheit to celsius", function () {
        expect(Converter.convertFromFahrToCels(-40)).toBe(-40);
    })
    it("fahrenheit to celsius should be able to deal with strings", function () {
        expect(function () { Converter.convertFromFahrToCels("hello") }).toThrow(new Error("Not a number"));
    })
    it("should convert celsius to fahrenheit", function () {
        expect(Converter.convertFromCelsToFahr(100)).toBe(212);
    })
    it("celsius to fahrenheit should be able to deal with strings", function () {
        expect(function () { Converter.convertFromCelsToFahr("hello") }).toThrow(new Error("Not a number"));
    })
})