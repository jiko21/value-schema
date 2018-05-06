import {CAUSE} from "libs/constants";
import IPv6Adjuster from "libs/IPv6Adjuster";

{
	describe("required", testRequired);
	describe("default", testDefault);
	describe("empty", testEmpty);
	describe("allowEmpty", testAllowEmpty);
	describe("IPv6", testIPv6);
}

function testRequired()
{
	const objIPv6Adjuster = new IPv6Adjuster();
	it("should cause error(s)", () =>
	{
		expect(() =>
		{
			objIPv6Adjuster.adjust(undefined);
		}).toThrow(CAUSE.REQUIRED);
	});
}

function testDefault()
{
	const objIPv6Adjuster = new IPv6Adjuster().default("::1");
	it("should be adjusted", () =>
	{
		expect(objIPv6Adjuster.adjust(undefined)).toEqual("::1");
	});
}

function testEmpty()
{
	const objIPv6Adjuster = new IPv6Adjuster();
	it("should cause error(s)", () =>
	{
		expect(() =>
		{
			objIPv6Adjuster.adjust("");
		}).toThrow(CAUSE.EMPTY);
	});
}

function testAllowEmpty()
{
	const objIPv6Adjuster = new IPv6Adjuster().allowEmpty("::1");
	it("should be OK", () =>
	{
		expect(objIPv6Adjuster.adjust("")).toEqual("::1");
	});
}

function testIPv6()
{
	const objIPv6Adjuster = new IPv6Adjuster();
	it("should be OK", () =>
	{
		const values = [
			"0000:0000:0000:0000:0000:0000:0000:0000",

			"::1",
			"::",
			"1::1",

			// IPv4-mapped address
			"::ffff:192.0.2.1",
		];
		for(const value of values)
		{
			expect(objIPv6Adjuster.adjust(value)).toEqual(value);
		}
	});
	it("should cause error(s)", () =>
	{
		const values = [
			"0000",
			"ffff:",
			"0000:0000:0000:0000:0000:0000:0000:0000:",
		];
		for(const value of values)
		{
			expect(() =>
			{
				objIPv6Adjuster.adjust(value);
			}).toThrow(CAUSE.IPV6);
		}
	});
}