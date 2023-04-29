// Firebase Functionsとaxiosをインポート
import * as functions from "firebase-functions";
import axios from "axios";
import * as cors from "cors";

// Firebase Functionsの環境変数からOpenAI APIキーを取得
const OPENAI_API_KEY = functions.config().openai.api_key;

// CORSミドルウェアを適用
const corsHandler = cors({origin: true});

// askAssistantという名前のCloud Functionを作成
exports.askAssistant = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    // フロントエンドから送られてくるメッセージとチャット履歴を取得
    const {message, chatHistory} = req.body;

    try {
      // メッセージ配列を作成
      const messages = [
        ...chatHistory,
        {
          "role": "system",
          "content": "You are a helpful assistant.",
        },
        {
          "role": "user",
          "content": message,
        },
      ];

      // OpenAI APIにPOSTリクエストを送信して、レスポンスを受け取る
      const response = await axios.post(
        "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
        {
          model: "gpt-3.5-turbo",
          messages: messages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      // レスポンスからAIの応答を取得
      const assistantMessage = response.data.choices[0].message.content;

      // AIの応答をフロントエンドに返す
      res.json({message: assistantMessage});
    } catch (error) {
      console.error(error);
      // エラーが発生した場合は、エラーメッセージをフロントエンドに返す
      res.status(500).json({error: "エラーが発生しました。"});
    }
  });
});
