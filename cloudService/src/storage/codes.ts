import { getAllSaves } from ".";
import { Code, PossibleCode } from "../models";

const generateCode = (): Code => {
	const possibleCharacters = process.env.CODE_POSSIBLE_CHARS as string;
	const codeLength = parseInt(process.env.CODE_LENGTH as string);

	return Array(codeLength)
		.fill(0)
		.map(() => possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)))
		.join("");
};

const generateUniqueCode = (): PossibleCode => {
	const registry = getAllSaves();
	for (let i = 0; i < parseInt(process.env.CODE_MAX_ATTEMPTS as string); i++) {
		const newCode = generateCode();
		if (!registry.files.includes(`${newCode}.json`)) {
			return newCode;
		}
	}
	return undefined;
};

export { generateUniqueCode };
