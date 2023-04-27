// Firebase Functionsとaxiosをインポート
import * as functions from "firebase-functions";
import axios from "axios";
import * as cors from "cors";

// Firebase Functionsの環境変数からOpenAI APIキーを取得
const OPENAI_API_KEY = functions.config().openai.api_key;

// CORSミドルウェアを適用
const corsHandler = cors({origin: true});

// generateStoryという名前のCloud Functionを作成
exports.generateStory = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    // フロントエンドから送られてくるプロンプトを取得
    const prompt = req.body.prompt;
    console.log("これはpromptのログです : " + prompt);

    try {
      // OpenAI APIにPOSTリクエストを送信して、レスポンスを受け取る
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: prompt,
          max_tokens: 150,
          n: 1,
          stop: ["The End"],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      // レスポンスから生成されたストーリーを取得
      const story = response.data.choices[0].text;
      console.log("これはレスポンス全体のログです。" + JSON.stringify(response.data));
      // ストーリーをフロントエンドに返す
      res.json({story: story});
    } catch (error) {
      console.error(error);
      // エラーが発生した場合は、エラーメッセージをフロントエンドに返す
      res.status(500).json({error: "エラーが発生しました。"});
    }
  });
});
