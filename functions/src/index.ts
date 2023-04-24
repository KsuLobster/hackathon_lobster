// Firebase Functionsとaxiosをインポート
import * as functions from "firebase-functions";
import axios from "axios";

// Firebase Functionsの環境変数からOpenAI APIキーを取得
const OPENAI_API_KEY = functions.config().openai.api_key;

// generateStoryという名前のCloud Functionを作成
exports.generateStory = functions.https.onCall(async (data, context) => {
	// フロントエンドから送られてくるプロンプトを取得
	const prompt = data.prompt;

	try {
		// OpenAI APIにPOSTリクエストを送信して、レスポンスを受け取る
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
					Authorization: `Bearer ${OPENAI_API_KEY}`,
				},
			}
		);

		// レスポンスから生成されたストーリーを取得
		const story = response.data.choices[0].text;
		// ストーリーをフロントエンドに返す
		return { story: story };
	} catch (error) {
		console.error(error);
		// エラーが発生した場合は、エラーメッセージをフロントエンドに返す
		return { error: "エラーが発生しました。" };
	}
});
