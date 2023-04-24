import * as functions from "firebase-functions"
import axios from "axios"

if (process.env.NODE_ENV !== "production") {
	// ローカル環境でのみ .env ファイルを使用する
	require("dotenv").config();
}

// OpenAI API エンドポイントを作成します。
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // .env ファイルから読み込むことを検討してください。

exports.generateStory = functions.https.onCall(async (data, context) => {
	const prompt = data.prompt;

	try {
		const response = await axios.post(
			"https://api.openai.com/v1/engines/davinci-codex/completions",
			{
				prompt: prompt,
				max_tokens: 150,
				n: 1,
				stop: null,
				temperature: 1,
			},
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${OPENAI_API_KEY}`,
				},
			}
		);

		const story = response.data.choices[0].text;
		return { story: story };
	} catch (error) {
		console.error(error);
		return { error: "エラーが発生しました。" };
	}
});


